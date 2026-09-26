# The brand mark: the owner's own lockup

The owner supplied the mark themselves, as `owner-logo/SHE.png` (2000x2000 RGBA, transparent,
with the artwork in the middle band: x 290 to 1607, y 786 to 1425). **That file is the
authority on how the mark looks.** It replaces the six candidates the team drew for the
private comparison page, so `/mark-options` is gone and `mark-options/` and `directions/` are
archive only.

## What the mark is

A lowercase serif **t** in sage, its crossbar overhanging to the left, standing at the cap line
in front of the initials **SHE**: the **S** and **H** in ink, the **E** in sage. Underneath,
the name **THE SECOND HAND EDIT** letterspaced in grey. Three colours: ink `#282828`, sage
`#889880`, grey `#605858`.

## The rebuild

`public/monogram.svg` is the mark (the t and the three initials, no name line) rebuilt from the
site's own **Playfair Display 400** outlines. The owner's file turned out to be Playfair Display
400 itself, so this is a match rather than a lookalike: measured against their artwork at their
own 453px cap height, every letter lands within a pixel.

Every placement in it is measured out of the owner's PNG, not chosen:

| Relationship | The owner's file | The rebuild |
| --- | --- | --- |
| cap height (the H) | 453px | 453px (708 font units) |
| S ink, H ink, E ink | 274, 431, 332px | 274, 431, 332px |
| S to H, H to E white gap | 57px, 53px | 57px, 53px (89.09 and 82.83 units) |
| t ink size | 138 x 266px | 138 x 267px (0.60 of Playfair's t) |
| t ink top above the cap line | 83px | 84px |
| t ink bottom above the baseline | 270px | 269px |
| t ink left of the S ink | 173px | 174px |

The four `t` numbers are why the t is the one letter that is scaled rather than set at its own
size: at 0.60 it is 58.7% of the cap height, which is what their file shows (three separate
measurements of it gave 0.598 to 0.604, so 0.60 is used). The initials keep Playfair's own ink
gaps to within a unit.

## Files

| What | Where |
| --- | --- |
| The owner's artwork, the reference the mark is built from | `brand/owner-logo/SHE.png` |
| The mark, letters only: **source of truth** | `public/monogram.svg` |
| The same mark inline in React, header and footer | `src/components/Monogram.tsx` (generated from the SVG, exports `MONOGRAM_ASPECT`) |
| The square icon, 16px-safe | `public/icon.svg` |
| Browser icons | `public/favicon.ico` (16/32/48), `public/icon-192.png`, `public/icon-512.png` |
| iOS home screen | `public/apple-touch-icon.png` |
| Social share card, 1200x630 | `public/og-card.png`, composed from `brand/og-card.html` |

## The lockup, and the favicon

The full lockup is the mark with **THE SECOND HAND EDIT** letterspaced underneath. It is in the
footer (`src/components/Chrome.tsx`), matched to the owner's proportions: the name is centred
under the three initials rather than under the whole mark (the t's overhang is not counted), its
cap height is 9.05% of the initials' cap height, and the tracking is 0.37em. One approximation
lives here: the owner's name line is a geometric sans (its O is wider than the cap, its I is a
hairline), and the site owns no such face, so the name is set in the site's Inter, letterspaced
to their tracking. Letter widths differ by up to 15%, the tracking and the cap ratio do not.

**The favicon and the app icons are deliberately not the mark.** At 16px the t becomes a
hairline and the initials turn to mush, so `public/icon.svg` carries the three initials only, in
the owner's colours (cream S and H, sage E) on a solid ink field, which is what survives a tab.
It was judged on the real 16px raster, not on the drawing
(`/home/team/shared/screenshots/71-favicon-16px-magnified-6x.png`).

## Regenerating the rasters

No image library is added to the repo, and none is needed: the letterforms are paths, and a
browser renders them exactly. From `/home/team/shared/site` with the dev server running:

1. Put a temporary page in `public/` with `icon.svg` as `<img width="N" height="N">` at each
   size, screenshot each element at device scale 1 (so the browser does the rasterising), and
   save the results over `icon-192.png`, `icon-512.png` and `apple-touch-icon.png`.
2. Wrap the 16/32/48 PNGs into `favicon.ico` (a 6-byte ICONDIR, one 16-byte ICONDIRENTRY per
   image, then the PNG buffers; every current browser accepts PNG inside ICO).
3. The share card: copy `brand/og-card.html` into `public/`, screenshot `#card` at 1200x630
   with the mark at `height: 67px`, save it as `public/og-card.png`, delete the copy again.
4. Delete the temporary page, then check the head tags in the served HTML and that
   `/monogram.svg`, `/icon.svg`, `/favicon.ico`, `/icon-192.png`, `/icon-512.png`,
   `/apple-touch-icon.png` and `/og-card.png` all answer 200.

To redraw the mark itself, the geometry is regenerated from the fonts with fontTools (installed
outside the repo, never in its `package.json`): `SVGPathPen` with a `TransformPen((1, 0, 0, -1,
0, 0))` flips y, `BoundsPen` gives each glyph's ink box, and the letters are then placed by those
ink boxes using the numbers in the table above. `public/monogram.svg` is written first and
`src/components/Monogram.tsx` is generated from it, so the two can never drift.

## Archive

- `owner-logo/SHE.png`: the owner's file, kept as the reference.
- `mark-options/`: the six candidates drawn for the retired comparison page, kept as
  exploration. The owner's own mark won, so none of them is built.
- `directions/`: the two earlier directions, kept as exploration only. Nothing in `src/`
  references them.
