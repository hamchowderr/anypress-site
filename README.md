# AnyPress site

The marketing site for [AnyPress](https://anypress.io): any website, on its own WordPress, with the tools already set up.

It's a headless front end built with Next.js. Checkout and the customer account area stay on the
AnyPress WordPress shop (`shop.anypress.io`, running FluentCart and the WaaS Host plugin), so this
site never handles payments or WordPress sign-in. Plan buttons link to FluentCart's instant checkout
on the shop, and "Sign in" links to the shop's account page.

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
| `NEXT_PUBLIC_ITEM_WEBSITE`, `_BOOKINGS`, `_STORE`, `_COMMUNITY`, `_EVERYTHING` | The FluentCart variation id each site type's button checks out. Unset shows "Opening soon". | unset |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Address shown on the contact page | unset |

Site types, prices and the customer groups live in `src/lib/site.ts`.

## License

GPL-3.0-or-later. See [LICENSE](LICENSE).
