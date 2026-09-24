# Editing the content — The Second Hand Edit

Everything the shop shows comes from two files. Nothing else needs touching.

| What you want to change | File |
| --- | --- |
| The pieces for sale (photos, sizes, conditions, prices) | `src/data/items.ts` |
| Enquiry email, sister-site link, currency | `src/config.ts` |
| Shipping charge and the returns wording | `src/data/policies.ts` |
| The Stripe Payment Link that buys one piece | `paymentLink` on that piece in `src/data/items.ts` |
| Marking a piece sold (and switching its link off) | `sold: true` on that piece, plus its Payment Link deactivated in Stripe — see section 6 |

## 1. Adding a real piece

1. Put the photograph in `public/images/items/` — e.g. `public/images/items/camel-coat.jpg`.
   A portrait (4:5) photo works best; the grid crops to that shape.
   House style: garment only, plain warm neutral background, soft daylight, no faces,
   no visible brand labels/logos.
2. Copy one object in the `items` array in `src/data/items.ts` and edit it. Every field
   is required except `brand` — omit `brand` when the piece has no visible label rather
   than inventing one.
3. `price` is a whole number in the shop currency — Australian dollars (`CURRENCY` in
   `src/config.ts`). Pieces sell for **A$25–120**, so keep every price inside that band.
   Every price on the site is printed from that one setting, so it reads **A$118**, never a
   bare `$118` — and it matches the **A$12** flat-rate shipping line. `slug` becomes the URL:
   `/shop/<slug>`.
4. When a real piece is in, set `sample: false` on it (or delete the field's `true`).
5. Set `paymentLink` to that piece's Stripe Payment Link — see section 5 below. A real piece
   without one shows a loud "not for sale yet" warning on its page instead of a Buy button.

```ts
{
  slug: "camel-coat",              // the URL: /shop/camel-coat
  name: "Camel Wool Coat",
  brand: "Margate & Co",           // optional
  price: 118,                      // whole number, in the shop currency (A$25–120)
  size: "M — fits a UK 12–14",
  condition: "Excellent",          // "Excellent" | "Very good" | "Good"
  category: "Outerwear",           // one of CATEGORIES in the same file
  image: "/images/items/camel-coat.jpg",
  imageAlt: "Camel wool coat photographed flat on a neutral backdrop",
  gallery: [],                     // optional extra photos, shown under the main one
  summary: "Double-faced wool, knee length.",       // one line, used on the card
  notes: "A paragraph of honest detail for the item page.",
  measurements: [{ label: "Chest, underarm to underarm", value: "54 cm" }],
  sample: false,
  paymentLink: "https://buy.stripe.com/…",   // one Stripe Payment Link per piece — see section 5
}
```

## 2. Turning the samples off

The shop currently runs on ten example listings. Each one has `sample: true`, which puts a
visible **Sample listing** badge on its card and item page, and makes the shop page print a
note saying the listings are examples. While any item has `sample: true`:

- the badge shows on the shop grid and on that item's page,
- `HAS_SAMPLE_LISTINGS` is true, so the shop page and homepage print the sample note.

Delete the sample entries (or clear the array) and add the owner's real pieces; the badges
and notes disappear on their own. **Never** remove the badge from a listing that is not a
real piece — presenting a fabricated piece as real is the one thing this shop cannot do.

## 3. The enquiry address

`src/config.ts`:

```ts
export const ENQUIRY_EMAIL = "the-second-hand-edit-521890aa@ctomail.io";
```

That is the business inbox the owner provisioned: every "Enquire about this piece" action
opens the visitor's mail app addressed to it (with the piece's name, price, size and
condition already filled in), and `/policy` shows it as the shop's contact address. It is
written in this one file only — no address is repeated anywhere else on the site.

**Swapping it later.** When the shop has mail on its own domain, change this one value to
that address (e.g. `hello@thesecondhandedit.com.au`) and nothing else needs touching.

**The placeholder tripwire stays.** `ENQUIRY_IS_PLACEHOLDER` is true while the value still
contains `REPLACE-WITH-OWNER-EMAIL`; the item page and `/policy` then print a visible
reminder that enquiries are not wired up. Keep that check exactly as it is — it is what stops
a placeholder address shipping unnoticed if someone pastes one in again.

## 3a. The sister site — one link, in the footer

`src/config.ts`:

