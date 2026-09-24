import { createFileRoute } from "@tanstack/react-router";

import { ENQUIRY_EMAIL, ENQUIRY_IS_PLACEHOLDER } from "~/config";
import { CONDITIONS } from "~/data/items";
import {
  CONDITION_NOTE,
  CONDITION_USAGE,
  RETURNS_POLICY,
  SHIPPING_LABEL,
} from "~/data/policies";

export const Route = createFileRoute("/policy")({
  component: Policy,
  head: () => ({
    meta: [
      { title: "Policies, The Second Hand Edit" },
      {
        name: "description",
        content:
          "Shipping, returns, item condition and contact for The Second Hand Edit: a flat-rate shipping charge per order, the returns wording in full, and how we describe each one-of-one piece.",
      },
    ],
  }),
});

/**
 * The shop's policies: what postage costs, what we do about returns, how the
 * condition labels are used, and how to reach us. Nothing here goes beyond what
 * the owner has approved, the returns wording in particular is verbatim, and
 * is rendered straight from src/data/policies.ts.
 */
function Policy() {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-10 pb-6 sm:px-8 sm:pt-16">
      {/* Phones get one column. From lg the eyebrow and title keep their own
          column, so the wording below stays at a comfortable measure instead of
          stretching into a wide slab of text. */}
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
        <header className="max-w-2xl lg:sticky lg:top-24 lg:self-start">
          <p className="label text-sage-deep">The fine print</p>
          <h1 className="font-display text-ink mt-4 text-[2rem] leading-[1.1] sm:text-[2.6rem]">
            Policies
          </h1>
          <p className="text-muted mt-4 text-[0.95rem] leading-relaxed">
            Postage, returns, how each piece is described, and how to reach us.
            These apply to every order placed through this shop.
          </p>
        </header>

        <div className="max-w-2xl space-y-10">
          <section className="rule pt-8">
            <h2 className="font-display text-ink text-[1.35rem] leading-snug">
              Shipping
            </h2>
            <p className="text-muted mt-4 text-[0.95rem] leading-relaxed">
              A flat {SHIPPING_LABEL} shipping charge applies to every order. It
              is charged once per order, in Australian dollars (AUD): prices on
              this site are in the same currency.
            </p>
            <p className="text-muted mt-3 text-[0.9rem] leading-relaxed">
              We post to Australian addresses only. Postage is arranged with
              each order; if you would like to know how a piece will be sent
              before you buy it, ask and we will tell you.
            </p>
          </section>

          <section className="rule pt-8">
            <h2 className="font-display text-ink text-[1.35rem] leading-snug">
              Returns
            </h2>
            <p className="text-muted mt-4 text-[0.95rem] leading-relaxed">
              {RETURNS_POLICY}
            </p>
          </section>

          <section className="rule pt-8">
            <h2 className="font-display text-ink text-[1.35rem] leading-snug">
              Item condition
            </h2>
            <p className="text-muted mt-4 text-[0.95rem] leading-relaxed">
              Every listing carries one of three condition labels: Excellent,
              Very good or Good. The label describes the single second-hand
              piece in that listing, as it was when we checked it over, and
              nothing more.
            </p>
            <dl className="mt-5">
              {CONDITIONS.map((condition) => (
                <div
                  key={condition}
                  className="border-line border-b py-3 last:border-b-0"
                >
                  <dt className="text-ink text-[0.85rem]">{condition}</dt>
                  <dd className="text-muted mt-1 text-[0.85rem] leading-relaxed">
                    {CONDITION_USAGE[condition]}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="text-muted mt-5 text-[0.9rem] leading-relaxed">
              {CONDITION_NOTE}
            </p>
            <p className="text-muted mt-3 text-[0.9rem] leading-relaxed">
              Want a closer look at something before you buy: another
              photograph, an extra measurement, or a plain description of any
              wear? Ask, and we will send it.
            </p>
          </section>

          <section className="rule pt-8">
            <h2 className="font-display text-ink text-[1.35rem] leading-snug">
              Contact
            </h2>
            <p className="text-muted mt-4 text-[0.95rem] leading-relaxed">
              Questions about a piece, or about an order you have placed? Email
              us here and we will reply.
            </p>
            <p className="mt-4">
              <a
                href={`mailto:${ENQUIRY_EMAIL}`}
                className="text-ink decoration-sand-deep hover:decoration-sage-deep text-[0.9rem] break-all underline underline-offset-2 transition-colors"
              >
                {ENQUIRY_EMAIL}
              </a>
            </p>
            {ENQUIRY_IS_PLACEHOLDER ? (
              <p className="text-sage-deep mt-3 text-[0.8rem] leading-relaxed">
                This address is still a placeholder, so enquiries are not wired
                up yet, the owner&rsquo;s real address will be set here before
                the shop goes live.
              </p>
            ) : null}
          </section>
        </div>
      </div>
    </section>
  );
}
