"use client";

import Link from "next/link";
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
    <header className="sticky top-0 z-50 bg-milk/95 backdrop-blur-sm border-b border-crema">
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <Link
          href="/"
          className="font-display font-semibold text-[22px] text-espresso hover:text-roast transition-colors shrink-0"
        >
          Fallow
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-small font-body font-medium tracking-wide transition-colors ${
                  pathname.startsWith(href)
                    ? "text-roast"
                    : "text-espresso hover:text-roast"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop right — hours badge + CTA */}
        <div className="hidden md:flex items-center gap-4">
          {hours && (
            <Link href="/visit" aria-label="Opening hours">
              <HoursStatus hours={hours} compact />
            </Link>
          )}
          <Link
            href="/order"
            className="inline-flex items-center px-5 py-2.5 bg-roast text-milk text-sm font-body font-medium rounded-sm hover:bg-espresso transition-colors"
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
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 4l12 12M16 4L4 16" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 5h14M3 10h14M3 15h14" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-crema bg-milk px-4 pb-6 pt-4 space-y-4">
          {hours && (
            <Link
              href="/visit"
              className="block"
              onClick={() => setOpen(false)}
            >
              <HoursStatus hours={hours} />
            </Link>
          )}

          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`block text-base font-body font-medium ${
                pathname.startsWith(href) ? "text-roast" : "text-espresso"
              }`}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}

          <Link
            href="/order"
            className="mt-2 block text-center px-5 py-3 bg-roast text-milk text-sm font-body font-medium rounded-sm"
            onClick={() => setOpen(false)}
          >
            Order now
          </Link>
        </div>
      )}
    </header>
  );
}
