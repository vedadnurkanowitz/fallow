"use client";

import { useEffect, useRef, useState } from "react";
import type { Category } from "@/types";

interface MenuCategoryNavProps {
  categories: Category[];
}

export default function MenuCategoryNav({ categories }: MenuCategoryNavProps) {
  const [active, setActive] = useState<string>(categories[0]?.slug.current ?? "");
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = categories.map((c) =>
      document.getElementById(c.slug.current)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [categories]);

  function scrollToCategory(slug: string) {
    document.getElementById(slug)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(slug);
  }

  return (
    <div
      ref={navRef}
      className="sticky top-16 z-40 bg-milk/95 backdrop-blur-sm border-b border-crema -mx-4 sm:-mx-6 px-4 sm:px-6"
    >
      <div className="flex gap-1 overflow-x-auto scrollbar-none py-1" role="navigation" aria-label="Menu categories">
        {categories.map((cat) => {
          const isActive = active === cat.slug.current;
          return (
            <button
              key={cat._id}
              onClick={() => scrollToCategory(cat.slug.current)}
              className={`shrink-0 px-4 py-2 text-small font-body font-medium rounded-sm transition-colors whitespace-nowrap ${
                isActive
                  ? "bg-espresso text-milk"
                  : "text-stone hover:text-espresso hover:bg-crema/40"
              }`}
              aria-current={isActive ? "true" : undefined}
            >
              {cat.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}
