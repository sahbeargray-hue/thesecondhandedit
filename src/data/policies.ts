/**
 * THE POLICY COPY: the payment/returns wording for the shop, in one place.
 *
 * ── RETURNS_POLICY IS OWNER-APPROVED WORDING, USED VERBATIM ──────────────────
 * It is printed character-for-character on /policy, and every item page links
 * there from next to its action. Do NOT paraphrase it, shorten it, reorder it,
 * "tidy" it, change its punctuation or convert it to sentence case, not even
 * to make it sit better in a layout. If it ever needs to change, the owner
 * approves the new wording first.
 *
 * `scripts/check-policy-wording.mjs` holds its own copy of the approved
 * sentence and compares it against the wording the dev server actually serves,
 * so a stray edit fails a check instead of quietly shipping:
 *
 *     bun scripts/check-policy-wording.mjs
 *
 * Everything below is limited to facts the business can stand behind: no
 * carrier names, no delivery windows, no tracking promises, no free-shipping
 * threshold, no privacy or GST clause, and no warranty beyond the wording
 * above.
 */
import type { Condition } from "~/data/items";

/**
 * Flat rate charged on every order, in Australian dollars: the shop currency
 * (`CURRENCY` in src/config.ts). An order is charged this once.
 */
export const SHIPPING_FLAT_AUD = 12;

/** How the flat rate reads on the site: "A$12". */
export const SHIPPING_LABEL = `A$${SHIPPING_FLAT_AUD}`;

/** The one-line version, for next to a price or an action. */
export const SHIPPING_LINE = `Flat-rate shipping ${SHIPPING_LABEL}, to Australian addresses.`;

/** Owner-approved returns wording. Verbatim: see the note at the top. */
export const RETURNS_POLICY =
  "We do not accept returns of any items unless in accordance with Australian Consumer Law. To the extent permitted by law, we do not offer refunds or exchanges. We do our best to give accurate information in regard to products posted for sale in accordance with the advertised item condition standard criteria.";

/**
 * What each condition label used in `src/data/items.ts` means. Keyed by the
 * label itself, so this list can never drift from the shop data. These explain
 * the labels the shop already uses: they do not add a grading standard, a
 * guarantee, or a promise about any individual piece.
 */
export const CONDITION_USAGE: Record<Condition, string> = {
  Excellent: "Worn little, if at all. Any flaws are written into the listing.",
  "Very good":
    "Worn and looked after; any small flaws are written into the listing.",
  Good: "Clearly worn and in sound condition; the wear and any flaws are written into the listing.",
};

/** The one-line condition note that sits under the label list on /policy. */
export const CONDITION_NOTE =
  "Every piece here is one of one. The photographs and the notes on a listing describe the actual piece being sold, anything we noticed when we checked it over is written into that listing, and the photographs are of that same piece.";
