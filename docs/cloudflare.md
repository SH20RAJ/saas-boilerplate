# Cloudflare

This app deploys to Cloudflare Workers through OpenNext.

Key files:

- `wrangler.jsonc`
- `open-next.config.ts`
- `next.config.ts`
- `cloudflare-env.d.ts`

The Worker entry is `.open-next/worker.js`, and static assets are served from `.open-next/assets`.

## Preview

```bash
bun run preview
```

## Deploy

```bash
bun run deploy
```

After changing bindings, run:

```bash
bun run cf-typegen
```