```ts
export const SISTER_SITE = {
  name: "The Vintage Edit",
  url: "https://REPLACE-WITH-SISTER-SITE-URL",   // ← the only thing to change
};
```

**The footer link is the only place The Vintage Edit appears on the site.** The owner asked
for the cross-promotion to be cut back, so the header link and the homepage band are gone —
please do not add another one anywhere. The link renders in the footer of every page, from
the `Elsewhere` column in `src/components/Chrome.tsx`.

**Why there is no link on the site right now.** The address that used to be in this file
(`https://thevintageedit.com`) was never confirmed with the owner and returned a server
error. As with the enquiry address, a placeholder must not ship: while the value still
contains `REPLACE-WITH-SISTER-SITE`, `SISTER_SITE_IS_PLACEHOLDER` is true and the footer
prints *"The Vintage Edit — link coming soon"* as plain text instead of a link.

**When the owner gives the real address**, paste it in as `url` above and nothing else needs
touching: the tripwire turns itself off and the footer link appears on every page. Delete
`REPLACE-WITH-SISTER-SITE` from the value — that string is the marker the check looks for, so
an address that still contains it will keep showing the "coming soon" note.

## 4. Policies — shipping, returns and condition
The `/policy` page (linked from the footer on every page) carries the shop's shipping line,
the returns policy, what the condition labels mean, and the enquiry address. Its wording
lives in `src/data/policies.ts`:

| What | Where in the file |
| --- | --- |
| Flat-rate shipping (currently A$12) | `SHIPPING_FLAT_AUD`, `SHIPPING_LABEL`, `SHIPPING_LINE` |
| The returns policy | `RETURNS_POLICY` |
| What each condition label means | `CONDITION_USAGE` |

**`RETURNS_POLICY` is owner-approved wording and is used exactly as written.** It must not be
paraphrased, shortened, reordered, "tidied", re-punctuated or converted to sentence case —
change it only when the owner has approved the new wording. To check the page still serves it
word-for-word (the working site must be running):

```bash
bun scripts/check-policy-wording.mjs
```

It compares what the site actually serves against its own copy of the approved sentence and
exits non-zero if they differ. The same line appears next to every price
(`src/components/PolicyLine.tsx`) as a text link to `/policy` — never a button, because an
item page has exactly one action.

Only facts the owner has confirmed belong on the policy page: no carrier names, delivery
windows, tracking promises, free-shipping thresholds, privacy/GST/ABN claims, governing-law
clauses or extra warranties.

## 5. Taking payment — one Stripe Payment Link per piece
Payment is part of this first version, and every piece is one of one, so it is bought on
its own: **one Stripe Payment Link per piece**, created by hand in the business's own Stripe
account. That is the whole checkout — there is no cart, no basket, no Stripe API integration
in the code and no keys in this repository. The site's only job is to send the buyer to that
piece's link, in AUD, with the A$12 flat-rate shipping added there.

**Who does what.** The owner (or the team lead acting for them) creates the price, the shipping
option and the Payment Link in the business's Stripe account and copies the finished link into
`src/data/items.ts`. The site never creates a link and never invents a URL: pointing a buyer at
a Stripe URL nobody owns would be the worst kind of error, so a link is only ever something a
person pasted in after creating it in Stripe.

**What each Payment Link must be, every time:**
- in **AUD** (the shop currency),
- with a **A$12 flat-rate shipping option** added for Australian addresses,
- collecting the **buyer's shipping address**.

Add it to the piece like any other field:
```ts
{
  slug: "camel-coat",
  name: "Camel Wool Coat",
  price: 118,
  // …
  sample: false,
  paymentLink: "https://buy.stripe.com/…",   // that piece's own Payment Link
}
```
Only the piece's own link goes here — never a general "shop" link, never the same link on two
pieces, and **never a link on a sample listing** (a sample is not for sale; every sample keeps
no `paymentLink` at all).

**What the site then does.** While a piece has a `paymentLink`, its page shows one action —
`Buy this piece — <price> + A$12 shipping` — which opens that link in a new tab. Everything
else on the page (the shipping-and-returns line, the measurements, the condition notes) stays
as plain text, so the page still has exactly one action.

**The safety net.** A real piece (`sample: false`) with **no** `paymentLink` shows a loud
"Not for sale yet — no payment link set" warning instead of a Buy action, and keeps the
enquiry action. That warning is deliberate: it is better for the owner to see an unbuyable
piece on the site than for a real listing to go live quietly with no way to buy it. It works
the same way as the placeholder-enquiry reminder in section 3.

