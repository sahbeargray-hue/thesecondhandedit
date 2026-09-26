import { Link } from "@tanstack/react-router";

import { Monogram } from "~/components/Monogram";
import { BUSINESS_NAME, SISTER_SITE, SISTER_SITE_IS_PLACEHOLDER } from "~/config";

/**
 * Sticky top bar. On a phone it is the mark plus the way into the shop. Nothing
 * else competes for the space, and the sister site's single link is in the
 * footer, not here.
 */
export function SiteHeader() {
  return (
    <header className="border-line bg-cream/88 sticky top-0 z-40 border-b backdrop-blur-md">
      {/* The mark is the owner's lockup: the small t rises above the cap line, so
          its box is taller than the initials and it is sized by height at each
          breakpoint, with the width derived from its proportions (a square box
          would squash it). 25px on a phone keeps the initials at the same optical
          size the old mark had at 22px; 34px does the same on a wide screen. */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3 sm:gap-6 sm:px-8 sm:py-4">
        <Link to="/" className="group flex items-center gap-2 sm:gap-2.5">
          <Monogram
            height={25}
            className="shrink-0 sm:h-[34px] sm:w-[80.88px]"
          />
          <span className="font-display text-ink text-[0.9rem] leading-none tracking-[0.01em] whitespace-nowrap sm:text-[1.15rem]">
            {BUSINESS_NAME}
          </span>
        </Link>

        <nav className="flex items-center gap-2.5 text-[0.6rem] font-medium tracking-[0.09em] text-muted uppercase sm:gap-7 sm:text-[0.68rem] sm:tracking-[0.18em]">
          <Link
            to="/shop"
            className="hover:text-ink whitespace-nowrap transition-colors"
            activeProps={{ className: "text-ink" }}
          >
            Shop
          </Link>
        </nav>
      </div>
    </header>
  );
}

/**
 * Closing bar: what the shop is, how to reach it, and the one way across to the
 * sister site. Sits on the sand band, which closes the page off from the cream
 * body instead of fading away in the same colour.
 */
export function SiteFooter() {
  return (
    <footer className="bg-sand border-sand-deep mt-20 border-t sm:mt-28">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <FooterLockup />
            <p className="text-muted mt-5 max-w-xs text-[0.85rem] leading-relaxed">
              A small shop for second-hand clothing. Each piece is listed once and sold
              once.
            </p>
          </div>

          <div className="label text-muted flex flex-col gap-3">
            <span className="text-charcoal">Browse</span>
            <Link to="/shop" className="hover:text-sage-deep transition-colors">
              Shop
            </Link>
            <Link to="/" className="hover:text-sage-deep transition-colors">
              Home
            </Link>
            <Link to="/policy" className="hover:text-sage-deep transition-colors">
              Policies
            </Link>
          </div>

          {/* The sister site's ONLY link on the whole site, in the footer. It was
              in the header and on a homepage band too, and the owner asked for
              one. While SISTER_SITE.url is still the placeholder marker there is
              no link here: a dead link is worse than none, and the moment a real
              address is set in src/config.ts this renders itself (see CONTENT.md
              section 3a). */}
          <div className="label text-muted flex flex-col gap-3">
            <span className="text-charcoal">Elsewhere</span>
            {SISTER_SITE_IS_PLACEHOLDER ? (
              <span className="text-muted">{SISTER_SITE.name}</span>
            ) : (
              <a
                href={SISTER_SITE.url}
                target="_blank"
                rel="noreferrer"
                className="hover:text-sage-deep transition-colors"
              >
                {SISTER_SITE.name}
              </a>
            )}
          </div>
        </div>

        <p className="label text-muted border-sand-deep mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 border-t pt-6">
          <span>© {new Date().getFullYear()}</span>
          <span aria-hidden className="bg-sage h-px w-4" />
          <span>Second-hand, one of a kind</span>
        </p>
      </div>
    </footer>
  );
}

/**
 * The owner's full lockup, as their own logo file draws it: the mark, and then the
 * business name letterspaced underneath in their grey.
 *
 * The proportions are measured off `brand/owner-logo/SHE.png`, not chosen:
 *
 *   - the name is centred under the three initials rather than under the whole
 *     mark, so the t's overhang on the left is not counted: the initials' ink runs
 *     from 13.51% to 99.42% of the mark's width;
 *   - the name's cap height is 9.05% of the initials' cap height (11px against the
 *     mark's 110px, 12px against 120px on a wide screen);
 *   - the tracking is 0.37em, the owner's own letterspacing;
 *   - their baseline-to-name gap is 0.139 of the initials' cap height, the rest of
 *     which the mark's own bottom padding already supplies.
 *
 * Colours are the owner's too: ink and sage in the mark, #605858 for the name.
 */
function FooterLockup() {
  return (
    <div className="flex w-[261.68px] flex-col items-start sm:w-[285.47px]">
      <Monogram height={110} className="shrink-0 sm:h-[120px] sm:w-[285.47px]" />
      <p className="mt-[7px] w-full pr-[0.58%] pl-[13.51%] text-center text-[11px] leading-none tracking-[0.37em] text-[#605858] uppercase sm:text-[12px]">
        {BUSINESS_NAME}
      </p>
    </div>
  );
}
