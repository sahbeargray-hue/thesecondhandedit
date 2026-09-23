import { Link } from "@tanstack/react-router";

import { OnlyOneMarker, SampleBadge } from "~/components/Badges";
import { formatPrice } from "~/config";
import type { Item } from "~/data/items";

/**
 * One piece in a grid: photo, name, price, size, condition and the one-of-one
 * marker. Whole card is the link to the item page. Sizes to roughly 160px wide
 * and up, so it works two-up on a phone as well as three-up on a desktop.
 */
export function ItemCard({ item }: { item: Item }) {
  return (
    <Link
      to="/shop/$slug"
      params={{ slug: item.slug }}
      className="group block focus-visible:outline-offset-4"
    >
      <div className="relative overflow-hidden bg-paper">
        <img
          src={item.image}
          alt={item.imageAlt}
          loading="lazy"
          decoding="async"
          className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        {item.sample ? <SampleBadge className="absolute top-2.5 left-2.5" /> : null}
      </div>

      <div className="mt-3 space-y-1.5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-[1.02rem] leading-snug text-ink">
            {item.name}
          </h3>
          <span className="shrink-0 text-[0.9rem] font-medium text-ink">
            {formatPrice(item.price)}
          </span>
        </div>
        {item.brand ? <p className="label text-muted">{item.brand}</p> : null}
        <p className="text-[0.8rem] text-muted">
          {item.size} <span aria-hidden>·</span> {item.condition}
        </p>
        <OnlyOneMarker className="pt-0.5" />
      </div>
    </Link>
  );
}
