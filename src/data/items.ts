/**
 * THE SHOP DATA — every piece the shop sells lives in this one file.
 *
 * ── How the owner adds a real piece ──────────────────────────────────────────
 * 1. Put the photograph(s) in `public/images/items/` and reference them as
 *    "/images/items/<file>.jpg" (that folder is served from the site root).
 * 2. Add one object to the `items` array below. Copy an existing entry and edit
 *    it — every field is required except `brand`, `paymentLink` and `sold`.
 * 3. Delete the sample entries (and remove `sample: true` everywhere) once real
 *    pieces are in. Any entry with `sample: true` wears a visible "Sample
 *    listing" badge on the shop grid and on its item page, and the shop page
 *    prints a note saying these are examples. Never ship a sample without the
 *    badge, and never let a sample read as a real piece for sale.
 * 4. Set `paymentLink` to that piece's Stripe Payment Link (see the field note
 *    below) so the item page can send the buyer to checkout. A real piece with
 *    no `paymentLink` shows a loud "not for sale yet" warning instead of a Buy
 *    action — that warning is deliberate: no real piece may sit in the shop
 *    unable to be bought.
 * 5. When the piece sells, set `sold: true` on it (see the field note below) AND
 *    deactivate that piece's Stripe Payment Link in Stripe in the same sitting.
 *    The site hides a sold piece everywhere, but it cannot switch off the Stripe
 *    link — a live link on a sold piece can still take a buyer's money.
 *
 * ── The shape ────────────────────────────────────────────────────────────────
 * slug          URL ending: "/shop/camel-wool-overcoat". Lowercase, hyphens.
 * name          Piece name as it should read on the card and item page.
 * brand         The label on the piece. OPTIONAL — omit it when there is no
 *               visible label rather than inventing a brand.
 * price         Whole number in the shop currency (see `CURRENCY` in config.ts).
 *               Pieces sell between A$25 and A$120 — keep every price inside
 *               that band.
 * size          Size as marked, plus a plain-English fit hint where useful.
 * condition     One of the three values in `CONDITIONS` below.
 * category      One of the values in `CATEGORIES` below.
 * image         Path to the main photograph (and `imageAlt`, its description).
 * gallery       Optional extra photographs; they render under the main one.
 * summary       One line for the grid card.
 * notes         A short paragraph of honest detail for the item page.
 * measurements  Label/value pairs in cm, shown as a list on the item page.
 * sample        true while it is an example listing, not a real piece.
 * paymentLink   OPTIONAL, and only for the piece's own Stripe Payment Link.
 *               The value is a full "https://buy.stripe.com/…" URL, created by
 *               hand inside the business's own Stripe account — one link per
 *               piece, priced in AUD with the A$12 flat-rate shipping added at
 *               checkout and the buyer's shipping address collected there.
 *               Never invent one of these: the site does not create links and
 *               the shop must never point a buyer at a URL nobody owns. While a
 *               piece has no `paymentLink` (every sample below, until real
 *               pieces arrive) its page keeps the enquiry action instead.
 * sold          OPTIONAL. `sold: true` means the piece has gone: it drops off
 *               the shop grid, the homepage and the filter counts, and its own
 *               page shows a Sold state with no Buy and no Enquire action.
 *               Sold beats `paymentLink` in the code, so a sold piece can never
 *               render a buy action — but the Stripe link itself is still live
 *               until the owner deactivates it in Stripe (step 5 above).
 */

/** Grading vocabulary. Keep to these three so listings stay comparable. */
export const CONDITIONS = ["Excellent", "Very good", "Good"] as const;
export type Condition = (typeof CONDITIONS)[number];

/** Shop aisles, used for the filter chips on the shop page. */
export const CATEGORIES = [
  "Outerwear",
  "Dresses",
  "Knitwear",
  "Trousers",
  "Skirts",
  "Shoes",
] as const;
export type Category = (typeof CATEGORIES)[number];

export interface Measurement {
  label: string;
  value: string;
}

