This file serves as a supplement to the official documentation and provides guidance for common customization tasks. In the final release, all information will be integrated into the main documentation.

## Monorepo Architecture

This project follows a purpose-driven, layered architecture designed to scale beyond side projects into production platforms. The structure ensures clean dependency flow, prevents circular dependencies, and maintains clear boundaries between different types of code.

### Directory Structure

```
apps/           # Integration layer - consumers
configs/        # Shared tooling configuration (Next.js, TypeScript, etc.)
packages/       # Agnostic, reusable modules
e2e/           # End-to-end tests
examples/      # Usage examples and reference implementations
```

### Layer Philosophy

#### 1. **apps/** - Integration Layer

Apps are *consumers* that configure and stitch together functionality.

**Responsibilities:**
- Import shared configs from `configs/`
- Import reusable modules from `packages/`
- Compose and configure the final application

**Current apps:**
- `apps/api` - Backend API
- `apps/docs` - Documentation site
- `apps/marketing` - Marketing website
- `apps/storybook` - Component library showcase
- `apps/waitlist` - Waitlist landing page
- `apps/web` - Main web application

#### 2. **configs/** - Tooling Configuration

Lightweight, flexible, and composable configuration packages that provide utilities for different tools.

**Examples:**
- `configs/next` - Shared Next.js configuration
- `configs/playwright` - E2E testing setup
- `configs/tailwind` - Tailwind CSS setup
- `configs/typescript` - TypeScript base configs
- `configs/vitest` - Testing configuration

**Characteristics:**
- Universal and stateless
- Don't depend on `packages/`
- Export composable helper functions (e.g., `withBundleAnalyzer`, `withMDX`)

#### 3. **packages/** - Agnostic Modules

These are fully reusable. Think of them as your internal library ecosystem.

**Examples:**
- `packages/analytics` - Analytics integration
- `packages/async-state` - Asynchronous state management (TanStack Query)
- `packages/config` - Global Zap.ts configuration
- `packages/crypto` - Cryptography utilities
- `packages/errors` - Error handling utilities
- `packages/fonts` - Font utilities
- `packages/pwa` - PWA utilities
- `packages/rpc` - RPC wrapper (oRPC/tRPC)
- `packages/security` - Security utilities
- `packages/seo` - SEO utilities
- `packages/shadcn` - All shadcn/ui components
- `packages/ui` - Shared design system components

**Dependency rules:**
- Can import from `configs/`
- Never import from `apps/`
- These packages are the foundation — they don't know about your apps

## Package Manager: pnpm

This project uses **pnpm** with workspaces, managed through **Corepack**. pnpm provides fast, disk-efficient installations with strict dependency management.

### Why pnpm?

- **Fast installations**: Content-addressable package storage
- **Disk efficient**: Hard-links packages from a global store
- **Strict dependency resolution**: Prevents phantom dependencies
- **Built-in workspace support**: First-class monorepo features

### Key Configuration Files

- `pnpm-workspace.yaml` - Workspace patterns
- `package.json` - Package manager version controlled via Corepack

### Common Commands

```bash
# Install all dependencies
pnpm install

# Add a dependency to specific workspace
pnpm add <package> --filter <workspace-name>

# Run command in all workspaces
pnpm -r run build

# Run command in specific workspace
pnpm --filter marketing run dev

# Update dependencies
pnpm update

# Use pnpm dlx instead of npx
pnpm dlx <command>
```

### Switching to Another Package Manager

If you need to switch to npm, yarn, or Bun:

#### 1. Update Package Manager

Modify the `packageManager` field in the root `package.json`:

```json
{
  "packageManager": "pnpm@x.x.x"
  // Change to one of:
  // "packageManager": "npm@x.x.x"
  // "packageManager": "yarn@x.x.x"
  // "packageManager": "bun@x.x.x"
}
```

#### 2. Update GitHub Actions Workflows

Update all workflow files in `.github/workflows/`. Here's an example for the `build.yml` file:

**For pnpm (current):**
```yaml
- name: Setup pnpm
  uses: pnpm/action-setup@v4

- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: 'pnpm'

- name: Install dependencies
  run: pnpm install --frozen-lockfile

- name: Build monorepo
  run: pnpm run build
```

**For npm:**
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v6
  with:
    node-version: "latest"

- name: Install dependencies
  run: npm ci

- name: Build monorepo
  run: npm run build
```

**For Bun:**
```yaml
- name: Setup bun
  uses: oven-sh/setup-bun@v2

- name: Install dependencies
  run: bun install --frozen-lockfile

