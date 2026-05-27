# Contributing

Use Bun for dependency management and scripts. Keep changes focused, document user-facing behavior, and add tests for
new logic.

## Pull Request Checklist

- `bun run validate` passes
- `bun run test:e2e` passes when UI or route behavior changes
- New env vars are documented in `.env.example` and `docs/environment-variables.md`
- Database changes include generated Drizzle migrations
- Auth, billing, and webhook changes avoid leaking secrets or trusting client-side state
