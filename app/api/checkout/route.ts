import { type NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

interface CartLineItem {
  id: string;
  name: string;
  price: number; // in pounds (float)
  quantity: number;
}

interface CheckoutBody {
  cart: CartLineItem[];
  email: string;
}

export async function POST(req: NextRequest) {
  let body: CheckoutBody;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { cart, email } = body;

  if (!Array.isArray(cart) || cart.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: cart.map((item) => ({
        price_data: {
          currency: "gbp",
          unit_amount: Math.round(item.price * 100), // convert to pence
          product_data: { name: item.name },
        },
        quantity: item.quantity,
      })),
      metadata: {
        // Store serialised cart for the webhook (Stripe metadata values ≤ 500 chars each)
        cart: JSON.stringify(
          cart.map((i) => ({
            name: i.name,
            qty: i.quantity,
            price_pence: Math.round(i.price * 100),
          }))
        ),
        pickup_note: "Ready in approx. 15 minutes",
      },
      success_url: `${baseUrl}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/order`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout]", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
