# Payments

Dodo Payments is the billing provider. The app exposes:

- `POST /api/checkout`
- `GET /api/customer-portal`
- `POST /api/webhooks/dodo`

Checkout is authenticated and accepts a local `planKey`; clients never send raw product IDs. Webhooks verify the
Dodo signature through the official Next.js adapter and store delivery IDs in `webhook_events` for idempotency.

## Dodo Setup

1. Create products for monthly, yearly, and lifetime plans in the Dodo dashboard.
2. Copy product IDs into `.env.local` and `.dev.vars`.
3. Add a webhook endpoint:

```txt
https://your-domain.com/api/webhooks/dodo
```

4. Copy the webhook key and API key into local env files.
5. Set production secrets:

```bash
wrangler secret put DODO_PAYMENTS_API_KEY
wrangler secret put DODO_PAYMENTS_WEBHOOK_KEY
```

Use `DODO_PAYMENTS_ENVIRONMENT="test_mode"` for local development and `live_mode` only when real products,
domains, and webhook secrets are ready.

## Customer Portal

The portal route looks up the authenticated user's stored Dodo customer ID from D1. If a customer has not been
created by webhook activity yet, it returns a safe 404 JSON response.
