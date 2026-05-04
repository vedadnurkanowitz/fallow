"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import HoursStatus from "@/components/ui/HoursStatus";
import type { DayHours } from "@/types";

const links = [
  { href: "/menu",  label: "Menu"      },
  { href: "/order", label: "Pre-order" },
  { href: "/visit", label: "Visit"     },
  { href: "/about", label: "About"     },
];

interface NavProps {
  hours?: DayHours[];
}

export default function Nav({ hours }: NavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-milk border-b border-espresso/8">
      <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-14">

        {/* Logo */}
        <Link href="/" className="shrink-0 hover:opacity-80 transition-opacity" aria-label="Fallow Coffee — home">
          <Image src="/images/fallow-logo.png" alt="Fallow" width={133} height={34} priority />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-7">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-[13px] font-body font-medium tracking-wide transition-colors ${
                  pathname.startsWith(href)
                    ? "text-roast"
                    : "text-espresso/70 hover:text-espresso"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop right — hours badge + CTA */}
        <div className="hidden md:flex items-center gap-5">
          {hours && (
            <Link href="/visit" aria-label="Opening hours">
              <HoursStatus hours={hours} compact />
            </Link>
          )}
          <Link
            href="/order"
            className="inline-flex items-center px-5 py-2 bg-roast text-milk text-[13px] font-body font-medium tracking-wide rounded-sm hover:bg-espresso transition-colors"
          >
            Order now
          </Link>
        </div>

        {/* Hamburger — mobile */}
        <button
          className="md:hidden p-2 text-espresso"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 4l12 12M16 4L4 16" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 5h14M3 10h14M3 15h14" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-espresso/8 bg-milk px-6 pb-8 pt-5 space-y-1">
          {hours && (
            <Link
              href="/visit"
              className="block mb-5"
              onClick={() => setOpen(false)}
            >
              <HoursStatus hours={hours} />
            </Link>
          )}

          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`block py-2.5 text-base font-body font-medium border-b border-espresso/6 last:border-0 ${
                pathname.startsWith(href) ? "text-roast" : "text-espresso/80"
              }`}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}

          <div className="pt-4">
            <Link
              href="/order"
              className="block text-center px-5 py-3.5 bg-roast text-milk text-sm font-body font-medium rounded-sm hover:bg-espresso transition-colors"
              onClick={() => setOpen(false)}
            >
              Order now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
