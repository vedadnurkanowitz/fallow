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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <p className="text-label text-stone uppercase tracking-widest mb-1">
          What we serve
        </p>
        <h1 className="text-h1 text-espresso">Menu</h1>
        <p className="text-body text-stone mt-2">
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
