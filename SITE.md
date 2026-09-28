# Your site

This is the team's website. It's a [TanStack Start](https://tanstack.com/start)
app (React + Vite + Tailwind), served on **port 3000**. It starts life as a simple
"coming soon" placeholder (the headline reads the business name from `site.json` at
request time), but it's a real full-stack framework: build it out into the real
site and grow it into a dynamic app without changing hosting or starting a second
server.

## Layout

```
src/
  routes/
    __root.tsx     # the HTML shell: <head>, fonts, global layout
    index.tsx      # the landing page ("/")
  styles/app.css   # Tailwind entrypoint + base styles
vite.config.ts     # serves on 0.0.0.0:3000
```

Add a page by creating a new file under `src/routes/`, e.g. `about.tsx` becomes
`/about`. Files are routes; the router is generated automatically.

## Serving and shipping

How this site is served and how changes go live **depends on the team's setup**:
your system prompt's **Website** section is the authority: follow it, not this
file. The `package.json` scripts (`publish`, `go-live`) exist for setups whose
Website section tells you to run them; don't run them otherwise. Server logs live
in `.run/`.

## Making it dynamic

The site is static today, but adding backend behavior is one file away: no second
process, no extra port, all served on the same port 3000:

- **Server function**: call server-only code (secrets, fetch, other server-side work)
  directly from a component:

  ```tsx
  import { createServerFn } from "@tanstack/react-start";

  const getMessage = createServerFn().handler(async () => {
    return { message: "Hello from the server" };
  });
  ```

- **API route**: add `src/routes/api/<name>.ts` for a REST endpoint.
- **Slow handlers**: `serve.ts` sets Bun's `idleTimeout` to 255s; keep that line.
  With Bun's default (10s) a handler that waits on an AI provider is cut at ~12s and
  the visitor sees an empty 502. Use `createServerFn({ method: "POST" })` for work
  that costs money, so the gateway never re-sends it, and prefer streaming or a
  start-then-poll pair for anything that regularly runs past ~20s.

## Secrets

Read the owner's secrets from `process.env` in server-only code. Never put them in a
`.env` file: `.env` files are not published, so a value that only lives there is
missing on the live site.

## Where the shop's data lives

The shop has **no database**, on purpose. Every piece is static, typed data in this
repository: one object per listing in `src/data/items.ts`, reviewed like code and shipped
with the site. There is no cart, no basket, no accounts and no inventory service, and no
connection string, key or query anywhere in the code (`README.md` and `CONTENT.md` say the
same, and `CONTENT.md` is the guide to editing what the shop shows).

Checkout is **one Stripe Payment Link per piece**: the piece's page sends the buyer to that
link, in AUD, with the A$12 flat-rate shipping attached inside Stripe and Stripe collecting
the buyer's address. The site holds no Stripe key, calls no Stripe API and never creates a
link; a person creates it in Stripe and pastes the URL into that piece's `paymentLink`
field.

If a later version of the shop ever needs to store data (form submissions, content,
accounts), add a database rather than writing to files: request one (for example serverless
Postgres with a free tier), read its connection string from `process.env` in server-only
code and never in client code, and keep the queries inside a `createServerFn()` handler or
an `src/routes/api/*` route.
