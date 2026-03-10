# Deployment Notes

See [README.md](./README.md) for the full deployment workflow.

Recommended production domains for this app:

- website: `havana.ibnbatoutaweb.com`
- admin: `admin.havana.ibnbatoutaweb.com`

Recommended Coolify process:

1. Deploy with generated domains first.
2. Verify both generated HTTPS URLs work.
3. Switch website to `https://havana.ibnbatoutaweb.com:3000`.
4. Switch admin to `https://admin.havana.ibnbatoutaweb.com:3100`.
5. Enable GitHub auto-deploy with `COOLIFY_WEBHOOK_PROD` and `COOLIFY_TOKEN_PROD`.
