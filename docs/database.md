# Database

Cloudflare D1 is the default database. Stack Auth remains the identity source of truth; D1 stores the app
profile, Dodo customer mapping, subscription state, payment audit data, and webhook idempotency records.

## Create A D1 Database

```bash
wrangler d1 create saas-boilerplate-db
```

Copy the returned database ID into `wrangler.jsonc`:

```jsonc
"d1_databases": [
	{
		"binding": "DB",
		"database_name": "saas-boilerplate-db",
		"database_id": "your-d1-database-id",
		"migrations_dir": "drizzle"
	}
]
```

Then regenerate binding types:

```bash
bun run cf-typegen
```

## Migrations

Generate SQL from the Drizzle schema:

```bash
bun run db:generate
```

Apply locally:

```bash
bun run db:migrate:local
```

Apply remotely:

```bash
bun run db:migrate:remote
```

The schema lives in `src/db/schema.ts`, and the OpenNext-aware client lives in `src/db/client.ts`.
