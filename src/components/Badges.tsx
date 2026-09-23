/**
 * Visible honesty marker: every listing that is an example rather than a real
 * piece for sale wears this badge. It appears on the shop grid and on the item
 * page. Do not remove it while `sample: true` is set on an item.
 */
export function SampleBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`label inline-flex items-center gap-1.5 rounded-full border border-charcoal/20 bg-cream/92 px-2.5 py-1 text-charcoal backdrop-blur-sm ${className}`}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-sage-deep" />
      Sample listing
    </span>
  );
}

/** The one-of-one marker shown on every card and item page. */
export function OnlyOneMarker({ className = "" }: { className?: string }) {
  return (
    <p className={`label flex items-center gap-2 text-sage-deep ${className}`}>
      <span aria-hidden className="h-px w-4 bg-sage" />
      Only one available
    </p>
  );
}
