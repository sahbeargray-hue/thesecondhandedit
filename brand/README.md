# The brand mark — `tSHE`

The owner's read of the name: **The Second Hand Edit** → the initials **SHE**, with a
small lowercase **t** in front of them. That wordplay is the mark.

## What is drawn

A serif ligature, cut from the site's own display type — **Playfair Display 600** for
SHE and **Playfair Display 500** for the lowercase t — outlined as SVG paths, so the
mark renders identically everywhere with no webfont loaded.

- **SHE**, set large and locked up tight: each letter's stem slides a little behind its
  neighbour, so the three initials read as one solid form.
- The **t**, small (52% of the cap height) and raised to the cap line, perched just
  in front of the S. The initials read first; the t is deliberately secondary.
- Colour: S and E in ink (`--color-ink`, `#1f1d1a`), the middle **H** and the **t** in
  deep sage (`--color-sage-deep`, `#4a5c4c`), on cream or sand. Two colours, no second
  accent, no circle, no badge, no border.

The approach is the one the sister site uses (letterform-led, a serif ligature with one
accent letter on a warm ground). The letterforms, the palette and the shape are not.

## Files

| What | Where |
| --- | --- |
| The standing mark, letters only | `public/monogram.svg` — **source of truth** |
| The same mark inline in React (header + footer) | `src/components/Monogram.tsx` |
| Browser tab icon, 16/32/48 | `public/favicon.ico` — the **SHE-only** variant |
| App / manifest icons | `public/icon-192.png`, `public/icon-512.png` — the full **tSHE** mark on sand |
| iOS home screen | `public/apple-touch-icon.png` |
| Social share card, 1200×630 | `public/og-card.png`, composed from `brand/og-card.html` |

**The favicon is deliberately not the same drawing as the mark.** At 16px the small t
turns to mush, so the favicon carries the three initials only, re-centred in a square
of sand. The mark and the toolbar icon are allowed to differ; legibility wins. From
192px up the t is legible again, so those icons carry the full lockup.

## The other two directions

`brand/directions/` keeps the two directions that were designed but not built, so the
owner can swap if they prefer one of them:

| File | Direction |
| --- | --- |
| `01-perched.svg` | **Built.** The small t perched at the cap line before an interlocking SHE. |
| `02-wordmark.svg` | No overlap at all: one baseline, air between the letters, the t standing at the left as a prefix. Very legible, but it reads as plain text rather than as a mark. |
| `03-tucked.svg` | SHE as three plain ink initials with the t tucked inside the H's open upper counter. The most discreet, but at header size the t inside the H reads as a smudge. |

The three rendered side by side in the phone header, and the size ladder, are in
`/home/team/shared/screenshots/42-…` and `43-…`.

**To swap direction:** replace the `PATHS`/`VIEW_BOX`/`MONOGRAM_ASPECT` values in
`src/components/Monogram.tsx` and the contents of `public/monogram.svg` with the chosen
file (its viewBox is already tight; add ~12 units of padding if you want the same air),
then regenerate the icons and the share card as below.

## Regenerating the raster assets

There is no image library in the repo on purpose, and no image tool is needed: the
letterforms are paths, and a browser renders them exactly. From `/home/team/shared/site`
with the dev server running:

1. **Icons.** Render the icon SVGs in a browser at their final pixel size and screenshot
   each one — see the process used for the current set: a temporary page in `public/`
   with each icon as `<img width="N" height="N">`, one element screenshot per size at
   device scale 1, then wrap the 16/32/48 PNGs into `favicon.ico` (a 6-byte ICONDIR +
   one 16-byte ICONDIRENTRY per image + the PNG buffers; every current browser accepts
   PNG inside ICO). Delete the temporary page afterwards.
2. **Share card.** Follow the steps at the top of `brand/og-card.html` — it is a plain
   CSS page (Tailwind is not available to a static file), copied into `public/` for the
   screenshot and deleted again.
3. **Check the head tags** in the served HTML, not the source, and check every asset
   answers 200: `/monogram.svg`, `/favicon.ico`, `/icon-192.png`, `/icon-512.png`,
   `/apple-touch-icon.png`, `/og-card.png`.

If the card's composition changes, change `SHARE_IMAGE_ALT` in `src/routes/__root.tsx`
to match what is drawn — that description is what a screen reader announces.
