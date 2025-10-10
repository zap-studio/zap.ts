# Contributing to Zap.ts' template

Thank you for your interest in contributing to Zap.ts! We welcome all contributions, whether you're fixing bugs, improving documentation, or adding new features.

## Getting Started

1. **Fork the repository**
   - Click the "Fork" button on GitHub to create your own copy.
2. **Clone your fork**
   - `git clone https://github.com/<your-username>/template.git`
   - `cd zap.ts`
   - `git remote add upstream https://github.com/zap-studio/template.git`
3. **Create a new branch**
   - `git checkout -b my-feature-branch`

## Setting Up the Monorepo

1. **Install dependencies**
   - Run `bun install` from the root directory to install all packages.

2. **Set up environment variables**
   - In the `apps/app` directory, run: `zap generate env`
   - Rename the generated file to `.env` inside `apps/app`.

> The `.env` file may be required for the `@zap-ts-template/app` package to compile and for lefthook pre-commit to pass. If lefthook blocks your commit, you may use `git commit --no-verify` and/or `git push --no-verify`, but this is discouraged and may reduce the chance of your PR being merged.

## Making Changes

- Make your changes in a dedicated branch.
- Ensure your code passes all checks and tests.
- If you add or change features, create a changeset: `bunx changeset`.

## Opening a Pull Request

1. **Push your branch**
   - `git push origin my-feature-branch`
2. **Open a PR**
   - Go to your fork on GitHub and click "Compare & pull request".
   - Fill out the PR template and describe your changes.

## Review Process

- Your PR will be reviewed by maintainers.
- Address any requested changes.
- Once approved, your PR will be merged.

## Quality and DX tools

- **[Lefthook](https://github.com/evilmartians/lefthook)**: Git hook manager to run linters, formatters and tests before commits/pushes.
- **[Ultracite](https://www.ultracite.ai)**: Ensures accessibility and code style rules.
- **[Changesets](https://github.com/changesets/changesets)**: Used for managing versioning and changelogs.
- **[Turbo](https://turbo.build/)**: Used for fast monorepo builds, caching, and running tasks efficiently across packages.

## Additional Resources

If needed, open an issue. You can also join the [Discord](https://discord.gg/24hXMC3eAa).

Thanks for helping make Zap.ts better!
