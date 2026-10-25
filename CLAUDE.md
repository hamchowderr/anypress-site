# AnyPress site: agent guide

@AGENTS.md

The marketing site at anypress.io: a headless Next.js front end on Vercel. Checkout and customer accounts stay on the WordPress shop (shop.anypress.io, FluentCart and WaaS Host); this site never handles payments. Customer stores are not headless; only this site is.

- `PRODUCT.md` says who the site speaks to and what it promises; `DESIGN.md` holds the look (the sketchbook style, its colours and type). Read both before changing copy or layout.
- Every customer group is spoken to equally; none is the main audience. Pricing and plan names must match the shop's live plans.
- Before pushing: `npm run lint` and `npm run build`. Check pages at phone width.
- Contact email on the site is support@anypress.io.

## Rules for every change

- **Beads, every time.** Each piece of work gets a Beads issue before it starts (check for a duplicate first). Put the id in the branch, the PR and the status, and close the issue when the PR merges or the change is live. Run `bd` in the session doing the work; the SessionStart hook in `.claude/settings.json` loads the Dolt login, then `bd dolt push` syncs it. This repository's issues are in DoltHub `chowderr/waas_api (ids `waas-api-*`; run `bd` from a waas-provisioning-api checkout)`.
- **Pull requests:** open them ready for review, not as drafts, so CI runs. Merge a PR yourself once CI is green and the work was asked for.
- **No "WPCS" wording.** The old platform is gone. Say "the AnyPress API" or "the API's key and secret login". Don't add the word anywhere; existing identifiers that live sites depend on (plugin slugs such as `wpcs-waas-host`, update URLs) stay until a planned migration.
- **Public docs are for users.** READMEs and `docs/` explain how to use and run the code. Internal notes (server and Coolify ids, Beads, deployment steps) go in the obsidian-vault repository under `1. Projects/WaaS/`. Never put how or why AnyPress started in public copy.
- **Verify before claiming.** Check npm, wordpress.org or the official docs before calling a version or spec "the latest", and check a fix on the running system before calling it fixed.
