/**
 * Site configuration: the one file to edit for anything only the owner can
 * supply. Everything here is safe to render in the browser (no secrets).
 */

/* ─────────────────────────────────────────────────────────────────────────────
 * ENQUIRY DESTINATION: the business inbox
 * ─────────────────────────────────────────────────────────────────────────────
 * Every "Enquire about this piece" action on an item page opens the visitor's
 * email app with the piece name already filled in, addressed to this address,
 * and /policy shows it as the contact address. It is the only place the address
 * is written on the site.
 *
 * The value below is the business inbox the owner provisioned. It can be
 * swapped for an address on the business's own domain
 * (e.g. "hello@thesecondhandedit.com.au") once that mail is set up, changing
 * it here and nowhere else is the whole job.
 *
 * While the value still contains "REPLACE-WITH-OWNER-EMAIL" the item page shows
 * a visible reminder that enquiries are not yet wired up, so a placeholder can
 * never ship silently. Keep that check (`ENQUIRY_IS_PLACEHOLDER`) intact
 * whatever the address becomes, it is the tripwire, not the address.
 *
 * To use Instagram instead, set this to the handle with an "@" (e.g. "@shopthesecondhandedit")
 * and change the item page's action to `href={`https://instagram.com/${handle}`}`.
 */
export const ENQUIRY_EMAIL = "the-second-hand-edit-521890aa@ctomail.io";

/**
 * True while the address above is still a placeholder. The marker is deliberately
 * matched inside the value, so a real address that happens to contain it is
 * impossible to ship by accident.
 */
export const ENQUIRY_IS_PLACEHOLDER = ENQUIRY_EMAIL.includes("REPLACE-WITH-OWNER-EMAIL");

/**
 * The sister site: exactly ONE link on the whole site, in the footer
 * (`src/components/Chrome.tsx`). It used to be in the header and on a homepage
 * band as well; the owner asked for it to be cut back, so those are gone. Do not
 * add another one anywhere else.
 *
 * The address below is set and confirmed by the owner: the `.com.au` address is
 * the real public one, and the `.com` returns a server error, so it must not be
 * used. Nothing else on the site links to The Vintage Edit.
 */
export const SISTER_SITE = {
  name: "The Vintage Edit",
  url: "https://thevintageedit.com.au",
};

/**
 * True while the address above is still the placeholder. Same pattern as
 * `ENQUIRY_IS_PLACEHOLDER`: the footer then shows the sister site's name as plain
 * text instead of a link, so a dead link cannot ship, and an address can simply be
 * pasted in above. The marker is matched inside the value, so an address that
 * happens to contain it is impossible to ship by accident.
 *
 * The value above is the confirmed address, so this is false today and the footer
 * renders the link. The tripwire is deliberately kept: setting the value back to
 * a marker stops the link rendering rather than shipping a dead one.
 */
export const SISTER_SITE_IS_PLACEHOLDER = SISTER_SITE.url.includes(
  "REPLACE-WITH-SISTER-SITE",
);

/**
 * Prices are written without a currency in the data file; this is how they read.
 * Australian dollars, and the prefix is part of the symbol so every price on the
 * site matches the A$12 shipping line instead of showing a bare "$".
 */
export const CURRENCY = { symbol: "A$", code: "AUD" };

/** Business name, mirrored in site.json so the shell and the copy agree. */
export const BUSINESS_NAME = "The Second Hand Edit";

/**
 * The address the shop is served from. It is used only to make the social
 * share-card URLs absolute, because link-preview crawlers need a full URL
 * rather than a path.
 *
 * ⚠️ This is the shop's current public address. When the shop is served from
 * the business's own domain, change it here and nowhere else.
 */
export const SITE_URL = "https://e9fda9f225a3a64577a68a9f1c45f2c1.ctonew.app";

/** Format a whole-number price for display: 148 -> "A$148". */
export function formatPrice(amount: number): string {
  return `${CURRENCY.symbol}${amount.toLocaleString("en-AU")}`;
}
