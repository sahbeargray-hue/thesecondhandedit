# The six candidate marks

The drawings for the private `/mark-options` page, one SVG per candidate, in the order the page
numbers them. They are the same geometry the page renders (see
`src/components/mark-options/marks.ts`), kept here as files so the chosen one can be lifted out
and rebuilt into the mark, the icons and the share card without redrawing anything.

| File | Candidate | What it does differently |
| --- | --- | --- |
| `01-wordmark.svg` | **Wordmark** | Real air between the letters, the t on the baseline at the left as a prefix, H and t in sage. This is `directions/02-wordmark.svg`. |
| `02-tucked.svg` | **Tucked** | Three ink initials with the t small inside the H's upper counter. This is `directions/03-tucked.svg`. |
| `03-ledger.svg` | **Ledger** | Playfair 400, one ink, air, no t at all, and a sage rule under the initials. |
| `04-tall.svg` | **Tall t** | A tight lockup with a much larger t drawn from the heavier 600 outlines, accent on E and t. |
| `05-superscript.svg` | **Superscript** | Air between the letters and the t small and raised above the cap line. |
| `06-field.svg` | **Field** | Cream letters in a solid sage field, with the initials at three different heights. |

`01-` and `02-` are copies of the unbuilt directions in `../directions/`; the other four were
drawn for the comparison. All six are cut from the site's own Playfair Display outlines with
fontTools (400 / 500 / 600), so every letterform is the brand type.

## How they were made

The pipeline is not in the repo on purpose (it needs a Python fontTools install, and the site
takes no new dependencies). To redraw or vary one:

1. Extract the outlines from `public/fonts/playfair-display-<weight>-normal.woff2` with
   fontTools: `SVGPathPen` with a `TransformPen((1, 0, 0, -1, 0, 0))` flips y so the paths can be
   written straight into an SVG, and `BoundsPen` gives each glyph's ink box for placing it.
   Playfair metrics worth knowing: units per em 1000, cap height 708, the S overshoots to -720 and
   +14, the lowercase t is 681 tall and 359 wide.
2. Place the letters by their ink boxes, not their advances, when the lockup is tight. A t whose
   top sits on the cap line at scale s has its baseline at `-708 + 681 * s`.
3. Emit the viewBox as the union of the ink boxes plus 24 units of padding, and keep
   `aspect = width / height`, because the header sizes the mark by height and derives the width.

## Regenerating the 16px rasters

`src/components/mark-options/rasters.ts` holds each candidate drawn at exactly 16 pixels. To redo
one: put the SVG in a temporary page as `<img>` or inline `<svg>` at `height="16"`, screenshot
that element at device scale 1 (so the browser, not the display, does the rasterising), and inline
the PNG as a data URI. Never judge a favicon from a scaled-up drawing.
