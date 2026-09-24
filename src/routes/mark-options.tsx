import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { CANDIDATES, type MarkCand } from "~/components/mark-options/marks";
import {
  FaviconRow,
  FooterLockup,
  Grounds,
  HeaderPreview,
} from "~/components/mark-options/Preview";
import { MONOGRAM_ASPECT } from "~/components/Monogram";

/**
 * A private comparison page: the six candidate tSHE marks beside the mark the
 * shop runs today, each shown in the real header at four widths, in the footer
 * lockup, at favicon size and on both surfaces.
 *
 * This route is deliberately unlisted and noindex, nothing on the shop links to
 * it, and it changes nothing else on the site: the header, the footer and the
 * icons keep the built mark until the owner picks a number. It is deleted once
 * they have (see CONTENT.md, section 9).
 */
export const Route = createFileRoute("/mark-options")({
  component: MarkOptions,
  head: () => ({
    meta: [
      { title: "Mark options, The Second Hand Edit" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content:
          "Private, unlisted comparison of six candidate marks for The Second Hand Edit. Not linked from the shop and not indexed.",
      },
    ],
  }),
});

/** The editorial line that goes with each mark; the geometry lives in marks.ts. */
const NOTES: Record<string, { phone?: string; favicon: string }> = {
  wordmark: {
    phone:
      "The widest of the six (3.1 to 1 against the built mark's 2.6 to 1). Measured in the 320px header above it leaves about 27px of slack between the business name and the Shop link, where the built mark leaves 39px: it fits, but it is the tightest of the six and worth a look on a phone before choosing it.",
    favicon:
      "At 16px it still reads as SHE with a slim t at the left, but the t is a hairline there rather than a shape.",
  },
  tucked: {
    favicon:
      "At 16px the t vanishes into the H's counter and a tab shows three initials. That is the risk the built mark's favicon already works around.",
  },
  ledger: {
    phone:
      "The rule takes part of the height the header gives the mark, so the letters set a little smaller than the built mark's at the same box height.",
    favicon:
      "At 16px it reads cleanly: SHE with a single sage line under it. The t is absent by design, so nothing smudges.",
  },
  tall: {
    favicon:
      "At 16px the t and the S run together into one shape, so a tab reads as two letters rather than three.",
  },
  superscript: {
    phone:
      "The t sits above the cap line, so this box is taller than the other candidates' and the letters set a little smaller in the header.",
    favicon: "At 16px the raised t is a speck and all but disappears. SHE is the part that survives.",
  },
  field: {
    phone:
      "The field takes part of the height the header gives the mark, so the letters set a little smaller at the same box height.",
    favicon:
      "The clearest of the six at 16px: the sage field gives the letters something solid to sit on, so SHE still reads in a tab.",
  },
};

/** The axis map at the foot of the page, one row per candidate. */
const GLANCE: { n: string; ink: string; spacing: string; t: string; setting: string; weight: string }[] = [
  {
    n: "01 Wordmark",
    ink: "two tone: H and t in sage",
    spacing: "real air, no overlap",
    t: "on the baseline at the left, 72% of the cap",
    setting: "bare letters",
    weight: "Playfair 600",
  },
  {
    n: "02 Tucked",
    ink: "two tone: the t alone in sage",
    spacing: "very light interlock",
    t: "inside the H's upper counter, 42% of the cap",
    setting: "bare letters",
    weight: "Playfair 600",
  },
  {
    n: "03 Ledger",
    ink: "single ink",
    spacing: "real air, no overlap",
    t: "left out, the business name carries it",
    setting: "a sage rule under the initials",
    weight: "Playfair 400",
  },
  {
    n: "04 Tall t",
    ink: "two tone: t and E in sage",
    spacing: "tight interlock",
    t: "perched at the cap line, 72% of the cap and drawn heavy",
    setting: "bare letters",
    weight: "Playfair 600, the t from the 600 outlines",
  },
  {
    n: "05 Superscript",
    ink: "two tone: H and t in sage",
    spacing: "real air, no overlap",
    t: "raised above the cap line, 28% of the cap",
    setting: "bare letters",
    weight: "Playfair 600",
  },
  {
    n: "06 Field",
    ink: "cream on a solid sage field",
    spacing: "air inside the field",
    t: "perched at the cap line, 42% of the cap",
    setting: "a solid sage field",
    weight: "Playfair 600, initials at three heights",
  },
];

