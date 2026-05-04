import type { Metadata } from "next";
import MenuCategoryNav from "@/components/sections/MenuCategoryNav";
import MenuGrid from "@/components/sections/MenuGrid";
import { getAllCategories, getMenuItemsByCategory } from "@/lib/sanity/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Explore the full Fallow Coffee menu — espresso, filter, cold brew, food, and seasonal specials.",
};

export default async function MenuPage() {
  const [categories, itemsByCategory] = await Promise.all([
    getAllCategories(),
    getMenuItemsByCategory(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-8 bg-roast/40" />
          <p className="font-accent italic text-roast/60 text-[11px] tracking-[0.2em] uppercase">
            What we serve
          </p>
        </div>
        <h1 className="text-display text-espresso mb-3">Menu</h1>
        <p className="text-body text-stone max-w-[48ch]">
          Seasonal and always quality-first. Updated whenever something changes.
        </p>
      </div>

      {categories.length > 0 && (
        <MenuCategoryNav categories={categories} />
      )}

      <div className="mt-10">
        <MenuGrid categories={categories} itemsByCategory={itemsByCategory} />
      </div>
    </div>
  );
}