export interface Item {
  slug: string;
  name: string;
  brand?: string;
  price: number;
  size: string;
  condition: Condition;
  category: Category;
  image: string;
  imageAlt: string;
  gallery?: string[];
  summary: string;
  notes: string;
  measurements: Measurement[];
  sample: boolean;
  /**
   * The piece's Stripe Payment Link — a full "https://buy.stripe.com/…" URL.
   *
   * OPTIONAL, and left off every sample listing. There is one link per piece,
   * created in the business's own Stripe account (AUD, with the A$12 flat-rate
   * shipping added and the buyer's shipping address collected at checkout). The
   * site never creates a link and never invents a URL — it only sends the buyer
   * to the link that is set here.
   *
   * Set it and the item page's one action becomes "Buy this piece" and points
   * at Stripe. Leave it off a real piece (anything without `sample: true`) and
   * the item page shows a loud warning that the piece cannot be bought yet.
   */
  paymentLink?: string;
  /**
   * The piece has sold. OPTIONAL, and left off every piece still for sale.
   *
   * `sold: true` hides the piece from the shop grid, the homepage and every
   * count, and turns its own page into a Sold state: the name, the photograph
   * and the story stay (people share links), with no action of any kind and no
   * "Only one available" marker. The page also says plainly that the piece is
   * one of one and this one has gone.
   *
   * ── Sold beats link ────────────────────────────────────────────────────────
   * A piece with both `sold: true` and a `paymentLink` renders NO buy action:
   * the code checks `sold` first (see `canBuy` below). That is deliberate — a
   * stale link must never be offered on a piece that has gone.
   *
   * ── What the site cannot do ───────────────────────────────────────────────
   * The site cannot switch off a Stripe Payment Link. Marking a piece sold here
   * does not stop its link from taking money, so **deactivate the piece's
   * Payment Link in Stripe at the same time as marking it sold** — the link is
   * the real control, this flag is only the display. See CONTENT.md section 6.
   */
  sold?: boolean;
}

/**
 * The sample drop: ten example listings so the shop can be browsed end to end
 * before the owner's first real pieces arrive. Photographs are generated
 * placeholders in one studio style, prices and measurements are examples, and
 * every entry carries `sample: true`.
 */
