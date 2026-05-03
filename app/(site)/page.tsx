import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/ui/Button";
import MenuCard from "@/components/ui/MenuCard";
import HoursStatus from "@/components/ui/HoursStatus";
import MapEmbed from "@/components/ui/MapEmbed";
import SeasonalBadge from "@/components/ui/SeasonalBadge";
import {
  getFeaturedMenuItems,
  getShopInfo,
  getActiveSeasonalFeature,
} from "@/lib/sanity/queries";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Fallow Coffee — Neighbourhood coffee, roasted with intention",
};

export default async function HomePage() {
  const [shopInfo, featured, seasonal] = await Promise.all([
    getShopInfo(),
    getFeaturedMenuItems(),
    getActiveSeasonalFeature(),
  ]);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative bg-espresso text-milk overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-24 md:py-36">
          <p className="text-label text-crema mb-4 uppercase tracking-widest">
            Neighbourhood coffee
          </p>
          <h1 className="text-display text-milk mb-6 max-w-2xl">
            Every cup,{" "}
            <em className="text-crema not-italic">crafted</em> with intention.
          </h1>
          <p className="text-body text-milk/70 mb-10 max-w-md">
            Seasonal espresso, filter brews, and a space that feels like yours.
            Find us open seven days a week.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <a
              href="/menu"
              className="inline-flex items-center justify-center px-8 py-4 bg-roast text-milk font-body font-medium rounded-sm hover:bg-crema hover:text-espresso transition-colors duration-200"
            >
              View menu
            </a>
            <a
              href="/order"
              className="inline-flex items-center justify-center px-8 py-4 border border-milk text-milk font-body font-medium rounded-sm hover:bg-milk hover:text-espresso transition-colors duration-200"
            >
              Pre-order
            </a>
          </div>

          {shopInfo && <HoursStatus hours={shopInfo.hours} />}
        </div>
      </section>

      {/* ── Seasonal feature ─────────────────────────────────────── */}
      {seasonal && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <p className="text-label text-stone uppercase tracking-widest mb-6">
            In season
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <SeasonalBadge className="mb-3" />
              <h2 className="text-h1 text-espresso mb-3">{seasonal.headline}</h2>
              <p className="text-h3 text-roast mb-1">{seasonal.item.name}</p>
              {seasonal.item.description && (
                <p className="text-body text-stone mb-4">
                  {seasonal.item.description}
                </p>
              )}
              <p className="font-accent italic text-stone text-[15px] mb-6">
                £{seasonal.item.price.toFixed(2)}
              </p>
              <Button href="/menu" variant="secondary">
                See full menu →
              </Button>
            </div>

            {seasonal.item.image ? (
              <div className="relative aspect-square rounded-sm overflow-hidden">
                <Image
                  src={seasonal.item.image.asset.url}
                  alt={seasonal.item.image.alt ?? seasonal.item.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  priority
                />
              </div>
            ) : (
              <div className="aspect-square rounded-sm bg-crema/30 border border-crema flex items-center justify-center text-stone text-small">
                Add an image in Sanity Studio
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Menu preview ─────────────────────────────────────────── */}
      {featured.length > 0 && (
        <section className="bg-espresso/5 border-y border-crema">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-label text-stone uppercase tracking-widest mb-1">
                  From the menu
                </p>
                <h2 className="text-h2 text-espresso">A few favourites</h2>
              </div>
              <Button href="/menu" variant="ghost">
                Full menu →
              </Button>
            </div>
            <div>
              {featured.map((item) => (
                <MenuCard key={item._id} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── About blurb ──────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <p className="text-label text-stone uppercase tracking-widest mb-2">
          Who we are
        </p>
        <h2 className="text-h2 text-espresso mb-4">
          The kind of place regulars defend.
        </h2>
        <p className="text-body text-stone max-w-2xl mb-6">
          Fallow is an independent coffee shop rooted in the neighbourhood. The
          owner&apos;s personality is the brand — quality-first,
          community-anchored, and deeply proud of every cup.
        </p>
        <Button href="/about" variant="ghost">
          Our story →
        </Button>
      </section>

      {/* ── Map ──────────────────────────────────────────────────── */}
      {shopInfo?.googleMapsUrl && (
        <section className="border-t border-crema">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <p className="text-label text-stone uppercase tracking-widest mb-1">
                  Find us
                </p>
                <address className="not-italic text-body text-espresso whitespace-pre-line">
                  {shopInfo.address}
                </address>
              </div>
              <Button href="/visit" variant="secondary">
                Hours &amp; directions →
              </Button>
            </div>
            <MapEmbed src={shopInfo.googleMapsUrl} compact />
          </div>
        </section>
      )}
    </>
  );
}
