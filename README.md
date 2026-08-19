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

| Script         | Runs                                    | Does                                           |
| -------------- | --------------------------------------- | ---------------------------------------------- |
| `dev`          | `pnpm --filter web run dev`             | Starts the web app dev server                  |
| `build`        | `pnpm -r --if-present run build`        | Builds every package/app that has a build step |
| `deploy`       | `pnpm --filter web run deploy`          | Deploys the web app via Wrangler               |
| `test`         | `pnpm -r --if-present run test`         | Runs every package/app's test suite            |
| `typecheck`    | `pnpm -r --if-present run typecheck`    | Type-checks every package/app                  |
| `lint`         | `pnpm exec oxlint`                      | Lints with oxlint                              |
| `lint:fix`     | `oxlint --fix`                          | Lints and auto-fixes with oxlint               |
| `format`       | `oxfmt`                                 | Formats with oxfmt                             |
| `format:check` | `oxfmt --check`                         | Checks formatting without writing              |
| `fallow`       | `fallow --summary`                      | Dead code, duplication, and complexity summary |
| `react-doctor` | `react-doctor --scope full --verbose`   | Full React codebase health diagnostics         |
| `db:generate`  | `pnpm --filter @zap-ts/db run generate` | Generates a Drizzle migration                  |
| `db:migrate`   | `pnpm --filter @zap-ts/db run migrate`  | Applies migrations against Neon                |
| `db:studio`    | `pnpm --filter @zap-ts/db run studio`   | Opens Drizzle Studio                           |

## Linting & formatting

Configs extend Zap Studio's presets, [`@zap-studio/oxlint`](https://www.npmjs.com/package/@zap-studio/oxlint) and [`@zap-studio/oxfmt`](https://www.npmjs.com/package/@zap-studio/oxfmt).

Lefthook runs linting and formatting on staged files pre-commit.

## Code quality

- **[fallow](https://docs.fallow.tools)** — dead code, unused deps, circular imports, duplication, complexity.
- **[react-doctor](https://react.doctor)** — React hooks, accessibility, performance, security checks beyond oxlint's static `react-doctor` plugin rules.