export const items: Item[] = [
  {
    slug: "camel-wool-overcoat",
    name: "Camel Wool Overcoat",
    price: 118,
    size: "M — fits a UK 12–14",
    condition: "Excellent",
    category: "Outerwear",
    image: "/images/items/camel-wool-overcoat.jpg",
    imageAlt:
      "Camel wool overcoat photographed flat against a warm neutral studio backdrop",
    summary: "Double-faced wool, single-breasted, knee length.",
    notes:
      "A clean, tailored overcoat with a soft double-faced wool handle and jetted pockets. Worn lightly, with no marks or repairs; lining intact and buttons original.",
    measurements: [
      { label: "Chest, underarm to underarm", value: "54 cm" },
      { label: "Shoulder, seam to seam", value: "44 cm" },
      { label: "Length, back neck to hem", value: "108 cm" },
      { label: "Sleeve, shoulder to cuff", value: "62 cm" },
    ],
    sample: true,
  },
  {
    slug: "ivory-silk-slip-dress",
    name: "Ivory Silk Slip Dress",
    price: 86,
    size: "S — fits a UK 8",
    condition: "Very good",
    category: "Dresses",
    image: "/images/items/ivory-silk-slip-dress.jpg",
    imageAlt:
      "Ivory silk slip dress photographed flat on a neutral studio backdrop",
    summary: "Bias-cut silk, adjustable straps, midi length.",
    notes:
      "Bias-cut silk with a beautiful drape that skims rather than clings. Adjustable straps, worn twice. One faint mark near the hem, only visible in raking light.",
    measurements: [
      { label: "Bust, laid flat", value: "43 cm" },
      { label: "Waist, laid flat", value: "38 cm" },
      { label: "Length, strap to hem", value: "104 cm" },
    ],
    sample: true,
  },
  {
    slug: "indigo-denim-jacket",
    name: "Indigo Selvedge Denim Jacket",
    price: 95,
    size: "M",
    condition: "Excellent",
    category: "Outerwear",
    image: "/images/items/indigo-denim-jacket.jpg",
    imageAlt:
      "Indigo denim jacket photographed flat on a neutral studio backdrop",
    summary: "Selvedge denim, boxy cut, barely broken in.",
    notes:
      "Stiff selvedge denim in a deep indigo, with a boxy cut and patch pockets. Hardly worn, so the fading is still ahead of it. All hardware present and working.",
    measurements: [
      { label: "Chest, underarm to underarm", value: "57 cm" },
      { label: "Shoulder, seam to seam", value: "47 cm" },
      { label: "Length, back neck to hem", value: "62 cm" },
    ],
    sample: true,
  },
  {
    slug: "charcoal-cashmere-crewneck",
    name: "Charcoal Cashmere Crewneck",
    price: 78,
    size: "L",
    condition: "Excellent",
    category: "Knitwear",
    image: "/images/items/charcoal-cashmere-crewneck.jpg",
    imageAlt:
      "Folded charcoal cashmere crewneck jumper photographed on a neutral studio backdrop",
    summary: "Pure cashmere, fine gauge, ribbed trims.",
    notes:
      "A fine-gauge pure cashmere crewneck with ribbed cuffs and hem. Soft and even all over, with a light bloom and no thinning at the elbows or underarms.",
    measurements: [
      { label: "Chest, underarm to underarm", value: "56 cm" },
      { label: "Length, back neck to hem", value: "68 cm" },
      { label: "Sleeve, shoulder to cuff", value: "64 cm" },
    ],
    sample: true,
  },
  {
    slug: "rust-corduroy-trousers",
    name: "Rust Corduroy Wide-Leg Trousers",
    price: 52,
    size: '30" waist — fits a UK 12',
    condition: "Good",
    category: "Trousers",
    image: "/images/items/rust-corduroy-trousers.jpg",
    imageAlt:
      "Rust corduroy trousers photographed flat on a neutral studio backdrop",
    summary: "Fine-wale corduroy, high waist, wide leg.",
    notes:
      "High-waisted in a fine-wale corduroy, with a proper wide leg that falls from the hip. Sold as second-hand and honestly graded Good: the nap is slightly flattened at the knees.",
    measurements: [
      { label: "Waist, laid flat", value: "38 cm" },
      { label: "Inside leg", value: "72 cm" },
      { label: "Leg opening, laid flat", value: "30 cm" },
    ],
    sample: true,
  },
  {
    slug: "black-leather-biker-jacket",
    name: "Black Leather Biker Jacket",
    price: 120,
    size: "S — fits a UK 10",
    condition: "Excellent",
    category: "Outerwear",
    image: "/images/items/black-leather-biker-jacket.jpg",
    imageAlt:
      "Black leather biker jacket photographed flat on a neutral studio backdrop",
    summary: "Asymmetric zip, cropped cut, softened leather.",
    notes:
      "An asymmetric-zip biker in soft, already-broken-in leather — the kind of piece that takes years to get right. Zip runs smoothly; lining and all hardware sound.",
    measurements: [
      { label: "Chest, underarm to underarm", value: "50 cm" },
      { label: "Shoulder, seam to seam", value: "42 cm" },
      { label: "Length, back neck to hem", value: "52 cm" },
      { label: "Sleeve, shoulder to cuff", value: "60 cm" },
    ],
    sample: true,
  },
  {
    slug: "ecru-linen-blazer",
    name: "Ecru Linen Blazer",
    price: 64,
    size: "14",
    condition: "Very good",
    category: "Outerwear",
    image: "/images/items/ecru-linen-blazer.jpg",
    imageAlt:
      "Ecru linen blazer photographed flat on a neutral studio backdrop",
    summary: "Unstructured linen, patch pockets, single button.",
    notes:
      "Unstructured linen with patch pockets — light enough to wear as a jacket, sharp enough to wear over a dress. Dry-cleaned and ready; faint softening at the collar edge.",
    measurements: [
      { label: "Chest, underarm to underarm", value: "52 cm" },
      { label: "Shoulder, seam to seam", value: "43 cm" },
      { label: "Length, back neck to hem", value: "66 cm" },
    ],
    sample: true,
  },
  {
    slug: "emerald-velvet-skirt",
    name: "Emerald Velvet Midi Skirt",
    price: 58,
    size: "12",
    condition: "Very good",
    category: "Skirts",
    image: "/images/items/emerald-velvet-skirt.jpg",
    imageAlt:
      "Emerald velvet midi skirt photographed flat on a neutral studio backdrop",
    summary: "Deep green velvet, bias cut, side zip.",
    notes:
      "Rich emerald velvet on the bias, so it moves and catches the light as you walk. Concealed side zip. Velvet pile has been brushed back to an even finish.",
    measurements: [
      { label: "Waist, laid flat", value: "37 cm" },
      { label: "Length, waist to hem", value: "78 cm" },
    ],
    sample: true,
  },
  {
    slug: "cream-cable-knit-cardigan",
    name: "Cream Cable-Knit Cardigan",
    price: 62,
    size: "M/L — relaxed fit",
    condition: "Excellent",
    category: "Knitwear",
    image: "/images/items/cream-cable-knit-cardigan.jpg",
    imageAlt:
      "Cream cable-knit cardigan photographed flat on a neutral studio backdrop",
    summary: "Chunky lambswool cable, horn buttons.",
    notes:
      "A chunky cable knit in a warm cream lambswool, with horn-look buttons and a relaxed line. No pilling, no moth damage — one of the tidiest knits we have listed.",
    measurements: [
      { label: "Chest, underarm to underarm", value: "58 cm" },
      { label: "Length, back neck to hem", value: "70 cm" },
      { label: "Sleeve, shoulder to cuff", value: "62 cm" },
    ],
    sample: true,
  },
  {
    slug: "ochre-suede-ankle-boots",
    name: "Ochre Suede Ankle Boots",
    price: 88,
    size: "38 — fits a UK 5",
    condition: "Good",
    category: "Shoes",
    image: "/images/items/ochre-suede-ankle-boots.jpg",
    imageAlt:
      "Pair of ochre suede ankle boots photographed on a neutral studio backdrop",
    summary: "Soft suede, low block heel, resoled.",
    notes:
      "Soft ochre suede with a low block heel and a pull-on tab. Graded Good: the soles have been replaced and the suede shows light even wear at the toes.",
    measurements: [
      { label: "Size marked", value: "EU 38" },
      { label: "Heel height", value: "4 cm" },
      { label: "Shaft height", value: "11 cm" },
    ],
    sample: true,
  },
];

