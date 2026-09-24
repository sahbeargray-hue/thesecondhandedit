import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { ItemCard } from "~/components/ItemCard";
import { PolicyLine } from "~/components/PolicyLine";
import { CATEGORIES, HAS_SAMPLE_LISTINGS, SAMPLE_NOTE, availableItems } from "~/data/items";

export const Route = createFileRoute("/shop/")({
  component: Shop,
  head: () => ({
    meta: [
      { title: "Shop, The Second Hand Edit" },
      {
        name: "description",
        content:
          "Every piece currently on the rail: second-hand clothing, one of each, with size, condition and price. When a piece goes, it goes.",
      },
    ],
  }),
});

const ALL = "All";

function Shop() {
  const [category, setCategory] = useState<string>(ALL);
  // Sold pieces never reach the grid, so neither the grid nor the count below
  // can show a piece that has gone as if it were still for sale.
  const shown =
    category === ALL
      ? availableItems
      : availableItems.filter((item) => item.category === category);
  const chips = [ALL, ...CATEGORIES];
  const nothingLeft = availableItems.length === 0;

  return (
    <section className="mx-auto max-w-6xl px-5 pt-10 sm:px-8 sm:pt-16">
      <header className="max-w-2xl">
        <p className="label text-sage-deep">The shop</p>
        <h1 className="font-display text-ink mt-4 text-[2rem] leading-[1.1] sm:text-[2.6rem]">
          Second-hand, all of it
        </h1>
        <p className="text-muted mt-4 text-[0.95rem] leading-relaxed">
          Each listing is a single piece. There is one size, one condition and one price
          per card, and once it sells, it does not come back.
        </p>
      </header>

      {HAS_SAMPLE_LISTINGS ? (
        <p className="text-muted border-sand-deep bg-sand/50 mt-7 border px-4 py-3.5 text-[0.8rem] leading-relaxed">
          {SAMPLE_NOTE}
        </p>
      ) : null}

      {nothingLeft ? (
        /* Every piece has sold. An honest, finished-looking page beats an empty
           grid, and it says the one thing that is true here: new pieces come
           when they come. */
        <div className="border-sand-deep bg-sand/40 mt-8 border px-6 py-14 text-center sm:px-10 sm:py-20">
          <p className="label text-sage-deep">Nothing on the rail right now</p>
          <h2 className="font-display text-ink mt-4 text-[1.7rem] leading-tight sm:text-[2.1rem]">
            Everything has found a home.
          </h2>
          <p className="text-muted mx-auto mt-4 max-w-md text-[0.92rem] leading-relaxed">
            Every piece listed so far has sold, and each one was the only one of its kind,
            so none of them come back. New pieces go up as they are photographed, checked
            over and priced, which means the rail is worth another look soon.
          </p>
          <Link
            to="/"
            className="label text-ink decoration-sand-deep hover:decoration-sage-deep mt-7 inline-block underline underline-offset-4 transition-colors"
          >
            Back to the front
          </Link>
        </div>
      ) : (
        <>
          {/* Category chips: the only filtering, and it stays out of the way on a phone. */}
          <div className="border-line mt-8 border-b pb-4">
            <div className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
              {chips.map((chip) => {
                const active = chip === category;
                return (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => {
                      setCategory(chip);
                    }}
                    aria-pressed={active}
                    className={`label shrink-0 border px-3.5 py-2 transition-colors ${
                      active
                        ? "border-sage-deep bg-sage-deep text-cream"
                        : "border-line text-muted hover:border-sage-deep/40 hover:text-ink"
                    }`}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Counts available pieces only: a sold piece is not on the rail. */}
          <p className="label text-muted mt-5">
            {shown.length} {shown.length === 1 ? "piece" : "pieces"}
            <span aria-hidden className="bg-line mx-3 inline-block h-px w-5 align-middle" />
            one of each
          </p>

          <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-11 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((item) => (
              <ItemCard key={item.slug} item={item} />
            ))}
          </div>

          {shown.length === 0 ? (
            <p className="text-muted mt-10 text-[0.9rem]">
              Nothing in this aisle right now. Try another category.
            </p>
          ) : null}
        </>
      )}

      {/* One small line for the two things a buyer asks before an enquiry. It
          stays a text link so nothing on this page competes with the pieces. */}
      <PolicyLine className="border-line mt-12 border-t pt-5" />
    </section>
  );
}
