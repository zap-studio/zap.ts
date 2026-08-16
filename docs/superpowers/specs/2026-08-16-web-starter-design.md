# zap.ts — apps/web starter design

Date: 2026-08-16
Scope: `apps/web` only (first app in the `zap.ts` monorepo). An alternative to ShipFast / MakerKit / Supastarter (licensing model not yet decided).

## Goals

- Ship a full SaaS starter: marketing site, auth, dashboard, settings, Stripe billing.
- No vendor lock-in where avoidable (self-hostable on a free Cloudflare account).
- Dogfood the author's own `@zap-studio/*` packages instead of pulling in a heavier runtime paradigm (Effect was considered and dropped — see Decisions Log).
- Low ceremony for adopters: plain async/await, typed errors as classes, Zod for schemas.

## Tech stack

| Concern | Choice |
|---|---|
| Monorepo | pnpm workspaces (no Turborepo — avoids Vercel-centric tooling) |
| Framework | TanStack Start (file-based routing via TanStack Router) |
| Deployment | Cloudflare Workers via `@cloudflare/vite-plugin` |
| Database | Cloudflare D1 (SQLite) + Drizzle ORM (`drizzle-orm/d1`) |
| Auth | Better Auth (Drizzle adapter) + official Stripe plugin for billing |
| Email | Resend, wired into Better Auth's `sendVerificationEmail` / `sendResetPassword` hooks |
| UI primitives | Base UI (unstyled, `render`-prop composition) |
| Styling | Tailwind CSS, `data-[state=...]:` variants against Base UI's data attributes |
| State | No global store by default; route loaders + local component state. Add Zustand only if a concrete cross-tree ephemeral-state need appears |
| Validation | Zod schemas + `@zap-studio/validation`'s `standardValidate` |
| Env vars | `@t3-oss/env-core` (Zod schemas, client/server split, validated at boot) |
| Resilience | `@zap-studio/retry` for external calls that warrant backoff |
| Authorization | `@zap-studio/permit` for dashboard RBAC/ABAC |
| Webhooks (future) | `@zap-studio/webhooks` — available, not wired by default (Better Auth's Stripe plugin owns the Stripe webhook route in v1) |
| HTTP | `@zap-studio/fetch` for any outbound call not covered by an SDK |
| Lint/format | Ultracite preset over Oxlint + Oxfmt |
| Build (packages needing dist) | tsdown |
| Testing | Vitest (+ `@testing-library/react` for components) |
| CI | GitHub Actions: lint, typecheck, test, fanned out with `pnpm -r` |
| PWA | `vite-plugin-pwa` (Workbox-based manifest + service worker) |
| OG images | Takumi (`takumi-js`, JSX→image, WASM — Cloudflare Workers-compatible, drop-in for `next/og`) |

## Monorepo layout

```
zap.ts/
├── apps/
│   └── web/                    # TanStack Start app → Cloudflare Workers
├── packages/
│   ├── db/                     # Drizzle schema (D1/SQLite) + typed client
│   ├── auth/                   # Better Auth instance (Drizzle adapter, Stripe plugin)
│   ├── email/                  # Resend client + React Email templates
│   ├── ui/                     # Base UI primitives wrapped with Tailwind styling
│   ├── env/                    # @t3-oss/env-core schema (client/server split), validated at boot
│   └── tsconfig/               # shared tsconfig bases
├── pnpm-workspace.yaml
├── oxlint config + oxfmt config (via `ultracite init`)
└── package.json                 # root scripts: dev, build, lint, typecheck, test
```

Root `package.json` `scripts` are the single entry point for every workflow — `pnpm run <script>`, no bare `wrangler`/`drizzle-kit`/`vitest` invocations expected from a contributor:

| Script | Does |
|---|---|
| `dev` | `wrangler dev` (via `@cloudflare/vite-plugin`) for `apps/web` |
| `build` | production build, fanned out with `pnpm -r` |
| `lint` | Oxlint via Ultracite |
| `format` | Oxfmt via Ultracite |
| `test` | `vitest run`, fanned out with `pnpm -r` |
| `typecheck` | `tsc --noEmit`, fanned out with `pnpm -r` |
| `db:generate` | `drizzle-kit generate` — write SQL migration files from schema diff |
| `db:migrate` | `drizzle-kit migrate` — apply migrations (local D1 file or `d1-http` for remote, chosen by `--config`/env) |
| `db:studio` | `drizzle-kit studio` — inspect local D1 data |

`packages/*` are consumed as TS source directly by `apps/web` via Vite + TS path resolution — no build step in dev. `tsdown` is the build tool for any package that later needs a compiled dist (e.g. if published standalone, or consumed outside a Vite context).

## Routes (apps/web)

- `/` — marketing landing page (hero, features, pricing, footer)
- `/sign-in`, `/sign-up`, `/reset-password` — Better Auth flows, verification/reset email via Resend
- `/dashboard` — authenticated shell (pathless layout route, sidebar), gated once via `beforeLoad`
- `/dashboard/settings` — account/profile settings
- `/dashboard/billing` — subscription status, checkout redirect, customer-portal link (Better Auth Stripe plugin)
- Better Auth's handler + Stripe plugin own their own route(s) for the auth API and Stripe webhook — mounted per Better Auth's TanStack Start integration, not hand-rolled.

Auth guard: typed router context via `createRootRouteWithContext<{ auth: AuthState }>()`; the `/dashboard` layout route's `beforeLoad` redirects unauthenticated users to `/sign-in` with a `redirect` search param, restoring the original destination post-login. Gating the layout route gates the whole subtree — no per-route guard duplication.

## SSR & data flow

- Route `loader`s: data needed before render (server-run on initial load, client-run on nav).
- `createServerFn`: RPC-style mutations / one-off server logic, colocated with the feature using them.
- Client-only fetching only for data that shouldn't block SSR.
- Streaming/suspense via TanStack Router's deferred loader data + `Await` where a route has slow, non-blocking data.

## Theming

- Default: system. `ScriptOnce` (from `@tanstack/react-router`) injects a blocking pre-hydration script in `__root.tsx` that reads `localStorage` + `matchMedia('(prefers-color-scheme: dark)')` and sets the class on `<html>` before first paint — no flash, no server cookie read needed.
- `<html suppressHydrationWarning>` to silence the expected (harmless) mismatch.
- `ThemeProvider` React context wraps the app; a `matchMedia` change listener keeps "system" mode live without a reload.

## SEO

- Per-route metadata via TanStack Start/Router's `head()` route option — title, meta description, canonical URL, defined alongside each route (landing, dashboard excluded via `noindex`).
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`) and X/Twitter card tags (`twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`) generated from the same per-route metadata — one source of truth, not duplicated.
- JSON-LD structured data injected as a `<script type="application/ld+json">` in `head()`: `Organization`/`WebSite` schema site-wide, `SoftwareApplication` (or `Product`, once pricing exists) on the landing page.
- Dynamic OG images: a server route (e.g. `/api/og`) renders JSX to a PNG via **Takumi** (`takumi-js`) — WASM-based, runs on Cloudflare Workers, drop-in for `next/og`. Route reads title/params from the query string so `og:image` can point at a per-page generated card instead of one static image.
- `sitemap.xml` and `robots.txt` served as TanStack Start server routes, generated from the route tree.

## PWA

- `vite-plugin-pwa` (Workbox-based) generates the manifest and service worker at build time — sits alongside `@cloudflare/vite-plugin` and `tanstackStart()` in `vite.config.ts`, no runtime conflict since it only touches client-side static assets.
- Web app manifest: name, icons (multiple sizes + maskable), theme/background color matching the light/dark theme tokens, `display: "standalone"`.
- Service worker scope: precache the app shell + static assets for installability and faster repeat loads. Not a full offline-first data layer in v1 — API/server-function calls stay network-only, no offline mutation queue.
- Install prompt: a light, dismissible in-app prompt (using the `beforeinstallprompt` event) rather than a heavy onboarding flow.

## UI composition (packages/ui)

- Base UI has no `asChild` — composition is via a `render` prop (JSX element or `(props, state) => ...` function), nested for multi-level composition (e.g. `Dialog.Trigger` rendering a `Menu.Trigger` rendering a project `Button`).
- Base UI owns ARIA roles, keyboard nav, and focus management for its primitives; the project owns `:focus-visible` styling, labels, and color contrast.
- Each wrapped component is hand-rolled (no scaffolding CLI exists for Base UI + Tailwind) and styled via Tailwind's `data-[state=...]:` variants, matched against each primitive's own documented data attributes (not a single global convention).
- Kept visually unstyled/minimal for v1 — structure and accessibility first, visual design system later.
- Coverage needed for v1: Button, Input, Dialog, Menu, Select, Tabs, Toast, Avatar, Switch, Checkbox — all present natively in Base UI.

## Effect service pattern

None. Effect was evaluated as the "core runtime pattern" for server-side code and dropped. See Decisions Log.

## Error handling

Each `@zap-studio/*` package throws its own typed error class (`FetchError`, `ValidationError`, `PolicyError`, `RetryError`). A single shared `toHttpResponse(error)` mapper in `apps/web` sits at the server-function catch boundary and turns any of them (plus Better Auth / Stripe / Drizzle errors) into the right HTTP response. No new error-handling runtime — plain `try/catch` + `instanceof` checks.

## Cloudflare Workers deployment

- `@cloudflare/vite-plugin` + `wrangler` as devDependencies of `apps/web`.
- `vite.config.ts` plugin order matters: `cloudflare({ viteEnvironment: { name: 'ssr' } })` → `tanstackStart()` → `viteReact()`.
- `wrangler.jsonc`: `compatibility_date` (current), `compatibility_flags: ["nodejs_compat"]`, `main: "@tanstack/react-start/server-entry"`, D1 binding for `packages/db`.
- Secrets via `wrangler secret` (prod) / `.dev.vars` (local); non-secret vars in `wrangler.jsonc`, all validated at boot through `packages/env` (`@t3-oss/env-core`, framework-agnostic — not the Next.js-specific `@t3-oss/env-nextjs` package).

## Local development

- `pnpm dev` runs `@cloudflare/vite-plugin`'s embedded `wrangler dev`, giving a real Workers runtime with D1/KV bindings locally — no deploy, no Cloudflare account needed just to develop.
- D1 local mode is a real SQLite file under `.wrangler/state/v3/d1`; Drizzle talks to it directly, so DB state persists across `pnpm dev` restarts.
- All DB migrations go through **drizzle-kit only** — `wrangler d1 migrations` is never used, to keep one migration tool instead of two. `drizzle-kit generate` writes SQL migration files; `drizzle-kit migrate` applies them, pointed at the local D1 SQLite file path (under `.wrangler/state/v3/d1`) for local dev, and at Cloudflare's D1 HTTP API (`driver: "d1-http"`, account id + database id + API token) for remote/prod.
- First-time setup: `pnpm db:migrate` (drizzle-kit, local file target) before the first `pnpm dev` — the local D1 file doesn't exist until a migration creates it.
- Secrets for local dev go in `.dev.vars` (gitignored), picked up automatically by `wrangler dev`; `packages/env` validates them the same way as in production.
- A Cloudflare account is only required to `wrangler deploy` and to push production secrets — the full dev loop (app + DB + auth + email in test mode) runs with nothing but `pnpm dev`.

## Testing & CI

- Vitest for unit tests across `packages/*` and `apps/web`; `@testing-library/react` + jsdom for component tests.
- No e2e in v1 (candidate follow-up sub-project: Playwright).
- GitHub Actions on PR: Ultracite check (Oxlint + Oxfmt), `tsc --noEmit`, `vitest run`, fanned out with `pnpm -r` (no Turborepo).

## Decisions log (things explicitly reconsidered mid-design)

- **Turborepo → pnpm workspaces only.** Avoids a Vercel-centric toolchain; acceptable at this repo's current size (one app).
- **DB provider deferred → Cloudflare D1, decided now.** Drizzle's SQLite vs Postgres table builders are different APIs; the schema file itself commits to a dialect at write time, unlike the driver/migration wiring which can stay flexible. D1 was picked because it needs zero external account beyond Cloudflare itself, keeping self-hosting cheap for adopters.
- **Effect as core runtime pattern → dropped entirely.** The author's own `@zap-studio/monorepo` packages (`fetch`, `retry`, `validation`, `permit`, `webhooks`) already cover resilience, validation, authorization, and webhook routing without Effect, using plain Promises and Standard Schema. Using them instead of Effect (a) dogfoods the author's own OSS libraries, (b) keeps the paradigm at plain async/await + typed error classes, which is a lower bar for adopters cloning the starter than Effect's generator-based DSL.
- **Hand-rolled Stripe/Effect BillingService → Better Auth's official Stripe plugin.** Less code, tested against Better Auth's user/session/org model; consistent with dropping Effect.
- **Hand-rolled env validation → `@t3-oss/env-core`.** Purpose-built for this (client/server schema split, boot-time validation, framework-agnostic core package works outside Next.js). `@zap-studio/validation` stays in use for other Standard-Schema validation needs (forms, webhook payloads), just not env vars specifically.

## Out of scope for this spec

- `packages/db` schema contents (tables, relations) — designed at implementation time against the routes above.
- Organization/teams, passkeys, 2FA — noted as candidate Better Auth plugins, not committed to v1.
- Any second app (`apps/docs`, `apps/admin`, etc.) — this spec covers `apps/web` only, per the user's explicit scoping.
