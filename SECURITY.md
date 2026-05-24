# Security

Please do not open public issues for vulnerabilities.

Report security concerns privately through GitHub security advisories for this repository. Include reproduction steps,
affected versions or commits, impact, and any suggested mitigation.

## Secret Handling

- Never commit `.env.local`, `.dev.vars`, API keys, webhook secrets, or Cloudflare tokens.
- Use `wrangler secret put NAME` for Worker production secrets.
- Treat Dodo webhook verification and database-backed subscription state as production-critical.
