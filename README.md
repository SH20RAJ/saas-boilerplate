# SaaS Boilerplate

[![CI](https://img.shields.io/github/actions/workflow/status/SH20RAJ/saas-boilerplate/ci.yml?branch=main&label=ci)](https://github.com/SH20RAJ/saas-boilerplate/actions)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Bun](https://img.shields.io/badge/package%20manager-Bun-black)](https://bun.sh)
[![Next.js](https://img.shields.io/badge/framework-Next.js-black)](https://nextjs.org)
[![Cloudflare Workers](https://img.shields.io/badge/deploy-Cloudflare%20Workers-f38020)](https://developers.cloudflare.com/workers/)
[![Stack Auth](https://img.shields.io/badge/auth-Stack%20Auth-111827)](https://stack-auth.com)
[![Dodo Payments](https://img.shields.io/badge/payments-Dodo%20Payments-2563eb)](https://dodopayments.com)

A production-minded, open-source SaaS starter for founders and contributors who want a Cloudflare Workers
deployment target without giving up the usual SaaS primitives.

## Features

- Next.js App Router and TypeScript
- Bun package manager
- Cloudflare Workers deployment through OpenNext
- Stack Auth authentication
- Dodo Payments checkout, portal, and verified webhooks
- Drizzle ORM with Cloudflare D1 by default
- Tailwind CSS and shadcn/ui-style primitives
- Biome formatting and linting
- Vitest unit tests and Playwright E2E tests
- GitHub Actions CI with safe placeholder build environment
- Contributor docs and GitHub templates

## Quick Start

```bash
git clone https://github.com/SH20RAJ/saas-boilerplate.git
cd saas-boilerplate
bun install
cp .env.example .env.local
cp .dev.vars.example .dev.vars
bunx playwright install chromium
bun run dev
```

Open http://localhost:3000.

## Required Environment Variables

```env
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_STACK_PROJECT_ID=
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=
STACK_SECRET_SERVER_KEY=
DODO_PAYMENTS_API_KEY=
DODO_PAYMENTS_WEBHOOK_KEY=
DODO_PAYMENTS_RETURN_URL=
DODO_PAYMENTS_ENVIRONMENT=
```

See [environment variables](docs/environment-variables.md) for local and production setup.

## Scripts

| Command | Purpose |
| --- | --- |
| `bun run dev` | Start Next.js local dev |
| `bun run build` | Build the Next.js app |
| `bun run preview` | Build and preview on the Cloudflare runtime |
| `bun run deploy` | Build and deploy to Cloudflare Workers |
| `bun run upload` | Build and upload a Worker version |
| `bun run cf-typegen` | Regenerate Cloudflare binding types |
| `bun run db:generate` | Generate Drizzle migrations |
| `bun run db:migrate:local` | Apply D1 migrations locally |
| `bun run db:migrate:remote` | Apply D1 migrations remotely |
| `bun run format` | Format with Biome |
| `bun run lint` | Check formatting and lint rules with Biome |
| `bun run typecheck` | Run TypeScript |
| `bun run test` | Run Vitest |
| `bun run test:e2e` | Run Playwright |
| `bun run validate` | Run format, lint, typecheck, and unit tests |

Run `bunx playwright install chromium` once before local E2E tests. CI installs the browser automatically.

## Project Structure

```txt
src/app             App Router routes and route handlers
src/components      UI and domain components
src/config          Site, app, and plan configuration
src/db              Drizzle schema and D1 client
src/lib             Auth, billing, Dodo, env, and shared helpers
docs                Setup, architecture, deployment, and contributor docs
drizzle             Generated SQL migrations
```

## Setup Guides

- [Getting started](docs/getting-started.md)
- [Cloudflare](docs/cloudflare.md)
- [Authentication](docs/authentication.md)
- [Payments](docs/payments.md)
- [Database](docs/database.md)
- [Deployment](docs/deployment.md)
- [Architecture](docs/architecture.md)
- [Contributing](docs/contributing.md)

## License

MIT. See [LICENSE](LICENSE).