function MarkOptions() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pt-10 pb-4 sm:px-8 sm:pt-14">
        <p className="label text-sage-deep">Private page, nothing links here</p>
        <h1 className="font-display text-ink mt-3 max-w-3xl text-[2rem] leading-tight sm:text-[2.7rem]">
          Six candidate marks for tSHE
        </h1>
        <p className="text-charcoal mt-6 max-w-2xl text-[0.95rem] leading-relaxed">
          The mark the shop runs today is <strong className="text-ink font-medium">Perched</strong>,
          shown first so you have something to compare against. Below it are six candidates. All of
          them are cut from the same Playfair Display outlines the site already uses, and each one is
          shown in place: in the real header at 320px, 390px, 768px and 1440px with the business name
          beside it, in the footer lockup, at the two sizes a favicon is judged at, and once on cream
          and once on sand.
        </p>
        <p className="text-charcoal mt-4 max-w-2xl text-[0.95rem] leading-relaxed">
          Reply with a number and I will build that mark across the site: the header, the footer, the
          icons and the share card. Nothing on the shop pages changes until then, and this page is
          deleted once you have chosen. It is set to noindex, it is not in the shop navigation or the
          footer, and no shop page links to it.
        </p>
        <p className="text-muted mt-4 max-w-2xl text-[0.9rem] leading-relaxed">
          Where a mark cannot hold up at 16px, the note beside it says so rather than hiding it. The
          built mark has the same problem today: its favicon is a reduced SHE-only drawing, because
          the small t smudges in a browser tab.
        </p>
      </section>

      <Reference />

      {CANDIDATES.map((cand) => (
        <Candidate key={cand.id} cand={cand} />
      ))}

      <section className="mx-auto max-w-6xl px-5 pt-16 pb-4 sm:px-8">
        <div className="border-line border-t pt-8">
          <p className="label text-sage-deep">Side by side</p>
          <h2 className="font-display text-ink mt-3 text-[1.7rem] leading-tight">
            The six at a glance
          </h2>
          <p className="text-charcoal mt-4 max-w-3xl text-[0.95rem] leading-relaxed">
            Across the six, every axis of the mark gets tried at least once: one ink against the two
            tone accent (on the t alone, on the H and the t, on the E and the t); interlocked letters
            against real air; the t perched at the cap line, tucked inside the H, standing on the
            baseline as a prefix, raised as a superscript, and left out altogether; bare letters
            against a rule and against a solid field; a lighter weight (400) and a heavier t (600);
            and one direction where the initials are not all one height.
          </p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[48rem] border-collapse text-left text-[0.85rem]">
              <thead>
                <tr className="border-line border-b">
                  {["Candidate", "Ink", "Spacing", "The small t", "Setting", "Weight"].map((h) => (
                    <th key={h} className="label text-muted py-3 pr-6 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {GLANCE.map((row) => (
                  <tr key={row.n} className="border-line border-b align-top">
                    <th scope="row" className="text-ink py-4 pr-6 font-normal whitespace-nowrap">
                      {row.n}
                    </th>
                    <td className="text-charcoal py-4 pr-6">{row.ink}</td>
                    <td className="text-charcoal py-4 pr-6">{row.spacing}</td>
                    <td className="text-charcoal py-4 pr-6">{row.t}</td>
                    <td className="text-charcoal py-4 pr-6">{row.setting}</td>
                    <td className="text-charcoal py-4 pr-6">{row.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="border-line mt-12 border-t pt-8">
          <p className="label text-sage-deep">What happens next</p>
          <p className="text-charcoal mt-4 max-w-2xl text-[0.95rem] leading-relaxed">
            Say a number and that mark replaces <code className="text-ink">public/monogram.svg</code>,
            the header and footer lockups, the icon set and the share card. If the t cannot survive
            16px in the one you pick, the favicon keeps a simplified drawing as it does today.
          </p>
          <p className="text-muted mt-4 max-w-2xl text-[0.9rem] leading-relaxed">
            The sketches behind candidates 1 and 2 live in <code>brand/directions/</code>. The four
            drawn for this page, and the files for all six, are in{" "}
            <code>brand/mark-options/</code> as standalone SVG, so whichever one you pick can be
            rebuilt from the same outlines.
          </p>
        </div>
      </section>
    </>
  );
}

/** The mark the shop runs today, for comparison only: no number, no vote. */
function Reference() {
  const locked = `${MONOGRAM_ASPECT.toFixed(2)} to 1, 22px in a phone header and 30px from 640px up`;
  return (
    <section className="mt-12">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="border-line flex flex-wrap items-baseline gap-x-4 gap-y-2 border-t pt-10">
          <span className="label text-sage-deep">On the shop today</span>
          <h2 className="font-display text-ink text-[1.7rem] leading-none">Perched</h2>
          <span className="label text-muted">{locked}</span>
        </div>
        <p className="text-charcoal mt-4 max-w-2xl text-[0.95rem] leading-relaxed">
          SHE locked up tight with the small t perched at the cap line in front of it. The S and the
          E are ink, the middle H and the t are deep sage, and there is no badge, border or rule. It
          is the fastest of the six to read in a header, which is what the others are measured
          against.
        </p>
      </div>
      <Previews built />
      <div className="mx-auto mt-10 max-w-6xl space-y-8 px-5 sm:px-8">
        <div>
          <p className="label text-muted mb-3">Footer lockup</p>
          <FooterLockup built />
        </div>
        <div>
          <p className="label text-muted mb-3">Favicon size</p>
          <FaviconRow built rasterKey="built" />
          <p className="text-charcoal mt-4 max-w-xl text-[0.9rem] leading-relaxed">
            At 16px only the initials survive, which is why the shipped favicon drops the t
            altogether. The other candidates are judged the same way below.
          </p>
        </div>
        <div>
          <p className="label text-muted mb-3">On cream and on sand, at header size</p>
          <Grounds built />
        </div>
      </div>
    </section>
  );
}

/** A candidate, in place: header at four widths, footer, favicon and both surfaces. */
function Candidate({ cand }: { cand: MarkCand }) {
  const notes = NOTES[cand.id];
  return (
    <article className="mt-16" data-candidate={cand.id}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="border-line flex flex-wrap items-baseline gap-x-4 gap-y-2 border-t pt-10">
          <span className="label text-sage-deep">Candidate {String(cand.n).padStart(2, "0")}</span>
          <h2 className="font-display text-ink text-[1.7rem] leading-none">{cand.name}</h2>
          <span className="label text-muted">{cand.aspect.toFixed(2)} to 1</span>
        </div>
        <p className="text-charcoal mt-4 max-w-2xl text-[0.95rem] leading-relaxed">
          <strong className="text-ink font-medium">Different from the built mark:</strong>{" "}
          {cand.blurb}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {cand.axes.map((axis) => (
            <li key={axis} className="label border-sand-deep text-muted border px-2.5 py-1.5">
              {axis}
            </li>
          ))}
        </ul>
      </div>
      <Previews cand={cand} />
      <div className="mx-auto mt-10 max-w-6xl space-y-8 px-5 sm:px-8">
        <div>
          <p className="label text-muted mb-3">Footer lockup</p>
          <FooterLockup cand={cand} />
        </div>
        <div>
          <p className="label text-muted mb-3">Favicon size</p>
          <FaviconRow cand={cand} rasterKey={cand.id} />
          <p className="text-charcoal mt-4 max-w-xl text-[0.9rem] leading-relaxed">{notes?.favicon}</p>
        </div>
        <div>
          <p className="label text-muted mb-3">On cream and on sand, at header size</p>
          <Grounds cand={cand} />
        </div>
        {notes?.phone ? (
          <p className="text-muted max-w-xl text-[0.9rem] leading-relaxed">{notes.phone}</p>
        ) : null}
      </div>
    </article>
  );
}

/** The header at all four widths, in the order the site meets them. */
function Previews({ cand, built }: { cand?: MarkCand; built?: boolean }) {
  return (
    <div className="mt-8" data-headers>
      <div className="grid gap-y-6 sm:grid-cols-2">
        {[320, 390].map((w) => (
          <WidthFrame key={w} width={w}>
            <HeaderPreview cand={cand} built={built} width={w} label={`Header at ${w}px`} />
          </WidthFrame>
        ))}
      </div>
      <div className="mt-6 space-y-6">
        {[768, 1440].map((w) => (
          <WidthFrame key={w} width={w}>
            <HeaderPreview cand={cand} built={built} width={w} label={`Header at ${w}px`} />
          </WidthFrame>
        ))}
      </div>
    </div>
  );
}

/**
 * A preview at its true width, inside a frame that scrolls sideways when the
 * window is narrower than the preview, so the page itself never scrolls
 * sideways at 320px.
 */
function WidthFrame({ children }: { width: number; children: ReactNode }) {
  return <figure className="w-full min-w-0 overflow-x-auto">{children}</figure>;
}
