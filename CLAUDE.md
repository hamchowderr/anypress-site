# AnyPress site: agent guide

@AGENTS.md

The marketing site at anypress.io: a headless Next.js front end on Vercel. Checkout and customer accounts stay on the WordPress shop (shop.anypress.io, FluentCart and AnyPress Host); this site never handles payments. Customer stores are not headless; only this site is.

- `PRODUCT.md` says who the site speaks to and what it promises; `DESIGN.md` holds the look (the sketchbook style, its colours and type). Read both before changing copy or layout.
- Every customer group is spoken to equally; none is the main audience. Pricing and plan names must match the shop's live plans.
- Before pushing: `npm run lint`, `npm run deadcode` and `npm run build`. `npm run deadcode` (Fallow, `.fallowrc.json`) fails on unused files, exports, types and packages: remove them rather than ignoring them. On a pull request CI also runs `fallow audit`, which fails on duplicated or overly complex code the change adds. Check pages at phone width.
- Contact email on the site is support@anypress.io.

## Rules for every change

- **Beads, every time.** Each piece of work gets a Beads issue in the list of the repository it changes, before it starts (check for a duplicate first). Put the id in the branch, the PR and the status, and close the issue when the PR merges or the change is live. Run `bd` in the session doing the work; the SessionStart hook in `.claude/settings.json` loads the Dolt login and sets up `.beads` from DoltHub, then `bd dolt push` syncs it. This repository's issues are in DoltHub `chowderr/anypress_site` (new ids `site-*`; issues moved here from another list keep their old ids). Each AnyPress repository has its own list. Work that also changes another repository gets an `also:<repo>` label (`api`, `plugins`, `dashboard`, `site`, `theme`, `blocks`, `fluentsuite`), and a task whose epic is in another list gets `epic:<id>`. Jobs that change no code (accounts, outreach, server and shop settings) go in AnyPress Ops (`chowderr/anypress_ops`, in the obsidian-vault repository under `1. Projects/WaaS/AnyPress Ops/`).
- **Pull requests:** open them ready for review, not as drafts, so CI runs. Merge a PR yourself once CI is green and the work was asked for.
- **No "WPCS" wording.** The old platform is gone. Say "the AnyPress API" or "the API's key and secret login". Don't add the word anywhere; existing identifiers that live sites depend on (plugin slugs such as `wpcs-waas-host`, update URLs) stay until a planned migration.
- **Public docs are for users.** READMEs and `docs/` explain how to use and run the code. Internal notes (server and Coolify ids, Beads, deployment steps) go in the obsidian-vault repository under `1. Projects/WaaS/`. Never put how or why AnyPress started in public copy.
- **Official SDKs, always.** Call every outside service through its official SDK or library and configure it to fit (custom storage, base URL, options), rather than writing the HTTP calls by hand. Read the SDK's options before deciding it doesn't fit. Only where no official SDK exists, write the client yourself and say so in the PR.
- **Verify before claiming.** Check npm, wordpress.org or the official docs before calling a version or spec "the latest", and check a fix on the running system before calling it fixed.
