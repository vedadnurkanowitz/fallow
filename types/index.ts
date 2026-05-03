export interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  displayOrder: number;
}

export interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image?: { asset: { url: string }; alt?: string };
  seasonal: boolean;
  orderable: boolean;
  allergens: string[];
}

export interface DayHours {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

export interface ShopInfo {
  hours: DayHours[];
  address: string;
  phone: string;
  googleMapsUrl: string;
  announcement?: string;
}

export interface SeasonalFeature {
  _id: string;
  headline: string;
  item: MenuItem;
  startDate: string;
  endDate: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  pickupTime: string;
  customerEmail: string;
  status: "pending" | "confirmed" | "ready" | "collected";
}