- name: Build monorepo
  run: bun run build
```

**For yarn:**
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v6
  with:
    node-version: "latest"
    cache: 'yarn'

- name: Install dependencies
  run: yarn install --frozen-lockfile

- name: Build monorepo
  run: yarn run build
```

> **Note:** Apply these changes to all workflow files: `build.yml`, `lint.yml`, `test.yml`, `release.yml`, and `typecheck.yml`.

#### 3. Update Dependabot Configuration

The `package-ecosystem` field in `.github/dependabot.yml` is already set to `"npm"` which works for pnpm:

```yaml
version: 2
updates:
  - package-ecosystem: "npm" # Works for npm, yarn, and pnpm
    directories:
      - "/"
      - "/apps/marketing"
      - "/apps/web"
      - "/packages/ui"
      - # all your packages should be listed
    schedule:
      interval: "weekly"
```

> **Important:** Dependabot uses `"npm"` as the ecosystem identifier for npm, yarn, and pnpm. Only use `"bun"` when using Bun.

#### 4. Migration Notes

When switching from pnpm:
- Delete `pnpm-lock.yaml` and `pnpm-workspace.yaml`
- Run install with the new package manager to generate its lockfile

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

## Form Composition Pattern

For building scalable applications, understanding form composition is a crucial pattern. Form composition reduces boilerplate code by creating reusable form components with pre-bound field and form components.

### Why Form Composition Matters

As applications grow, forms become increasingly verbose and repetitive. Form composition allows you to:

- **Reduce boilerplate**: Create reusable field components that encapsulate common patterns
- **Maintain type safety**: Preserve full TypeScript inference across composed forms
- **Improve maintainability**: Share form logic and UI across your application
- **Enable better organization**: Break large forms into smaller, manageable pieces

### The `@zap/forms` Package (Planned)

While not yet implemented, this project plans to introduce a `@zap/forms` package that will provide pre-configured form composition utilities. The package will:

- Map shadcn/ui components from `@zap/shadcn`
- Integrate custom components from `@zap/ui`
- Provide reusable field components (TextField, SelectField, CheckboxField, etc.)
- Export form components (SubmitButton, FormError, etc.)
- Include a configured provider with TanStack Form DevTools

**Note:** A basic forms provider with TanStack Form DevTools is already available and mounted in applications like `apps/web` where TanStack Form is used.

### Performance Considerations

Form composition introduces an important trade-off: **bundle size**.

When you create a form hook with dozens of pre-bound components, every form that uses that hook will include all those components in its bundle, even if it only uses a few of them.

**Solution: React's `lazy` and `Suspense` APIs**

To mitigate bundle size issues, components should be lazy-loaded:

```tsx
// src/hooks/form.ts
import { lazy } from 'react'
import { createFormHook } from '@tanstack/react-form'

const TextField = lazy(() => import('../components/text-field.tsx'))
const SelectField = lazy(() => import('../components/select-field.tsx'))
const CheckboxField = lazy(() => import('../components/checkbox-field.tsx'))

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    SelectField,
    CheckboxField,
  },
  formComponents: {},
})
```

Then wrap your forms with Suspense:

```tsx
// src/App.tsx
import { Suspense } from 'react'

export default function App() {
  return (
    <Suspense fallback={<p>Loading form...</p>}>
      <YourFormComponent />
    </Suspense>
  )
}
```

### Implementation Status

**Form composition is NOT implemented by default** in this template. This is an intentional decision because:

1. **User responsibility**: The pattern requires end users to manage `Suspense` boundaries and loading states
2. **Performance awareness**: Developers should consciously opt into this pattern understanding the trade-offs
3. **Flexibility**: Different applications have different needs for form composition
4. **Clean organization**: Use the `@zap/forms` package when you're ready to implement this pattern in your monorepo

### Current State

The project currently provides:
- ✅ Individual form implementations with explicit field definitions (see `packages/auth/src/forms/`)
- ✅ TanStack Form DevTools provider (available in apps where TanStack Form is used)
- ⏳ `@zap/forms` package with pre-configured form composition utilities (planned)

### When to Implement Form Composition

Consider implementing form composition when:
- You have multiple forms sharing similar field patterns
- Form verbosity becomes a maintenance burden
- You're comfortable managing lazy loading and Suspense boundaries
- Your application benefits from centralized form component management

### Learn More

For detailed information about form composition patterns:
- [TanStack Form Composition Guide](https://tanstack.com/form/latest/docs/framework/react/guides/form-composition)