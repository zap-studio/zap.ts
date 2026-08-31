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
│   └── web/
└── packages/
```

## Scripts

| Script         | Runs                                               | Does                                           |
| -------------- | -------------------------------------------------- | ---------------------------------------------- |
| `dev`          | `pnpm --filter web run dev`                        | Starts the web app dev server                  |
| `build`        | `pnpm -r --if-present run build`                   | Builds every package/app that has a build step |
| `deploy`       | `pnpm --filter web run deploy`                     | Deploys the web app via Wrangler               |
| `test`         | `pnpm -r --if-present run test`                    | Runs every package/app's test suite            |
| `typecheck`    | `pnpm -r --if-present run typecheck`               | Type-checks every package/app                  |
| `lint`         | `pnpm exec oxlint --type-aware --type-check`       | Lints with oxlint                              |
| `lint:fix`     | `pnpm exec oxlint --fix --type-aware --type-check` | Lints and auto-fixes with oxlint               |
| `format`       | `pnpm exec oxfmt`                                  | Formats with oxfmt                             |
| `format:check` | `pnpm exec oxfmt --check`                          | Checks formatting without writing              |
| `db:generate`  | `pnpm --filter @zap-studio/db run generate`        | Generates a Drizzle migration                  |
| `db:migrate`   | `pnpm --filter @zap-studio/db run migrate`         | Applies migrations against Neon                |
| `db:studio`    | `pnpm --filter @zap-studio/db run studio`          | Opens Drizzle Studio                           |
