# zap.ts

Work in progress.

## Getting started

```bash
pnpm install
pnpm run dev
```

## Layout

```
zap.ts/
├── apps/
│   └── web/          # TanStack Start app → Cloudflare Workers
└── packages/          # shared code consumed as TS source by apps/web
```

## Scripts

| Script         | Runs                                        | Does                                           |
| -------------- | ------------------------------------------- | ---------------------------------------------- |
| `dev`          | `pnpm --filter web run dev`                 | Starts the web app dev server                  |
| `build`        | `pnpm -r --if-present run build`            | Builds every package/app that has a build step |
| `deploy`       | `pnpm --filter web run deploy`              | Deploys the web app via Wrangler               |
| `test`         | `pnpm -r --if-present run test`             | Runs every package/app's test suite            |
| `typecheck`    | `pnpm -r --if-present run typecheck`        | Type-checks every package/app                  |
| `lint`         | `pnpm exec oxlint`                          | Lints with oxlint                              |
| `lint:fix`     | `oxlint --fix`                              | Lints and auto-fixes with oxlint               |
| `format`       | `oxfmt`                                     | Formats with oxfmt                             |
| `format:check` | `oxfmt --check`                             | Checks formatting without writing              |
| `fallow`       | `fallow --summary`                          | Dead code, duplication, and complexity summary |
| `react-doctor` | `react-doctor --scope full --verbose`       | Full React codebase health diagnostics         |
| `db:generate`  | `pnpm --filter @zap-studio/db run generate` | Generates a Drizzle migration                  |
| `db:migrate`   | `pnpm --filter @zap-studio/db run migrate`  | Applies migrations against Neon                |
| `db:studio`    | `pnpm --filter @zap-studio/db run studio`   | Opens Drizzle Studio                           |

## Linting & formatting

Oxlint and oxfmt are configured through [`@zap-studio/oxlint`](https://www.npmjs.com/package/@zap-studio/oxlint) and [`@zap-studio/oxfmt`](https://www.npmjs.com/package/@zap-studio/oxfmt) — Zap Studio's own presets, extended (not hand-rolled) in [`oxlint.config.ts`](./oxlint.config.ts) and [`oxfmt.config.ts`](./oxfmt.config.ts):

- `oxlint.config.ts` extends the `tanstack` and `testing` presets.
- `oxfmt.config.ts` extends the `tailwind` preset — sorted imports, sorted `package.json`, and Tailwind class sorting.

Lefthook runs `lint:fix` and `format` on staged files pre-commit.

## Code quality

Two extra static analysis tools run outside of lint/format:

- **[fallow](https://docs.fallow.tools)** — dead code, unused dependencies, circular imports, duplication, and complexity, configured in [`.fallowrc.json`](./.fallowrc.json).
- **[react-doctor](https://react.doctor)** — React-specific diagnostics (hooks correctness, accessibility, performance, security) beyond what oxlint's `react-doctor` plugin rules cover statically.
