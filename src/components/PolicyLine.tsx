import { Link } from "@tanstack/react-router";

import { SHIPPING_LINE } from "~/data/policies";

/**
 * The short shipping-and-returns reference that sits next to a price or an
 * action — on the shop grid and on every item page.
 *
 * It is deliberately a TEXT LINK, never a button: an item page carries exactly
 * one action (the enquiry button), and this line must not become a second one.
 * The wording comes from src/data/policies.ts so both pages always agree.
 */
export function PolicyLine({ className = "" }: { className?: string }) {
  return (
    <p className={`text-muted text-[0.78rem] leading-relaxed ${className}`}>
      {SHIPPING_LINE}{" "}
      <Link
        to="/policy"
        className="text-ink decoration-sand-deep hover:decoration-sage-deep underline underline-offset-2 transition-colors"
      >
        Returns &amp; policies
      </Link>
    </p>
  );
}
