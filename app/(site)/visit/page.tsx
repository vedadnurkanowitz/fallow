import type { Metadata } from "next";
import MapEmbed from "@/components/ui/MapEmbed";
import HoursStatus from "@/components/ui/HoursStatus";
import HoursTable from "@/components/ui/HoursTable";
import { getShopInfo } from "@/lib/sanity/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Visit",
  description: "Find Fallow Coffee — hours, address, and how to get here.",
};

export default async function VisitPage() {
  const shopInfo = await getShopInfo();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <p className="text-label text-stone uppercase tracking-widest mb-1">
          Come in
        </p>
        <h1 className="text-h1 text-espresso mb-2">Visit us</h1>
        {shopInfo && (
          <HoursStatus hours={shopInfo.hours} className="mt-3" />
        )}
      </div>

      {shopInfo?.googleMapsUrl ? (
        <MapEmbed src={shopInfo.googleMapsUrl} className="mb-12" />
      ) : (
        <div className="h-72 rounded-sm bg-crema/20 border border-crema flex items-center justify-center text-stone text-small mb-12">
          Add your Google Maps embed URL in Sanity Studio → Shop info
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
        <div>
          <p className="text-label text-stone uppercase tracking-widest mb-4">
            Opening hours
          </p>
          {shopInfo?.hours ? (
            <HoursTable hours={shopInfo.hours} />
          ) : (
            <p className="text-small text-stone">
              Hours not yet configured — add them in Sanity Studio.
            </p>
          )}
        </div>

        <div>
          <p className="text-label text-stone uppercase tracking-widest mb-4">
            Address
          </p>
          {shopInfo ? (
            <>
              <address className="not-italic text-body text-espresso whitespace-pre-line mb-4">
                {shopInfo.address}
              </address>
              <a
                href={`tel:${shopInfo.phone.replace(/\s/g, "")}`}
                className="text-body text-roast hover:text-espresso transition-colors"
              >
                {shopInfo.phone}
              </a>
            </>
          ) : (
            <p className="text-small text-stone">
              Contact details not yet configured — add them in Sanity Studio.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