/** True while the shop contains any sample listings. */
export const HAS_SAMPLE_LISTINGS = items.some((item) => item.sample);
/**
 * Has this piece gone? A sold piece is hidden by the shop grid and the homepage,
 * and its own page renders no action at all - see the item route.
 */
export function isSold(item: Item): boolean {
  return item.sold === true;
}
/**
 * Every piece still for sale. Derived here, once, so the grid, the homepage and
 * every count on the site agree - a sold piece is never counted as available
 * and never appears as if it could be bought.
 */
export const availableItems: Item[] = items.filter((item) => !isSold(item));
/** True while at least one piece is still for sale (drives the shop's empty state). */
export const HAS_AVAILABLE_PIECES = availableItems.length > 0;
/**
 * The single place that decides whether a piece may be bought. `sold` is checked
 * FIRST, so it always beats `paymentLink`: a piece that has gone renders no buy
 * action even if it still carries a link in the data. That is the defensive half
 * of the sold rule - the other half is deactivating the link in Stripe, which
 * only a person can do (see CONTENT.md).
 */
export function canBuy(item: Item): boolean {
  return !isSold(item) && Boolean(item.paymentLink);
}

/**
 * A real piece (not a sample) that is still for sale but has no `paymentLink`
 * cannot be bought and must say so on its own page, loudly — see the item route.
 * This is the same safety net as `ENQUIRY_IS_PLACEHOLDER` in src/config.ts: the
 * shop should be unable to put a real piece on show without a way to pay for it.
 * A sold piece is not "unbuyable" — it is gone, and has its own state.
 */
export function isUnbuyable(item: Item): boolean {
  return !isSold(item) && !item.sample && !item.paymentLink;
}

/** The line shown once at the top of the shop while samples are on show. */
export const SAMPLE_NOTE =
  "Every piece below is an example listing while we photograph the first real drop — the photos, sizes, conditions and prices are placeholders, and nothing here is for sale yet.";

/** Look one up by slug. Returns undefined for an unknown slug. */
export function getItem(slug: string): Item | undefined {
  return items.find((item) => item.slug === slug);
}
