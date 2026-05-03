import Image from "next/image";
import type { MenuItem } from "@/types";
import SeasonalBadge from "./SeasonalBadge";

interface MenuCardProps {
  item: MenuItem;
  showAddToOrder?: boolean;
  onAdd?: (item: MenuItem) => void;
}

export default function MenuCard({ item, showAddToOrder, onAdd }: MenuCardProps) {
  return (
    <article className="flex gap-4 py-5 border-b border-crema last:border-0">
      {item.image && (
        <div className="relative w-20 h-20 shrink-0 rounded overflow-hidden">
          <Image
            src={item.image.asset.url}
            alt={item.image.alt ?? item.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-h3 text-espresso">{item.name}</h3>
            {item.seasonal && <SeasonalBadge />}
          </div>
          <span className="text-accent italic text-stone shrink-0 text-[15px]">
            £{item.price.toFixed(2)}
          </span>
        </div>

        {item.description && (
          <p className="text-small text-stone mt-1 leading-relaxed">{item.description}</p>
        )}

        {item.allergens.length > 0 && (
          <p className="text-label text-stone mt-2">
            Contains: {item.allergens.join(", ")}
          </p>
        )}

        {showAddToOrder && item.orderable && onAdd && (
          <button
            onClick={() => onAdd(item)}
            className="mt-3 text-sm font-body font-medium text-roast hover:text-espresso transition-colors underline-offset-4 hover:underline"
          >
            Add to order
          </button>
        )}
      </div>
    </article>
  );
}
