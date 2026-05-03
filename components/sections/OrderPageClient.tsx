"use client";

import { useState, useCallback } from "react";
import type { MenuItem, CartItem } from "@/types";
import OrderableMenuList from "./OrderableMenuList";
import CartSidebar from "./CartSidebar";

interface OrderPageClientProps {
  items: MenuItem[];
}

export default function OrderPageClient({ items }: OrderPageClientProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addItem = useCallback((item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.menuItem._id === item._id);
      if (existing) {
        return prev.map((c) =>
          c.menuItem._id === item._id
            ? { ...c, quantity: c.quantity + 1 }
            : c
        );
      }
      return [...prev, { menuItem: item, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.menuItem._id === itemId);
      if (!existing) return prev;
      if (existing.quantity === 1) {
        return prev.filter((c) => c.menuItem._id !== itemId);
      }
      return prev.map((c) =>
        c.menuItem._id === itemId ? { ...c, quantity: c.quantity - 1 } : c
      );
    });
  }, []);

  const handleCheckout = useCallback(
    async (email: string) => {
      if (cart.length === 0) return;
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cart: cart.map((c) => ({
              id: c.menuItem._id,
              name: c.menuItem.name,
              price: c.menuItem.price,
              quantity: c.quantity,
            })),
            email,
          }),
        });

        const data = await res.json();

        if (!res.ok || !data.url) {
          setError(data.error ?? "Something went wrong. Please try again.");
          setLoading(false);
          return;
        }

        window.location.href = data.url;
      } catch {
        setError("Network error. Please check your connection and try again.");
        setLoading(false);
      }
    },
    [cart]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
      <div className="lg:col-span-2">
        <OrderableMenuList
          items={items}
          cart={cart}
          onAdd={addItem}
          onRemove={removeItem}
        />
      </div>
      <CartSidebar
        cart={cart}
        onCheckout={handleCheckout}
        loading={loading}
        error={error}
      />
    </div>
  );
}
