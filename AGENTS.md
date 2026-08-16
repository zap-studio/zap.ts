# AGENTS.md

SaaS starter kit monorepo. Currently scoped to `apps/web` only.

## Rule

Always run scripts via `pnpm run <script>` — never invoke the underlying CLIs (`wrangler`, `drizzle-kit`, `vitest`, `oxlint`, `oxfmt`, ...) directly.

## Versioning

- GitHub Actions: always pin the latest released major version of every action (don't assume a version from memory).
- Node.js: always use the latest released LTS line, for example: `node-version: lts/*` in `actions/setup-node`.
- pnpm: managed by **Corepack**, never a separate setup action and never a global install. The pinned version lives in root `package.json`'s `packageManager` field; bump it with `corepack up` when a newer pnpm release is wanted.

## Layout

```
zap.ts/
├── apps/
│   └── web/          # TanStack Start app → Cloudflare Workers
└── packages/          # shared code consumed as TS source by apps/web
```

## Stack

| Dep                        | Docs                                       |
| -------------------------- | ------------------------------------------ |
| TanStack Start / Router    | https://tanstack.com/llms.txt              |
| Cloudflare Workers / D1    | https://developers.cloudflare.com/llms.txt |
| Drizzle ORM                | https://orm.drizzle.team/llms.txt          |
| Better Auth                | https://www.better-auth.com/llms.txt       |
| Stripe                     | https://docs.stripe.com/llms.txt           |
| Resend                     | https://resend.com/docs/llms.txt           |
| Base UI                    | https://base-ui.com/llms.txt               |
| Tailwind CSS               | https://tailwindcss.com                    |
| Zod                        | https://zod.dev/llms.txt                   |
| @t3-oss/env-core           | https://env.t3.gg                          |
| Vitest                     | https://vitest.dev/llms.txt                |
| Ultracite (Oxlint + Oxfmt) | https://www.ultracite.ai/llms.txt          |
| tsdown                     | https://tsdown.dev/llms.txt                |
| Takumi (OG images)         | https://takumi.kane.tw/llms.txt            |
| pnpm                       | https://pnpm.io                            |
| @zap-studio/*              | https://www.zapstudio.dev                  |
