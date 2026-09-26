import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

import { ItemCard } from "~/components/ItemCard";
import { BUSINESS_NAME } from "~/config";
import { HAS_SAMPLE_LISTINGS, availableItems } from "~/data/items";

export const Route = createFileRoute("/")({
  component: Home,
});

/** Three pieces to show on the homepage: a coat, a skirt and a pair of boots. */
const FEATURED_SLUGS = ["camel-wool-overcoat", "emerald-velvet-skirt", "ochre-suede-ankle-boots"];

const REASONS = [
  {
    heading: "One of one",
    body: "Nothing here is duplicated. One size, one condition, one piece. There is no restock and no second size waiting behind it.",
  },
  {
    heading: "A better price",
    body: "Clothing that has already been made, priced for what it is worth now rather than what it cost new.",
  },
  {
    heading: "Less waste",
    body: "Every piece we sell is a garment that stays in use instead of being replaced by something newly made.",
  },
];

function Home() {
  // Only pieces still for sale: a sold piece must not appear on the homepage as
  // though it could be bought. `availableItems` is the same list the shop uses.
  const featured = FEATURED_SLUGS.map((slug) =>
    availableItems.find((item) => item.slug === slug),
  ).filter((item) => item !== undefined);

  return (
    <>
      {/* Owner-only preview bar: temporary while the mark is being chosen. It
          ships with the /mark-options route and comes out with it once the owner
          has picked, so the shop never carries it in public. */}
      <div className="bg-sage-deep text-sand">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-3 gap-y-1 px-5 py-2.5 text-[0.78rem] sm:px-8">
          <span className="label text-sand">Private preview</span>
          <Link
            to="/mark-options"
            className="underline decoration-sand/40 underline-offset-4 transition-colors hover:decoration-sand"
          >
            Compare six logo options
          </Link>
        </div>
      </div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pt-8 sm:px-8 sm:pt-14 lg:pt-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16">
          <div className="order-2 lg:order-1">
            <p className="label text-sage-deep">Second-hand, first choice</p>
            <h1 className="font-display text-ink mt-4 text-[2.2rem] leading-[1.06] tracking-[-0.01em] sm:text-[2.9rem] lg:text-[3.4rem]">
              Every piece here is the only one.
            </h1>
            <p className="text-muted mt-5 max-w-md text-[0.95rem] leading-relaxed sm:text-[1.02rem]">
              {BUSINESS_NAME} is a small shop for second-hand clothing, chosen one piece
              at a time. Photographed properly, described honestly, listed once, when a
              piece goes, it goes.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link
                to="/shop"
                className="label bg-sage-deep text-cream hover:bg-sage-dark px-6 py-3.5 transition-colors"
              >
                Shop the edit
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <img
              src="/images/hero-rail.jpg"
              alt="A short rail of second-hand garments in camel, cream, rust and charcoal against a warm plaster wall"
              className="aspect-[4/3] w-full object-cover sm:aspect-[16/10]"
            />
          </div>
        </div>
      </section>

      {/* Why second-hand first */}
      <section className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 sm:pt-24">
        <div className="rule pt-8">
          <p className="label text-muted">Why second-hand first</p>
          <div className="mt-8 grid gap-9 sm:grid-cols-3 sm:gap-10">
            {REASONS.map((reason) => (
              <div key={reason.heading}>
                <h2 className="font-display text-ink text-[1.3rem]">{reason.heading}</h2>
                <p className="text-muted mt-3 text-[0.9rem] leading-relaxed">
                  {reason.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* In the shop now */}
      <section className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 sm:pt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label text-muted">In the shop now</p>
            <h2 className="font-display text-ink mt-3 text-[1.7rem] leading-tight sm:text-[2.1rem]">
              A first look at the rail
            </h2>
          </div>
          <Link
            to="/shop"
            className="label text-ink hover:text-sage-deep border-line border-b pb-1 transition-colors"
          >
            {availableItems.length > 0
              ? `See all ${String(availableItems.length)} pieces`
              : "See what is available"}
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3">
            {featured.map((item) => (
              <ItemCard key={item.slug} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-muted mt-8 text-[0.9rem] leading-relaxed">
            Nothing on the rail at the moment. Everything listed so far has sold, and each
            piece is the only one of its kind, so the rail fills up again as new pieces are
            photographed and listed.
          </p>
        )}

        {HAS_SAMPLE_LISTINGS ? (
          <p className="text-muted border-line mt-8 border-t pt-4 text-[0.78rem] leading-relaxed">
            The pieces above are sample listings, shown so the shop can be browsed end to
            end before the first real drop arrives.
          </p>
        ) : null}
      </section>
    </>
  );
}
