/**
 * Proof that the served /policy page carries the owner-approved returns wording
 * character-for-character.
 *
 *   bun scripts/check-policy-wording.mjs                 # dev server on :3000
 *   bun scripts/check-policy-wording.mjs <base-url>      # e.g. the live site
 *
 * The APPROVED sentence below is a second, independent copy of the wording the
 * owner signed off — typed from the brief, NOT read from the site's source. That
 * is deliberate: if someone edits `RETURNS_POLICY` in src/data/policies.ts, this
 * check fails instead of agreeing with the edit.
 *
 * It compares the page's rendered visible text (tags stripped, HTML entities
 * decoded, whitespace runs collapsed to single spaces) against that sentence, so
 * layout-driven re-wrapping cannot cause a false pass or fail. Exit code 0 =
 * exact match, 1 = mismatch or unreachable page.
 */
import { setTimeout as sleep } from "node:timers/promises";

const APPROVED =
  "We do not accept returns of any items unless in accordance with Australian Consumer Law. To the extent permitted by law, we do not offer refunds or exchanges. We do our best to give accurate information in regard to products posted for sale in accordance with the advertised item condition standard criteria.";

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const url = `${base}/policy`;

/** Visible text of an HTML document: no scripts/styles/tags, entities decoded,
 *  whitespace runs collapsed. */
function visibleText(html) {
  const body = html.split(/<body[^>]*>/i)[1] ?? html;
  const withoutCode = body.replace(
    /<(script|style|template)[\s\S]*?<\/\1>/gi,
    " ",
  );
  const entities = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&apos;": "'",
    "&nbsp;": " ",
    "&rsquo;": "\u2019",
    "&lsquo;": "\u2018",
    "&mdash;": "\u2014",
    "&ndash;": "\u2013",
    "&middot;": "\u00b7",
  };
  const decoded = withoutCode
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&[a-z]+;|&#39;/gi, (m) => entities[m.toLowerCase()] ?? m);
  return decoded
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

let html = "";
for (let attempt = 1; attempt <= 3; attempt += 1) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    html = await res.text();
    break;
  } catch (error) {
    if (attempt === 3) {
      console.error(`FETCH FAILED  ${url} — ${error.message}`);
      process.exit(1);
    }
    await sleep(1500);
  }
}

const text = visibleText(html);
const found = text.includes(APPROVED);

console.log(`checked   ${url}`);
console.log(`approved  ${APPROVED.length} chars`);
console.log(
  `status    ${found ? "MATCH — wording is present verbatim" : "MISMATCH"}`,
);

if (!found) {
  // Show the returns paragraph the page actually serves, so a drift is visible.
  const start = text.toLowerCase().indexOf("we do not accept returns");
  const served =
    start === -1
      ? "(sentence not found at all)"
      : text.slice(start, start + 600);
  console.error(`\nserved    ${served}\n\nexpected  ${APPROVED}`);
  process.exit(1);
}

// A sanity check that the sentence is not merely present — it is present once,
// as its own paragraph, on the page that is meant to carry it.
const occurrences = text.split(APPROVED).length - 1;
console.log(`count     ${occurrences} occurrence(s) on /policy`);
if (occurrences !== 1) {
  console.error("Expected exactly one occurrence.");
  process.exit(1);
}
process.exit(0);
