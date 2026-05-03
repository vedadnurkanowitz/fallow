import { type NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { sendOrderConfirmation } from "@/lib/resend";

// Next.js must receive the raw body to verify Stripe's signature.
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("[stripe-webhook] signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const { customer_email, metadata, amount_total, id: sessionId } = session;

  if (!customer_email || !metadata?.cart) {
    console.error("[stripe-webhook] missing customer_email or cart metadata");
    return NextResponse.json({ error: "Incomplete session data" }, { status: 400 });
  }

  let items: { name: string; qty: number; price_pence: number }[] = [];
  try {
    items = JSON.parse(metadata.cart);
  } catch {
    console.error("[stripe-webhook] failed to parse cart metadata");
    return NextResponse.json({ error: "Malformed cart metadata" }, { status: 400 });
  }

  const pickupNote = metadata.pickup_note ?? "Ready in approx. 15 minutes";
  const totalPence = amount_total ?? 0;

  // ── Save to Supabase ─────────────────────────────────────────────────────
  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("orders").upsert(
      {
        stripe_session_id: sessionId,
        items,
        total_pence: totalPence,
        customer_email,
        pickup_note: pickupNote,
        status: "confirmed",
      },
      { onConflict: "stripe_session_id" } // idempotent — safe to retry
    );

    if (error) {
      console.error("[stripe-webhook] supabase error:", error);
    }
  } catch (err) {
    console.error("[stripe-webhook] supabase client error:", err);
  }

  // ── Send confirmation email ──────────────────────────────────────────────
  try {
    await sendOrderConfirmation({
      to: customer_email,
      orderItems: items.map((i) => ({
        name: i.name,
        quantity: i.qty,
        price: i.price_pence,
      })),
      totalPence,
      pickupNote,
      stripeSessionId: sessionId,
    });
  } catch (err) {
    // Don't fail the webhook if email fails — order is already saved.
    console.error("[stripe-webhook] resend error:", err);
  }

  return NextResponse.json({ received: true });
}
