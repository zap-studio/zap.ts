# AGENTS.md

SaaS starter kit monorepo. Currently scoped to `apps/web` only.

## Rule

Always run scripts via `pnpm run <script>` — never invoke the underlying CLIs (`wrangler`, `drizzle-kit`, `vitest`, `oxlint`, `oxfmt`, ...) directly.

## Versioning

- GitHub Actions: always pin the latest released major version of every action (don't assume a version from memory).
- Node.js: always use the latest released LTS line, for example: `node-version: lts/*` in `actions/setup-node`.
- pnpm: managed by **Corepack**, never a separate setup action and never a global install. The pinned version lives in root `package.json`'s `packageManager` field; bump it with `corepack up` when a newer pnpm release is wanted.
- Dependencies: **catalog mode by default**. Every version lives once in `pnpm-workspace.yaml`'s `catalog:` (or a named `catalogs:` entry for a dep that needs a second version), and every `package.json` references it with the `catalog:` protocol — never a version range duplicated across packages. Adding a new dependency means adding it to the catalog first, then `"<pkg>": "catalog:"` wherever it's used. Keep `catalog:` entries sorted alphabetically by package name.

## Layout

```
zap.ts/
├── apps/
│   └── web/          # TanStack Start app → Cloudflare Workers
└── packages/          # shared code consumed as TS source by apps/web
```

## Stack

| Dep                             | Docs                                       |
| ------------------------------- | ------------------------------------------ |
| TanStack Start / Router         | https://tanstack.com/llms.txt              |
| Cloudflare Workers / Hyperdrive | https://developers.cloudflare.com/llms.txt |
| Neon Postgres                   | https://neon.tech/docs                     |
| Drizzle ORM                     | https://orm.drizzle.team/llms.txt          |
| Better Auth                     | https://www.better-auth.com/llms.txt       |
| Stripe                          | https://docs.stripe.com/llms.txt           |
| Resend                          | https://resend.com/docs/llms.txt           |
| Base UI                         | https://base-ui.com/llms.txt               |
| StyleX                          | https://stylexjs.com                       |
| Zod                             | https://zod.dev/llms.txt                   |
| @t3-oss/env-core                | https://env.t3.gg                          |
| Vitest                          | https://vitest.dev/llms.txt                |
| Oxlint + Oxfmt                  | https://oxc.rs/docs                        |
| tsdown                          | https://tsdown.dev/llms.txt                |
| Takumi (OG images)              | https://takumi.kane.tw/llms.txt            |
| pnpm                            | https://pnpm.io                            |
| @zap-studio/*                   | https://www.zapstudio.dev                  |
