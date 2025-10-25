# Zap.ts

A production-ready monorepo starter kit to build and ship multiple apps blazingly fast.

## ⚠️ EXPERIMENTAL - NOT READY FOR USE

**This project is currently under active migration** from a Next.js-only architecture to a full monorepo structure. The codebase is not stable and not ready for production or development use yet.

**Star or watch this repo** to get notified when it's ready to use. (👀)

## What is this?

Zap.ts is a batteries-included monorepo that helps you build multiple applications simultaneously:

- 🌐 **Web app** - Main application
- 📢 **Marketing site** - Landing pages and content
- 📝 **Waitlist app** - Pre-launch signup flows
- 🔌 **API** - Backend services
- 📚 **Storybook** - Component development
- 📖 **Documentation** - Technical docs

## Features

### Pre-configured Development Tools

All essential tooling is ready in `configs/`:
- **Next.js** - Shared Next.js configuration
- **Tailwind CSS** - Design system setup
- **TypeScript** - Strict type checking
- **Playwright** - E2E testing
- **Vitest** - Unit testing

### Reusable Packages

Built-in packages (`packages/`) you can use across all apps:
- `@repo/auth` - Authentication logic
- `@repo/db` - Database layer with Drizzle ORM
- `@repo/ui` - Shared UI components
- `@repo/forms` - Form handling
- `@repo/analytics` - Tracking and metrics
- `@repo/seo` - SEO optimization
- `@repo/crypto` - Cryptography utilities
- `@repo/security` - Security helpers
- And more...

### Flexibility

Each package is built in isolation. **Bring your own provider** for any service:
- Swap authentication providers
- Use your preferred database
- Change analytics platforms
- Customize everything to your needs

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Drizzle ORM
- **Build System**: Turbo
- **Package Manager**: pnpm
- **Code Quality**: Biome (formatting & linting)
- **Testing**: Vitest + Playwright

## Project Structure

```
apps/          # Applications
├── api/       # Backend API
├── docs/      # Documentation site
├── marketing/ # Marketing website
├── waitlist/  # Waitlist application
└── web/       # Main web application

configs/       # Shared configurations
packages/      # Reusable packages
```

## Status

This project is in active development. The migration from a monolithic Next.js app to this modular architecture is ongoing. Check back soon for updates!
