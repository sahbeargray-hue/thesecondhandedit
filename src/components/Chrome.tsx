import { Link } from "@tanstack/react-router";

import { Monogram } from "~/components/Monogram";
import { BUSINESS_NAME, SISTER_SITE, SISTER_SITE_IS_PLACEHOLDER } from "~/config";

/**
 * Sticky top bar. On a phone it is the mark plus two destinations: the shop,
 * and the sister site. Nothing else competes for the space.
 */
export function SiteHeader() {
  return (
    <header className="border-line bg-cream/88 sticky top-0 z-40 border-b backdrop-blur-md">
      {/* The mark costs the row ~22px on a phone, so it is a little smaller
          there than on a wide screen and the wordmark keeps its own space. The
          mark is a wide lockup (tSHE), so its width is set from its
          proportions at each height — a square box would squash it. */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3 sm:gap-6 sm:px-8 sm:py-4">
        <Link to="/" className="group flex items-center gap-2 sm:gap-2.5">
          <Monogram
            height={22}
            className="shrink-0 sm:h-[30px] sm:w-[77.04px]"
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
            <div className="flex items-center gap-2.5">
              <Monogram height={30} className="shrink-0" />
              <p className="font-display text-ink text-lg">{BUSINESS_NAME}</p>
            </div>
            <p className="text-muted mt-3 max-w-xs text-[0.85rem] leading-relaxed">
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

          {/* The sister site's ONLY link on the whole site — it was in the
              header and on a homepage band too, and the owner asked for one.
              While SISTER_SITE.url is still the placeholder there is no link
              here: a dead link is worse than none, and the moment the owner
              gives the real address this renders itself (see CONTENT.md §3). */}
          <div className="label text-muted flex flex-col gap-3">
            <span className="text-charcoal">Elsewhere</span>
            {SISTER_SITE_IS_PLACEHOLDER ? (
              <span className="text-muted">{SISTER_SITE.name} — link coming soon</span>
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
