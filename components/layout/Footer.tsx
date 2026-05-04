import Link from "next/link";
import Image from "next/image";
import type { ShopInfo } from "@/types";

interface FooterProps {
  shopInfo?: ShopInfo | null;
}

export default function Footer({ shopInfo }: FooterProps) {
  return (
    <footer className="bg-espresso text-milk mt-auto">

      {/* Top rule with brand name */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-14 pb-12">
        <div className="flex items-center gap-6 mb-12">
          <div className="h-px flex-1 bg-crema/10" />
          <span className="font-display font-bold text-milk/8 text-[13px] tracking-[0.3em] uppercase select-none">
            Fallow Coffee
          </span>
          <div className="h-px flex-1 bg-crema/10" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-10">

          {/* Brand / strapline */}
          <div className="col-span-2 md:col-span-4">
            <Link href="/" className="inline-block mb-3 hover:opacity-75 transition-opacity" aria-label="Fallow Coffee — home">
              <Image src="/images/fallow-logo-light.png" alt="Fallow" width={144} height={37} />
            </Link>
            <p className="text-small text-milk/40 max-w-[28ch] leading-relaxed">
              Neighbourhood coffee, roasted with intention. Seven days a week.
            </p>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-2" />

          {/* Navigate */}
          <nav aria-label="Footer navigation" className="col-span-1 md:col-span-2">
            <p className="text-[10px] font-body font-medium tracking-[0.18em] uppercase text-milk/25 mb-4">
              Navigate
            </p>
            <ul className="space-y-3">
              {[
                { href: "/menu",  label: "Menu"      },
                { href: "/order", label: "Pre-order" },
                { href: "/visit", label: "Visit"     },
                { href: "/about", label: "About"     },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-small text-milk/50 hover:text-milk transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Find us */}
          <div className="col-span-1 md:col-span-4">
            <p className="text-[10px] font-body font-medium tracking-[0.18em] uppercase text-milk/25 mb-4">
              Find us
            </p>
            <address className="not-italic text-small text-milk/50">
              {shopInfo?.address ? (
                <>
                  <p className="whitespace-pre-line mb-3 leading-relaxed">{shopInfo.address}</p>
                  <a
                    href={`tel:${shopInfo.phone.replace(/\s/g, "")}`}
                    className="hover:text-milk transition-colors"
                  >
                    {shopInfo.phone}
                  </a>
                </>
              ) : (
                <p className="text-milk/25">
                  Address configured in Sanity Studio
                </p>
              )}
            </address>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-crema/8">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <p className="text-[11px] text-milk/20">
            © {new Date().getFullYear()} Fallow Coffee. All rights reserved.
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-milk/30 hover:text-milk/70 transition-colors"
            aria-label="Instagram"
          >
            Instagram
          </a>
        </div>
      </div>

    </footer>
  );
}
