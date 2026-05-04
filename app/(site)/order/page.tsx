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
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-8 bg-roast/40" />
          <p className="font-accent italic text-roast/60 text-[11px] tracking-[0.2em] uppercase">
            Skip the queue
          </p>
        </div>
        <h1 className="text-display text-espresso mb-3">Pre-order</h1>
        <p className="text-body text-stone max-w-[44ch]">
          Choose what you&apos;d like, pay securely, and collect at the counter.
          Ready in around 15 minutes.
        </p>
      </div>

      <OrderPageClient items={items} />
    </div>
  );
}
