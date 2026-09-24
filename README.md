# The Second Hand Edit

The storefront for **The Second Hand Edit**, a small shop for second-hand clothing, one piece at a time. Sister site to The Vintage Edit.

## Running it
TanStack Start + React + Tailwind, served on port 3000.

```bash
bun install
bun run dev      # dev server
bun run build    # production build
```

- `CONTENT.md`: how to add a piece, mark it sold, and take payment. Start here.
- `SITE.md`: framework and hosting notes.
- `src/data/items.ts`: every listing lives here, one typed source.
- `src/config.ts`: the few values only the owner can supply.

## How selling works
One **Stripe Payment Link per piece**, in AUD, with the A$12 flat-rate shipping rate attached, and Stripe collecting the buyer's shipping address. There is no cart, no basket, no accounts and no database. Pieces sell for A$25–120.

When a piece sells: mark it sold in the item data **and** deactivate its Payment Link in Stripe. The site is defensive (a sold piece never renders a buy action), but a live link can still take money.

## On the base codebase
The owner's brief called for this site to be built from a copy of The Vintage Edit codebase. That codebase was reviewed and deliberately **not** imported: it is the same TanStack Start scaffold this site already uses (an older revision of the same template), plus TVE-specific lookbook/styling-box and gift-certificate features this business's brief explicitly bans, and a database-backed single-box order flow replaced here by per-piece Stripe Payment Links. The Vintage Edit repository itself is untouched.

## Rules that are not style preferences
- The returns policy wording is verbatim: do not paraphrase or "improve" it (`src/data/policies.ts`, checked by `scripts/check-policy-wording.mjs`).
- Never present a fabricated product, price or statistic as real. Sample listings carry a visible "Sample listing" badge.
- Never claim a payment was taken when none was.
