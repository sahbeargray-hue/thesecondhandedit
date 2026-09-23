/**
 * The Second Hand Edit monogram — an "S" drawn as a single round-capped stroke
 * inside a soft-cornered seal.
 *
 * The letterform is a PATH, not live text, so the mark renders identically in a
 * phone header, in the footer, in a favicon and in the rasterised share card —
 * no webfont has to load for it to look right. `variant` picks the positive
 * (sand seal, deep sage S — the header mark on cream) or its reverse (deep sage
 * seal, cream S — the footer, the favicon and anything at 32px or below).
 *
 * Not related to the sister site's round badge: no circle, no stacked words,
 * no borrowed colour or letterform.
 */
export function Monogram({
  size = 30,
  variant = "sand",
  className = "",
}: {
  size?: number;
  variant?: "sand" | "deep";
  className?: string;
}) {
  const seal = variant === "sand" ? "#eae0cc" : "#4a5c4c";
  const edge = variant === "sand" ? "#d6c6a8" : "none";
  const letter = variant === "sand" ? "#4a5c4c" : "#faf7f2";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="64" height="64" rx="16" fill={seal} />
      {edge !== "none" ? (
        <rect
          x="1"
          y="1"
          width="62"
          height="62"
          rx="15"
          fill="none"
          stroke={edge}
          strokeWidth="2"
        />
      ) : null}
      <path
        d="M44 21C42 16.5 37.5 14.5 32 14.5C25.5 14.5 21 18.5 21 23.5C21 28.5 25 30.5 32 32C39 33.5 45 36 45 41C45 46.5 40 50.5 33 50.5C27 50.5 22.5 48 20.5 43.5"
        fill="none"
        stroke={letter}
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}
