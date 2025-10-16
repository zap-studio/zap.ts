# TODO

This file serves as a supplement to the official documentation and provides guidance for common customization tasks. In the final release, all information will be integrated into the main documentation.

## Switching Package Managers

This project is configured to use **Bun** by default, but you can easily switch to npm, yarn, or pnpm by updating configuration files.

### 1. Update Turborepo Package Manager

Modify the `packageManager` field in the root `package.json`:

```json
{
  "packageManager": "bun@x.x.x"
  // Change to one of:
  // "packageManager": "npm@x.x.x"
  // "packageManager": "yarn@x.x.x"
  // "packageManager": "pnpm@x.x.x"
}
```

### 2. Update GitHub Actions Workflows

Update all workflow files in `.github/workflows/` to use your preferred package manager. Here's an example for the `build.yml` file:

**For Bun (default):**
```yaml
- name: Setup bun
  uses: oven-sh/setup-bun@v2 # change the version according to your need

- name: Install dependencies
  run: bun install --frozen-lockfile

- name: Build monorepo
  run: bun run build
```

**For npm:**
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v6 # change the version according to your need
  with:
    node-version: "latest"

- name: Install dependencies
  run: npm ci

- name: Build monorepo
  run: npm run build
```

**For pnpm:**
```yaml
- name: Setup pnpm
  uses: pnpm/action-setup@v4 # change the version according to your need
  with:
    version: "latest"

- name: Setup Node.js
  uses: actions/setup-node@v6 # change the version according to your need
  with:
    node-version: "latest"
    cache: 'pnpm'

- name: Install dependencies
  run: pnpm install --frozen-lockfile

- name: Build monorepo
  run: pnpm run build
```

**For yarn:**
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v6 # change the version according to your need
  with:
    node-version: "latest"
    cache: 'yarn'

- name: Install dependencies
  run: yarn install --frozen-lockfile

- name: Build monorepo
  run: yarn run build
```

> **Note:** Apply these changes to all workflow files: `build.yml`, `lint.yml`, and `typecheck.yml`.

### 3. Update Dependabot Configuration

Modify the `package-ecosystem` field in `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: "bun" # Change to "npm" for npm/yarn/pnpm
    directories:
      - "/"
      - "/apps/marketing"
      - "/apps/app"
      - "/apps/docs"
      - "/packages/ui"
      - # all your packages should be listed
    schedule:
      interval: "weekly"
```

> **Important:** Dependabot uses `"npm"` as the ecosystem identifier for npm, yarn, and pnpm. Only use `"bun"` when using Bun.

## Publishing Packages with Changesets

This project includes a pre-configured [Changesets](https://github.com/changesets/changesets) GitHub Action (`.github/workflows/release.yml`) that automatically creates release pull requests when changes are pushed to the main branch.

### Current Setup

The release workflow is already configured to:
- Trigger on pushes to the `main` branch
- Create release pull requests based on your changesets
- Track version bumps and changelog updates

### Publishing to npm

The current workflow **does not include a publishing step**. If you want to publish packages to npm, you'll need to:

1. Add an npm token to your GitHub repository secrets
2. Extend the release workflow with a publish step

### Resources

For more information on configuring Changesets and adding publishing capabilities:

- [Turborepo Publishing Guide](https://turborepo.com/docs/guides/publishing-libraries#publishing)
- [Changesets Documentation](https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md)
- [Changesets GitHub Action](https://github.com/changesets/action)