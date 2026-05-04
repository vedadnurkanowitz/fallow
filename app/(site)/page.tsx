import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="min-h-[100svh] flex flex-col bg-espresso text-milk overflow-hidden relative">

        {/* Background image */}
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Gradient overlay — dark left for text, enough cover on right for contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-espresso/90 via-espresso/70 to-espresso/55"
        />

        {/* Main content — pushed to bottom */}
        <div className="relative z-10 mt-auto max-w-7xl mx-auto w-full px-6 md:px-12 pb-14 md:pb-20 pt-36">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-8 items-end">

            {/* Left — headline + CTAs */}
            <div className="md:col-span-7">
              <p className="font-accent italic text-crema/50 text-[11px] tracking-[0.22em] uppercase mb-7">
                Neighbourhood coffee
              </p>
              <h1 className="text-display-hero text-milk mb-10">
                Every cup,<br />
                <em className="text-crema not-italic font-accent italic font-normal">crafted</em><br />
                with intention.
              </h1>

              <div className="flex flex-wrap gap-4">
                <a
                  href="/menu"
                  className="inline-flex items-center justify-center px-8 py-4 bg-roast text-milk font-body font-medium text-sm tracking-wide rounded-sm hover:bg-crema hover:text-espresso transition-colors duration-200"
                >
                  View menu
                </a>
                <a
                  href="/order"
                  className="inline-flex items-center justify-center px-8 py-4 border border-milk/30 text-milk font-body font-medium text-sm tracking-wide rounded-sm hover:border-milk hover:bg-milk hover:text-espresso transition-colors duration-200"
                >
                  Pre-order
                </a>
              </div>
            </div>

            {/* Right — tagline + hours */}
            <div className="md:col-span-5 md:text-right md:pb-1 flex flex-col md:items-end gap-5">
              <p className="text-small text-milk/90 max-w-[22ch] md:text-right">
                Seasonal espresso, filter brews,<br />
                and a space that feels like yours.
              </p>
              {shopInfo && (
                <Link href="/visit" className="inline-block">
                  <HoursStatus hours={shopInfo.hours} />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Bottom thin rule */}
        <div className="relative z-10 w-full h-px bg-crema/10" />
      </section>

      {/* ── Seasonal feature ─────────────────────────────────────────────── */}
      {seasonal && (
        <section className="bg-milk border-b border-crema/60">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">

              {/* Text side */}
              <div className="md:col-span-6 lg:col-span-5">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px w-8 bg-roast/40" />
                  <p className="font-accent italic text-roast/70 text-[11px] tracking-[0.2em] uppercase">
                    In season
                  </p>
                </div>

                <SeasonalBadge className="mb-4" />
                <h2 className="text-display text-espresso mb-4 leading-[1.05]">
                  {seasonal.headline}
                </h2>
                <p className="font-accent italic text-roast text-xl mb-3">
                  {seasonal.item.name}
                </p>
                {seasonal.item.description && (
                  <p className="text-body text-stone mb-6 max-w-[42ch]">
                    {seasonal.item.description}
                  </p>
                )}
                <div className="flex items-center gap-6">
                  <span className="font-accent italic text-stone text-lg">
                    £{seasonal.item.price.toFixed(2)}
                  </span>
                  <a
                    href="/menu"
                    className="text-sm font-body font-medium text-espresso border-b border-espresso/30 hover:border-espresso pb-0.5 transition-colors"
                  >
                    See full menu →
                  </a>
                </div>
              </div>

              {/* Image side */}
              <div className="md:col-span-6 lg:col-span-7">
                {seasonal.item.image ? (
                  <div className="relative aspect-[4/3] md:aspect-[3/2] overflow-hidden rounded-sm">
                    <Image
                      src={seasonal.item.image.asset.url}
                      alt={seasonal.item.image.alt ?? seasonal.item.name}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 55vw, 100vw"
                      priority
                    />
                  </div>
                ) : (
                  <div className="aspect-[4/3] md:aspect-[3/2] rounded-sm bg-crema/40 border border-crema flex items-center justify-center">
                    <p className="text-stone text-small text-center px-8">
                      Add an image in Sanity Studio
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Menu preview ─────────────────────────────────────────────────── */}
      {featured.length > 0 && (
        <section className="bg-espresso noise overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">

            {/* Section header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8 bg-crema/30" />
                  <p className="font-accent italic text-crema/40 text-[11px] tracking-[0.2em] uppercase">
                    From the menu
                  </p>
                </div>
                <h2 className="text-h1 text-milk">A few favourites</h2>
              </div>
              <a
                href="/menu"
                className="text-sm font-body font-medium text-crema/70 hover:text-crema border-b border-crema/20 hover:border-crema/60 pb-0.5 transition-colors self-start sm:self-auto sm:mb-1.5"
              >
                Full menu →
              </a>
            </div>

            {/* Menu ledger */}
            <div className="divide-y divide-crema/10">
              {featured.map((item) => (
                <div key={item._id} className="flex gap-6 py-6 group">
                  {item.image && (
                    <div className="relative w-16 h-16 shrink-0 rounded overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity">
                      <Image
                        src={item.image.asset.url}
                        alt={item.image.alt ?? item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-h3 text-milk mb-1">{item.name}</h3>
                      {item.description && (
                        <p className="text-small text-milk/40 leading-relaxed max-w-[48ch]">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <span className="font-accent italic text-crema/70 text-base shrink-0 pt-0.5">
                      £{item.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ── About pull-quote ─────────────────────────────────────────────── */}
      <section className="bg-milk border-t border-crema/60">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

            {/* Decorative large quote mark */}
            <div className="md:col-span-1 hidden md:flex items-start pt-2">
              <span
                aria-hidden="true"
                className="font-display text-crema select-none leading-none"
                style={{ fontSize: "clamp(80px, 8vw, 120px)" }}
              >
                &ldquo;
              </span>
            </div>

            {/* Quote + body */}
            <div className="md:col-span-7">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-roast/40" />
                <p className="font-accent italic text-roast/70 text-[11px] tracking-[0.2em] uppercase">
                  Who we are
                </p>
              </div>
              <blockquote>
                <p className="text-display text-espresso mb-8 leading-[1.08]">
                  The kind of place<br />
                  <em className="font-accent italic font-normal text-stone">regulars defend.</em>
                </p>
              </blockquote>
              <p className="text-body text-stone max-w-[52ch] mb-8">
                Fallow is an independent coffee shop rooted in the neighbourhood.
                The owner&apos;s personality is the brand — quality-first,
                community-anchored, and deeply proud of every cup.
              </p>
              <a
                href="/about"
                className="text-sm font-body font-medium text-espresso border-b border-espresso/30 hover:border-espresso pb-0.5 transition-colors"
              >
                Our story →
              </a>
            </div>

            {/* Right aside — decorative rule */}
            <div className="md:col-span-4 hidden md:block">
              <div className="h-full border-l border-crema/60 ml-8" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Find us ──────────────────────────────────────────────────────── */}
      {shopInfo?.googleMapsUrl && (
        <section className="bg-espresso border-t border-crema/10 noise overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">

              {/* Text */}
              <div className="md:col-span-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-8 bg-crema/30" />
                  <p className="font-accent italic text-crema/40 text-[11px] tracking-[0.2em] uppercase">
                    Find us
                  </p>
                </div>
                <address className="not-italic text-body text-milk/70 whitespace-pre-line mb-6">
                  {shopInfo.address}
                </address>
                <a
                  href="/visit"
                  className="text-sm font-body font-medium text-crema/70 hover:text-crema border-b border-crema/20 hover:border-crema/60 pb-0.5 transition-colors"
                >
                  Hours &amp; directions →
                </a>
              </div>

              {/* Map */}
              <div className="md:col-span-8">
                <MapEmbed src={shopInfo.googleMapsUrl} compact />
              </div>

            </div>
          </div>
        </section>
      )}
    </>
  );
}
