# Getting Started

## Prerequisites

- Bun 1.3 or newer
- Node.js 22 or newer
- A Cloudflare account
- Stack Auth project keys
- Dodo Payments API and webhook keys

## Local Development

```bash
bun install
cp .env.example .env.local
cp .dev.vars.example .dev.vars
bunx playwright install chromium
bun run dev
```

Use `.env.local` for Next.js local development and `.dev.vars` for Cloudflare runtime preview.

## Validate

```bash
bun run validate
bun run test:e2e
```
