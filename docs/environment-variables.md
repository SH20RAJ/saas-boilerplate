# Environment Variables

Copy `.env.example` to `.env.local` for Next.js development and `.dev.vars.example` to `.dev.vars` for
Cloudflare runtime preview.

## Required

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_APP_URL` | Public app URL |
| `NEXT_PUBLIC_STACK_PROJECT_ID` | Stack Auth project ID |
| `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY` | Stack Auth public client key |
| `STACK_SECRET_SERVER_KEY` | Stack Auth server secret |
| `DODO_PAYMENTS_API_KEY` | Dodo Payments API key |
| `DODO_PAYMENTS_WEBHOOK_KEY` | Dodo webhook verification key |
| `DODO_PAYMENTS_RETURN_URL` | Checkout return URL |
| `DODO_PAYMENTS_ENVIRONMENT` | `test_mode` or `live_mode` |

The placeholder Stack project ID in the example files is UUID-shaped so local builds and E2E tests can boot.
Replace all Stack and Dodo placeholder values with real dashboard values before using auth or payments.

## Optional

`POSTHOG_KEY`, `RESEND_API_KEY`, and `SENTRY_DSN` are reserved for common production integrations.

## Worker Secrets

```bash
wrangler secret put STACK_SECRET_SERVER_KEY
wrangler secret put DODO_PAYMENTS_API_KEY
wrangler secret put DODO_PAYMENTS_WEBHOOK_KEY
```
