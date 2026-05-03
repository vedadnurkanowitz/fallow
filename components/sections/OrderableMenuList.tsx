import type { MenuItem, CartItem } from "@/types";
import SeasonalBadge from "@/components/ui/SeasonalBadge";
import Image from "next/image";

interface OrderableMenuListProps {
  items: MenuItem[];
  cart: CartItem[];
  onAdd: (item: MenuItem) => void;
  onRemove: (itemId: string) => void;
}

export default function OrderableMenuList({
  items,
  cart,
  onAdd,
  onRemove,
}: OrderableMenuListProps) {
  if (items.length === 0) {
    return (
      <p className="text-small text-stone py-8">
        No items available for pre-order right now.
      </p>
    );
  }

  // Group by category
  const grouped = items.reduce<Record<string, { label: string; items: MenuItem[] }>>(
    (acc, item) => {
      const key = item.category.slug.current;
      if (!acc[key]) acc[key] = { label: item.category.title, items: [] };
      acc[key].items.push(item);
      return acc;
    },
    {}
  );

  return (
    <div className="space-y-10">
      {Object.entries(grouped).map(([slug, group]) => (
        <section key={slug}>
          <h2 className="text-h3 text-espresso border-b border-crema pb-2 mb-4">
            {group.label}
          </h2>
          <div className="space-y-0">
            {group.items.map((item) => {
              const cartItem = cart.find((c) => c.menuItem._id === item._id);
              const qty = cartItem?.quantity ?? 0;

              return (
                <article
                  key={item._id}
                  className="flex gap-4 py-4 border-b border-crema last:border-0"
                >
                  {item.image && (
                    <div className="relative w-16 h-16 shrink-0 rounded overflow-hidden">
                      <Image
                        src={item.image.asset.url}
                        alt={item.image.alt ?? item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 flex-wrap">
                      <span className="text-h3 text-espresso">{item.name}</span>
                      {item.seasonal && <SeasonalBadge />}
                    </div>
                    {item.description && (
                      <p className="text-small text-stone mt-0.5 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                    <p className="font-accent italic text-stone text-[14px] mt-1">
                      £{item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity control */}
                  <div className="flex items-center gap-2 shrink-0 self-center">
                    {qty > 0 ? (
                      <>
                        <button
                          onClick={() => onRemove(item._id)}
                          className="w-8 h-8 rounded-full border border-stone text-stone hover:border-espresso hover:text-espresso transition-colors flex items-center justify-center text-lg leading-none"
                          aria-label={`Remove one ${item.name}`}
                        >
                          −
                        </button>
                        <span className="w-5 text-center text-body text-espresso font-medium tabular-nums">
                          {qty}
                        </span>
                        <button
                          onClick={() => onAdd(item)}
                          className="w-8 h-8 rounded-full bg-roast text-milk hover:bg-espresso transition-colors flex items-center justify-center text-lg leading-none"
                          aria-label={`Add another ${item.name}`}
                        >
                          +
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => onAdd(item)}
                        className="px-4 py-1.5 text-sm font-body font-medium border border-roast text-roast hover:bg-roast hover:text-milk rounded-sm transition-colors"
                        aria-label={`Add ${item.name} to order`}
                      >
                        Add
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
