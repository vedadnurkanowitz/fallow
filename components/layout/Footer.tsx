import Link from "next/link";
import type { ShopInfo } from "@/types";

interface FooterProps {
  shopInfo?: ShopInfo | null;
}

export default function Footer({ shopInfo }: FooterProps) {
  return (
    <footer className="border-t border-crema bg-espresso text-milk/80 mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <p className="font-display font-semibold text-[20px] text-milk mb-2">Fallow</p>
          <p className="text-small leading-relaxed text-milk/60">
            Neighbourhood coffee, roasted with intention.
          </p>
        </div>

        {/* Nav */}
        <nav aria-label="Footer navigation">
          <p className="text-label text-milk/40 mb-3">Navigate</p>
          <ul className="space-y-2">
            {[
              { href: "/menu",  label: "Menu"      },
              { href: "/order", label: "Pre-order" },
              { href: "/visit", label: "Visit"     },
              { href: "/about", label: "About"     },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-small text-milk/70 hover:text-milk transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <p className="text-label text-milk/40 mb-3">Find us</p>
          <address className="not-italic text-small text-milk/70">
            {shopInfo?.address ? (
              <>
                <p className="whitespace-pre-line mb-2">{shopInfo.address}</p>
                <a
                  href={`tel:${shopInfo.phone.replace(/\s/g, "")}`}
                  className="hover:text-milk transition-colors"
                >
                  {shopInfo.phone}
                </a>
              </>
            ) : (
              <p className="text-milk/40">
                Address configured in Sanity Studio
              </p>
            )}
          </address>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-6 flex items-center justify-between">
        <p className="text-label text-milk/30">
          © {new Date().getFullYear()} Fallow Coffee
        </p>
        <div className="flex gap-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-small text-milk/40 hover:text-milk transition-colors"
            aria-label="Instagram"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
