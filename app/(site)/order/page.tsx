import type { Metadata } from "next";
import { getOrderableMenuItems } from "@/lib/sanity/queries";
import OrderPageClient from "@/components/sections/OrderPageClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pre-order",
  description: "Order ahead and pick up your coffee without the wait.",
};

export default async function OrderPage() {
  const items = await getOrderableMenuItems();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <p className="text-label text-stone uppercase tracking-widest mb-1">
          Skip the queue
        </p>
        <h1 className="text-h1 text-espresso">Pre-order</h1>
        <p className="text-body text-stone mt-2">
          Choose what you&apos;d like, pay securely, and collect at the counter.
          Ready in around 15 minutes.
        </p>
      </div>

      <OrderPageClient items={items} />
    </div>
  );
}