**The shipping charge lives inside the Payment Link**, not on the site. The site only
*describes* it (A$12, from `SHIPPING_LABEL` in `src/data/policies.ts`) — there is no Stripe
shipping-rate id, price id or key anywhere in this repository, and no dependency on Stripe's
API. If the flat rate ever changes, it changes in two places: the Stripe account's shipping
rate, and `SHIPPING_FLAT_AUD` in `src/data/policies.ts`.

## 6. When a piece sells — mark it sold, and switch its link off

**Both steps, every time. The site can only do the first one.**

**Step 1 — mark the piece sold.** Add `sold: true` to that piece in `src/data/items.ts`:

```ts
{
  slug: "camel-coat",
  name: "Camel Wool Coat",
  price: 118,
  // …
  sample: false,
  paymentLink: "https://buy.stripe.com/…",
  sold: true,                                // ← the piece has gone
}
```

**Step 2 — deactivate that piece's Payment Link in Stripe.** Do this in the same sitting.

> **Why step 2 is not optional.** A Stripe Payment Link keeps taking money until it is
> switched off **in Stripe**. The site cannot do that: marking a piece `sold: true` hides it
> from the shop, the homepage and every count, and its page shows a Sold state with no Buy
> and no Enquire action — but if the link itself is still live, anyone who kept the old URL
> (a DM, a bookmark, a shared link) can still pay for a piece that has gone. The code is
> defensive about this (a sold piece never renders a buy action, even if `paymentLink` is
> still in the data — `canBuy()` in `src/data/items.ts` checks `sold` first), but **the
> Stripe link is the real control and only a person can switch it off.**

What `sold: true` does on the site:

- the piece disappears from the shop grid, the homepage and every piece count;
- its own page still resolves, so shared links do not break — the name, photograph, notes
  and measurements stay, under a **Sold** state that says plainly the piece is one of one
  and this one has gone;
- that page carries **no actions at all** — no Buy, no Enquire — and no "Only one
  available" marker, just the Sold panel and a link back to the shop;
- if every piece is sold, the shop shows an honest empty state ("Everything has found a
  home") instead of a blank grid.

Leave `sold` off a piece that is still for sale. If a piece is listed in error rather than
sold, delete its entry from `src/data/items.ts` instead (and deactivate its link) — that is
the only thing the site cannot show a story for.

## 7. Previewing and shipping

- Edits appear immediately on the working site; `bun run build` checks the code compiles.
- Shipping is done by the team lead (`publish_site`).

## 8. The brand look

Nothing here needs changing unless the owner wants a different look.

| What | Where |
| --- | --- |
| Colours (sage + sand) and type | the `@theme` block at the top of `src/styles/app.css` |
| The mark (the `tSHE` ligature), header and footer | `src/components/Monogram.tsx` |
| The standalone mark | `public/monogram.svg` |
| Browser icons | `public/favicon.ico` (the SHE-only variant — see `brand/README.md`) |
| App icons | `public/icon-192.png`, `public/icon-512.png` |
| iOS home-screen icon | `public/apple-touch-icon.png` |
| Social share card (1200×630) | `public/og-card.png`, composed from `brand/og-card.html` |
| The mark's two unbuilt directions, and how to swap | `brand/` — see `brand/README.md` |

The mark is the owner's wordplay: the initials **SHE** in the site's display serif, with a
small lowercase **t** perched in front of them. The letterforms are paths, not live text, so
the mark never depends on a webfont — and the favicon is a simplified SHE-only drawing on
purpose, because the t is unreadable at 16px. `brand/README.md` covers the drawing, the two
directions that were not built, and how to regenerate the icons and the share card.

`SITE_URL` in `src/config.ts` is the address the share card is published under. When the
shop is served from the business's own domain, change it there and link previews follow.

Payment is **in scope**: one Stripe Payment Link per piece (section 5), and anything that is
not a piece for sale is handled by email. Out of scope for this first version, on purpose:
accounts, cart/basket, seller tools and inventory admin.

Selling a piece is a two-step job — `sold: true` in `src/data/items.ts` *and* the piece's
Payment Link deactivated in Stripe (section 6). The code is written so a sold piece can never
render a buy action, but the Stripe link is the real control and the site cannot reach it.
