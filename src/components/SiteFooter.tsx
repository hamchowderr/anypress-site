import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import { ACCOUNT_URL, SITE_TYPES } from "@/lib/site";

const COLUMNS = [
  {
    title: "Sites",
    links: SITE_TYPES.map((t) => ({ href: `/sites/${t.id}`, label: t.name })),
  },
  {
    title: "AnyPress",
    links: [
      { href: "/#examples", label: "Examples" },
      { href: "/pricing", label: "Prices" },
      { href: "/who", label: "Who it's for" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Sell & build",
    links: [
      { href: "/agencies", label: "Sell websites" },
      { href: "/sell", label: "Apply to sell websites" },
      { href: "/affiliates", label: "Affiliate program" },
      { href: "/developers", label: "For developers" },
      { href: "/self-host", label: "Run it yourself" },
      { href: "/included", label: "What's included" },
      { href: "https://github.com/hamchowderr/waas-plugins", label: "Open source code" },
    ],
  },
  {
    title: "Your account",
    links: [
      { href: ACCOUNT_URL, label: "Sign in" },
      { href: "/help", label: "Help" },
      { href: "https://app.anypress.io", label: "Partner dashboard" },
    ],
  },
];

const LEGAL = [
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/refund-policy", label: "Refunds" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-paper-2">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_2.2fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-9 w-9" />
            <span className="font-display text-xl font-semibold">AnyPress</span>
          </div>
          <p className="mt-3 max-w-xs text-ink-soft">WordPress, set up and looked after for you.</p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {COLUMNS.map((c) => (
            <div key={c.title}>
              <p className="text-sm font-semibold">{c.title}</p>
              <ul className="mt-4 space-y-2.5 text-[15px]">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-ink-soft hover:text-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-5 text-sm text-ink-soft sm:px-6">
          <p>© AnyPress, by Otaku Solutions.</p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-ink">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="ribbon h-1 w-24 rounded-full" aria-hidden />
        </div>
      </div>
    </footer>
  );
}
