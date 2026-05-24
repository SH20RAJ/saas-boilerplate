# Deployment

1. Create the Cloudflare D1 database and update `wrangler.jsonc`.
2. Configure Stack Auth production domains.
3. Configure Dodo product IDs and webhook URL.
4. Set Worker secrets with Wrangler.
5. Run validation and deploy.

```bash
bun run validate
bun run db:migrate:remote
bun run deploy
```

Use `bun run preview` before deploying when changing bindings, middleware, or route handlers.
