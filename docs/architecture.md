# Architecture

This boilerplate is organized around a Cloudflare Workers deployment target with Next.js App Router and OpenNext.

## Runtime

Next.js builds normally with `next build`. Preview, upload, and deploy scripts run `opennextjs-cloudflare build`
to produce `.open-next/worker.js` and `.open-next/assets`.

## Auth

Stack Auth owns identity and sessions. The app database stores a local user profile keyed by `stack_user_id`, but it
does not replace Stack Auth.

## Billing

Dodo Payments owns checkout and customer billing. Verified webhooks update D1 tables for customers, subscriptions,
payments, and idempotency.

## Database

Cloudflare D1 is the default database. Drizzle owns the schema and generated SQL migrations.
