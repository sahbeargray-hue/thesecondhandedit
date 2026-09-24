import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { OnlyOneMarker, SampleBadge } from "~/components/Badges";
import { PolicyLine } from "~/components/PolicyLine";
import { CURRENCY, ENQUIRY_EMAIL, ENQUIRY_IS_PLACEHOLDER, formatPrice } from "~/config";
import { canBuy, getItem, isSold, isUnbuyable } from "~/data/items";
import { SHIPPING_LABEL } from "~/data/policies";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const item = getItem(params.slug);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.name}${loaderData.sold ? ", Sold" : ""}, The Second Hand Edit`
          : "The Second Hand Edit",
      },
      {
        name: "description",
        content: loaderData
          ? `${loaderData.name}. ${loaderData.summary} One of a kind, ${loaderData.condition.toLowerCase()} condition.`
          : "One-of-a-kind second-hand clothing.",
      },
    ],
  }),
  component: ItemPage,
  notFoundComponent: Gone,
});

function ItemPage() {
  const item = Route.useLoaderData();

  const enquirySubject = `Enquiry: ${item.name}`;
  const enquiryBody = [
    "Hello,",
    "",
    "I would like to enquire about this piece:",
    "",
    `${item.name}, ${formatPrice(item.price)} ${CURRENCY.code}`,
    `Size: ${item.size}`,
    `Condition: ${item.condition}`,
    `Listing: /shop/${item.slug}`,
    "",
    "My question:",
  ].join("\n");
  const enquiryHref = `mailto:${ENQUIRY_EMAIL}?subject=${encodeURIComponent(enquirySubject)}&body=${encodeURIComponent(enquiryBody)}`;

  return (
    <section className="mx-auto max-w-6xl px-5 pt-6 sm:px-8 sm:pt-10">
      <Link
        to="/shop"
        className="label text-muted hover:text-ink inline-block transition-colors"
      >
        ← All pieces
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] lg:gap-16">
        {/* Photography */}
        <div>
          <img
            src={item.image}
            alt={item.imageAlt}
            className="bg-paper aspect-[4/5] w-full object-cover"
          />
          {item.gallery?.length ? (
            <div className="mt-3 grid grid-cols-2 gap-3">
              {item.gallery.map((photo, index) => (
                <img
                  key={photo}
                  src={photo}
                  alt={`${item.name}, detail ${String(index + 1)}`}
                  loading="lazy"
                  className="bg-paper aspect-[4/5] w-full object-cover"
                />
              ))}
            </div>
          ) : null}
        </div>

        {/* The piece, and the one thing to do about it */}
        <div className="lg:pt-2">
          <p className="label text-muted">
            {item.category}
            {item.brand ? (
              <>
                <span aria-hidden className="bg-line mx-2.5 inline-block h-px w-4 align-middle" />
                {item.brand}
              </>
            ) : null}
          </p>

          <h1 className="font-display text-ink mt-4 text-[1.9rem] leading-[1.12] sm:text-[2.4rem]">
            {item.name}
          </h1>

          <p className="text-ink mt-4 text-[1.35rem] font-medium">
            {formatPrice(item.price)}
          </p>

          <div className="text-muted mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.85rem]">
            <span>{item.size}</span>
            <span aria-hidden className="bg-line h-px w-5" />
            <span>Condition: {item.condition}</span>
          </div>

          {/* The one-of-one marker belongs to a piece still for sale. A sold
              piece carries no marker of any kind. */}
          {isSold(item) ? null : <OnlyOneMarker className="mt-5" />}

          {item.sample ? (
            <div className="border-sand-deep bg-sand/50 mt-6 border p-4">
              <SampleBadge />
              <p className="text-muted mt-3 text-[0.8rem] leading-relaxed">
                This is an example listing, not a real piece for sale. The photograph,
                size, condition and price are placeholders until the first real drop,
                nothing on this page can be bought today.
              </p>
            </div>
          ) : null}

          {/* A real piece with no payment link cannot be bought, and that must be
              impossible to miss: a real listing may never go on show without a way
              to pay for it. */}
          {isUnbuyable(item) ? (
            <div role="alert" className="border-charcoal bg-sand mt-6 border-2 p-4">
              <p className="label text-charcoal">Not for sale yet: no payment link set</p>
              <p className="text-charcoal mt-3 text-[0.8rem] leading-relaxed">
                This is a real piece, but its Stripe Payment Link has not been created yet, so
                it cannot be bought. (Owner: add <code>paymentLink</code> to this entry in{" "}
                <code>src/data/items.ts</code> once that link exists in Stripe.)
              </p>
            </div>
          ) : null}

          {/* One state, one action, and a sold piece has none at all, only a
              link back to the shop. `isSold` is checked before `canBuy`, so a piece
              that has gone never renders a buy action even if a stale `paymentLink`
              is still on it in src/data/items.ts. */}
          {isSold(item) ? (
            <div className="border-sand-deep bg-sand/50 mt-6 border p-5">
              <p className="label text-charcoal">Sold</p>
              <p className="text-muted mt-3 text-[0.85rem] leading-relaxed">
                This one has found a home. Every piece here is one of one (one size, one
                condition, one photograph), so there is no second one behind it, and it will
                not be restocked.
              </p>
              <Link
                to="/shop"
                className="label text-ink decoration-sand-deep hover:decoration-sage-deep mt-4 inline-block underline underline-offset-4 transition-colors"
              >
                See what is available
              </Link>
            </div>
          ) : canBuy(item) ? (
            <a
              href={item.paymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="label bg-sage-deep text-cream hover:bg-sage-dark mt-6 block w-full px-6 py-4 text-center transition-colors sm:inline-block sm:w-auto"
            >
              Buy this piece: {formatPrice(item.price)} + {SHIPPING_LABEL} shipping
            </a>
          ) : (
            <a
              href={enquiryHref}
              className="label bg-sage-deep text-cream hover:bg-sage-dark mt-6 block w-full px-6 py-4 text-center transition-colors sm:inline-block sm:w-auto"
            >
              Enquire about this piece
            </a>
          )}
          {/* Postage and returns sit next to the one action, as plain text with a
            link, never a second button, so the page keeps a single action. */}
          <PolicyLine className="mt-4" />

          {/* A sold piece gets no note about paying: nothing on this page may read
              as though the piece could still be bought. */}
          {isSold(item) ? null : (
            <p className="text-muted mt-3 text-[0.78rem] leading-relaxed">
              {canBuy(item) ? (
                <>
                  Checkout is handled by Stripe, in a new tab. The {SHIPPING_LABEL} flat-rate
                  shipping is added there, and Stripe collects the buyer&rsquo;s shipping address.
                </>
              ) : (
                <>
                  Send an enquiry and we will reply to arrange payment and postage.
                  {ENQUIRY_IS_PLACEHOLDER ? (
                    <>
                      {" "}
                      <span className="text-sage-deep">
                        (Enquiries currently go to a placeholder address,{" "}
                        {ENQUIRY_EMAIL}, until the owner&rsquo;s real address is set.)
                      </span>
                    </>
                  ) : null}
                </>
              )}
            </p>
          )}

<div className="rule mt-9 pt-7">
            <h2 className="label text-charcoal">The piece</h2>
            <p className="text-muted mt-3 text-[0.9rem] leading-relaxed">{item.notes}</p>
            <p className="text-muted mt-3 text-[0.9rem] leading-relaxed italic">
              {item.summary}
            </p>
          </div>

          <div className="rule mt-9 pt-7">
            <h2 className="label text-charcoal">Measurements</h2>
            <dl className="mt-4">
              {item.measurements.map((measurement) => (
                <div
                  key={measurement.label}
                  className="border-line flex items-baseline justify-between gap-6 border-b py-2.5 last:border-b-0"
                >
                  <dt className="text-muted text-[0.82rem]">{measurement.label}</dt>
                  <dd className="text-ink text-[0.85rem] whitespace-nowrap">
                    {measurement.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="text-muted mt-4 text-[0.75rem] leading-relaxed">
              Taken flat, so double the chest, waist and hip figures for the body they fit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Shown when someone follows a link to a piece that is no longer listed. */
function Gone() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <p className="label text-sage-deep">Gone</p>
      <h1 className="font-display text-ink mt-4 text-[2rem] leading-tight sm:text-[2.6rem]">
        This piece has found a home.
      </h1>
      <p className="text-muted mt-4 max-w-md text-[0.95rem] leading-relaxed">
        Nothing here is restocked: every listing is a single piece, so this one has
        already gone.
      </p>
      <Link
        to="/shop"
        className="label bg-sage-deep text-cream hover:bg-sage-dark mt-8 inline-block px-6 py-3.5 transition-colors"
      >
        See what is available
      </Link>
    </section>
  );
}
