# Authentication

Stack Auth is the source of truth for authentication. This app uses the Next.js App Router handler at
`/handler/[...stack]`, so the built-in pages are available at `/handler/sign-in`, `/handler/sign-up`,
`/handler/account-settings`, and `/handler/sign-out`.

## Setup

1. Create a Stack Auth project.
2. Copy the dashboard keys into `.env.local` for `bun run dev`.
3. Copy matching local Worker values into `.dev.vars` for `bun run preview`.
4. Set production secrets with Wrangler:

```bash
wrangler secret put STACK_SECRET_SERVER_KEY
```

Required variables:

```env
NEXT_PUBLIC_STACK_PROJECT_ID="stack_project_id"
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="stack_publishable_client_key"
STACK_SECRET_SERVER_KEY="stack_secret_server_key"
```

The dashboard routes call `requireUser()`, which delegates to `stackServerApp.getUser({ or: "redirect" })`.
Unauthenticated visitors are redirected into the Stack Auth sign-in flow.
