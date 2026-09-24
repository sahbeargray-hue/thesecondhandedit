import { BUSINESS_NAME } from "~/config";
import { Monogram } from "~/components/Monogram";
import { PALETTE, type MarkCand } from "./marks";
import { RASTER_16 } from "./rasters";

/**
 * The pieces of the private /mark-options page: one candidate mark, the real
 * site header at a fixed width, the footer lockup, and the favicon sizes.
 *
 * Every one of them takes `built`, which swaps the candidate for the mark the
 * shop runs today (src/components/Monogram.tsx), so a candidate and the built
 * mark are always shown through the same code. Nothing here is used by a shop
 * page, so the built mark on the shop is untouched while the owner chooses.
 */

/** One candidate mark at a given height. Width follows the lockup, never squash. */
export function Mark({
  cand,
  height,
  className = "",
}: {
  cand: MarkCand;
  height: number;
  className?: string;
}) {
  return (
    <svg
      height={height}
      width={height * cand.aspect}
      viewBox={cand.viewBox}
      className={`block shrink-0 ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      {cand.rects.map((rect) => (
        <rect
          key={`r${rect.x}-${rect.y}`}
          x={rect.x}
          y={rect.y}
          width={rect.width}
          height={rect.height}
          rx={rect.rx}
          fill={PALETTE[rect.fill]}
        />
      ))}
      {cand.paths.map((path) => (
        <path key={path.d.slice(0, 14)} d={path.d} transform={path.transform} fill={PALETTE[path.fill]} />
      ))}
    </svg>
  );
}

/** A candidate mark, or the built one, at a height. */
function MarkSlot({
  cand,
  built,
  height,
}: {
  cand?: MarkCand;
  built?: boolean;
  height: number;
}) {
  if (built || !cand) return <Monogram height={height} />;
  return <Mark cand={cand} height={height} />;
}

/*
 * The header. These are the values the real header in src/components/Chrome.tsx
 * uses, so a preview at a given width lays out exactly as that width would:
 * the mark is 22px high on a phone and 30px from sm, the business name is
 * 0.9rem then 1.15rem, the row has 12px/16px of vertical padding and 20px/32px
 * of side padding, and the content is capped at the same 72rem (1152px) the
 * header uses. The mark is sized by height here as it is there, so a candidate
 * with more built in air shows slightly smaller letters at the same box height,
 * which is the honest comparison.
 */
const NARROW = { padY: 12, padX: 20, gap: 12, markGap: 8, name: "0.9rem", nav: "0.6rem", track: "0.09em" };
const WIDE = { padY: 16, padX: 32, gap: 24, markGap: 10, name: "1.15rem", nav: "0.68rem", track: "0.18em" };

export function HeaderPreview({
  cand,
  built,
  width,
  label,
}: {
  cand?: MarkCand;
  built?: boolean;
  width: number;
  label: string;
}) {
  const wide = width >= 640;
  const m = wide ? WIDE : NARROW;
  const markHeight = wide ? 30 : 22;
  return (
    <div
      style={{ width }}
      className="border-sand-deep bg-cream overflow-hidden border-b"
      data-preview-width={width}
    >
      {/* The width label sits inside the frame, on the header's own left
          padding, so it stays aligned with the mark however wide the window is. */}
      <span
        className="label text-muted block"
        style={{ padding: `${m.padY - 2}px ${m.padX}px 0` }}
      >
        Header at {width}px
      </span>
      <div
        className="flex items-center justify-between"
        style={{
          maxWidth: 1152,
          margin: "0 auto",
          gap: m.gap,
          padding: `${m.padY}px ${m.padX}px`,
        }}
      >
        <span className="flex items-center" style={{ gap: m.markGap }}>
          <MarkSlot cand={cand} built={built} height={markHeight} />
          <span
            className="font-display text-ink whitespace-nowrap"
            style={{ fontSize: m.name, lineHeight: 1, letterSpacing: "0.01em" }}
          >
            {BUSINESS_NAME}
          </span>
        </span>
        <span
          className="text-muted font-medium whitespace-nowrap uppercase"
          style={{ fontSize: m.nav, letterSpacing: m.track }}
        >
          Shop
        </span>
      </div>
    </div>
  );
}

/** The footer lockup, on the sand band, exactly as SiteFooter builds it. */
export function FooterLockup({ cand, built }: { cand?: MarkCand; built?: boolean }) {
  return (
    <div className="bg-sand border-sand-deep border-y">
      <div className="px-5 py-8 sm:px-8" style={{ maxWidth: 1152, margin: "0 auto" }}>
        <div className="flex items-center gap-2.5">
          <MarkSlot cand={cand} built={built} height={30} />
          <p className="font-display text-ink text-lg leading-none">{BUSINESS_NAME}</p>
        </div>
      </div>
    </div>
  );
}

/** The mark at the two sizes a favicon is judged at, plus the real 16px pixels
    magnified six times, which is the only way to see what a tab will show. */
export function FaviconRow({
  cand,
  built,
  rasterKey,
}: {
  cand?: MarkCand;
  built?: boolean;
  rasterKey: string;
}) {
  const raster = RASTER_16[rasterKey];
  const zoom = 6;
  const who = built ? "The built mark" : (cand?.name ?? "This mark");
  return (
    <div className="flex flex-wrap items-start gap-x-10 gap-y-6">
      <div>
        <p className="label text-muted mb-3">16px</p>
        <MarkSlot cand={cand} built={built} height={16} />
      </div>
      <div>
        <p className="label text-muted mb-3">32px</p>
        <MarkSlot cand={cand} built={built} height={32} />
      </div>
      {raster ? (
        <div>
          <p className="label text-muted mb-3">The same 16px, magnified {zoom}x</p>
          <img
            src={raster.src}
            width={raster.w * zoom}
            height={raster.h * zoom}
            alt={`${who} drawn at 16 pixels, magnified so the pixels are visible`}
            style={{ imageRendering: "pixelated" }}
            className="block"
          />
        </div>
      ) : null}
    </div>
  );
}

/** The same mark on the two surfaces it would sit on, at header size. */
export function Grounds({ cand, built }: { cand?: MarkCand; built?: boolean }) {
  return (
    <div className="flex flex-wrap gap-6">
      <div className="bg-cream border-line border px-6 py-5">
        <p className="label text-muted mb-3">On cream</p>
        <MarkSlot cand={cand} built={built} height={30} />
      </div>
      <div className="bg-sand border-sand-deep border px-6 py-5">
        <p className="label text-muted mb-3">On sand</p>
        <MarkSlot cand={cand} built={built} height={30} />
      </div>
    </div>
  );
}
