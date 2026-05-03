import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getStripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Order confirmed",
};

interface PageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function OrderSuccessPage({ searchParams }: PageProps) {
  const { session_id } = await searchParams;

  if (!session_id) redirect("/order");

  let session;
  try {
    session = await getStripe().checkout.sessions.retrieve(session_id, {
      expand: ["line_items"],
    });
  } catch {
    redirect("/order");
  }

  if (session.payment_status !== "paid") redirect("/order");

  const lineItems = session.line_items?.data ?? [];
  const total = ((session.amount_total ?? 0) / 100).toFixed(2);
  const pickupNote =
    session.metadata?.pickup_note ?? "Ready in approx. 15 minutes";
  const email = session.customer_email ?? "";
  const orderRef = session_id.slice(-8).toUpperCase();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20">
      {/* Status header */}
      <div className="text-center mb-12">
        <div className="w-12 h-12 rounded-full bg-herb/15 flex items-center justify-center mx-auto mb-6">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4A7C6F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <span className="text-label text-herb uppercase tracking-widest block mb-2">
          Confirmed
        </span>
        <h1 className="text-h1 text-espresso">Your order is on its way.</h1>
        {email && (
          <p className="text-small text-stone mt-2">
            Confirmation sent to <span className="text-espresso">{email}</span>
          </p>
        )}
      </div>

      {/* Order card */}
      <div className="border border-crema rounded-sm bg-white/60 divide-y divide-crema mb-8">
        {/* Pickup note */}
        <div className="px-6 py-5">
          <p className="text-label text-stone uppercase tracking-widest mb-1">
            Pickup
          </p>
          <p className="text-body text-espresso font-medium">{pickupNote}</p>
          <p className="text-small text-stone mt-1">
            Show this page at the counter — no need to say anything else.
          </p>
        </div>

        {/* Line items */}
        <div className="px-6 py-5">
          <p className="text-label text-stone uppercase tracking-widest mb-3">
            What you ordered
          </p>
          <ul className="space-y-2">
            {lineItems.map((item) => (
              <li key={item.id} className="flex justify-between text-small">
                <span className="text-espresso">
                  {item.description}
                  {(item.quantity ?? 1) > 1 && (
                    <span className="text-stone ml-1">× {item.quantity}</span>
                  )}
                </span>
                <span className="text-stone tabular-nums">
                  £{(((item.amount_total ?? 0)) / 100).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center pt-3 mt-3 border-t border-crema">
            <span className="text-body font-medium text-espresso">Total</span>
            <span className="text-body font-medium text-espresso tabular-nums">
              £{total}
            </span>
          </div>
        </div>

        {/* Order ref */}
        <div className="px-6 py-4">
          <p className="text-label text-stone">
            Order ref:{" "}
            <span className="text-espresso font-medium tracking-widest">
              {orderRef}
            </span>
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-3">
        <Link
          href="/menu"
          className="inline-block text-small text-stone hover:text-espresso transition-colors underline-offset-4 hover:underline"
        >
          Browse the full menu
        </Link>
      </div>
    </div>
  );
}
