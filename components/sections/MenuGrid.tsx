import type { Category, MenuItem } from "@/types";
import MenuCard from "@/components/ui/MenuCard";
import SeasonalBadge from "@/components/ui/SeasonalBadge";

interface MenuGridProps {
  categories: Category[];
  itemsByCategory: Record<string, MenuItem[]>;
}

export default function MenuGrid({ categories, itemsByCategory }: MenuGridProps) {
  if (categories.length === 0) {
    return (
      <p className="text-small text-stone py-12 text-center">
        Menu coming soon — check back shortly.
      </p>
    );
  }

  return (
    <div className="space-y-14">
      {categories.map((cat) => {
        const items = itemsByCategory[cat.slug.current] ?? [];
        if (items.length === 0) return null;

        const hasSeasonalItems = items.some((i) => i.seasonal);

        return (
          <section
            key={cat._id}
            id={cat.slug.current}
            className="scroll-mt-32"
            aria-labelledby={`heading-${cat.slug.current}`}
          >
            <div className="flex items-center gap-3 mb-1 pb-3 border-b border-crema">
              <h2
                id={`heading-${cat.slug.current}`}
                className="text-h2 text-espresso"
              >
                {cat.title}
              </h2>
              {hasSeasonalItems && (
                <SeasonalBadge className="self-center" />
              )}
            </div>

            <div>
              {items.map((item) => (
                <MenuCard key={item._id} item={item} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
