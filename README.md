# AnyPress site

The marketing site for [AnyPress](https://anypress.io): WordPress websites, hosted and ready.

It's a headless front end built with Next.js. Checkout stays on the AnyPress WordPress shop
(`shop.anypress.io`, running FluentCart and the WaaS Host plugin), so this site never handles
payments. Plan buttons link to FluentCart's instant checkout on the shop.

**Your websites** (`/account`): customers sign in on the shop (OAuth 2.0 with PKCE, see the
[account API docs](https://github.com/hamchowderr/waas-plugins/blob/main/docs/account-api.md)) and
come back here to see their websites and log in to them. Tokens stay on this site's server in an
encrypted, httpOnly cookie. Until the account settings below are set, "Sign in" links to the shop's
own account page instead.

## Run it

```sh
npm install
npm run dev
```

Open http://localhost:3000.

## Settings

All optional. Copy `.env.example` to `.env.local` to set them locally.

| Variable | What it does | Default |
|---|---|---|
| `NEXT_PUBLIC_SHOP_URL` | The WordPress shop that runs checkout and accounts | `https://shop.anypress.io` |
| `NEXT_PUBLIC_ACCOUNT_PATH` | The account page on the shop | `/account/` |
| `NEXT_PUBLIC_PLAN_ITEM_ID` | The FluentCart variation id the plan's Buy button checks out. Unset shows "Coming soon". | unset |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Address for the agencies page's "Email us" button | unset |
| `ACCOUNT_CLIENT_ID` | This site's client id on the shop (`wp waas-host account-client add`) | unset: sign-in off |
| `ACCOUNT_CLIENT_SECRET` | Its client secret. Server only; never `NEXT_PUBLIC_` | unset: sign-in off |
| `SESSION_SECRET` | 32+ random characters that encrypt the session cookie (`openssl rand -base64 32`) | unset: sign-in off |
| `SITE_URL` | This site's address; the callback `<SITE_URL>/api/auth/callback` must be registered on the shop | `https://anypress.io` |

Plans live in `src/lib/site.ts`.

## License

GPL-3.0-or-later. See [LICENSE](LICENSE).
