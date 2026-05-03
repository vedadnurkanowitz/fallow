import { client, isSanityConfigured } from "./client";
import type { Category, MenuItem, ShopInfo, SeasonalFeature } from "@/types";

// ─── Fragments ───────────────────────────────────────────────────────────────

const IMAGE_FIELDS = `
  image {
    asset->{ url },
    alt
  }
`;

const MENU_ITEM_FIELDS = `
  _id,
  name,
  description,
  price,
  category->{ _id, title, slug, displayOrder },
  ${IMAGE_FIELDS},
  seasonal,
  orderable,
  allergens
`;

// ─── Queries ─────────────────────────────────────────────────────────────────

const ALL_CATEGORIES_QUERY = `
  *[_type == "category"] | order(displayOrder asc) {
    _id, title, slug, displayOrder
  }
`;

const ALL_MENU_ITEMS_QUERY = `
  *[_type == "menuItem"] | order(category->displayOrder asc, name asc) {
    ${MENU_ITEM_FIELDS}
  }
`;

const ORDERABLE_MENU_ITEMS_QUERY = `
  *[_type == "menuItem" && orderable == true] | order(category->displayOrder asc, name asc) {
    ${MENU_ITEM_FIELDS}
  }
`;

const FEATURED_MENU_ITEMS_QUERY = `
  *[_type == "menuItem"] | order(_createdAt desc) [0..3] {
    ${MENU_ITEM_FIELDS}
  }
`;

const SHOP_INFO_QUERY = `
  *[_type == "shopInfo"][0] {
    hours,
    address,
    phone,
    googleMapsUrl,
    announcement
  }
`;

const ACTIVE_SEASONAL_FEATURE_QUERY = `
  *[
    _type == "seasonalFeature"
    && startDate <= $today
    && endDate >= $today
  ] | order(_createdAt desc) [0] {
    _id,
    headline,
    item->{ ${MENU_ITEM_FIELDS} },
    startDate,
    endDate
  }
`;

// ─── Fetchers ────────────────────────────────────────────────────────────────

async function safeFetch<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!isSanityConfigured) return fallback;
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

export async function getAllCategories(): Promise<Category[]> {
  return safeFetch(() => client.fetch(ALL_CATEGORIES_QUERY), []);
}

export async function getAllMenuItems(): Promise<MenuItem[]> {
  return safeFetch(() => client.fetch(ALL_MENU_ITEMS_QUERY), []);
}

export async function getOrderableMenuItems(): Promise<MenuItem[]> {
  return safeFetch(() => client.fetch(ORDERABLE_MENU_ITEMS_QUERY), []);
}

export async function getFeaturedMenuItems(): Promise<MenuItem[]> {
  return safeFetch(() => client.fetch(FEATURED_MENU_ITEMS_QUERY), []);
}

export async function getShopInfo(): Promise<ShopInfo | null> {
  return safeFetch(() => client.fetch(SHOP_INFO_QUERY), null);
}

export async function getActiveSeasonalFeature(): Promise<SeasonalFeature | null> {
  const today = new Date().toISOString().split("T")[0];
  return safeFetch(() => client.fetch(ACTIVE_SEASONAL_FEATURE_QUERY, { today }), null);
}

export async function getMenuItemsByCategory(): Promise<Record<string, MenuItem[]>> {
  const items = await getAllMenuItems();
  return items.reduce<Record<string, MenuItem[]>>((acc, item) => {
    const key = item.category.slug.current;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}
