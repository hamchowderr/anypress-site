import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import { ACCOUNT_URL, CONTACT_EMAIL, SITE_TYPES } from "@/lib/site";

const COLUMNS = [
  {
    title: "Sites",
    links: [
      ...SITE_TYPES.map((t) => ({ href: `/sites/${t.id}`, label: t.name })),
      { href: "/pricing", label: "Prices" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/move", label: "Move your site" },
      { href: "/compare", label: "Compare" },
    ],
  },
  {
    title: "Sell & build",
    links: [
      { href: "/agencies", label: "Sell websites" },
      { href: "/resellers", label: "Become a reseller" },
      { href: "/sell", label: "Apply to sell" },
      { href: "/affiliates", label: "Affiliate program" },
      { href: "/developers", label: "For developers" },
      { href: "/self-host", label: "Run it yourself" },
      { href: "https://github.com/hamchowderr/waas-plugins", label: "Open source code" },
    ],
  },
  {
    title: "AnyPress",
    links: [
      { href: "/who", label: "Who it's for" },
      { href: "/#examples", label: "Example sites" },
      { href: "/included", label: "What's included" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/help", label: "Help" },
      { href: ACCOUNT_URL, label: "Sign in" },
      { href: "https://app.anypress.io", label: "Partner dashboard" },
      { href: "/terms", label: "Terms" },
      { href: "/privacy", label: "Privacy" },
      { href: "/refund-policy", label: "Refunds" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="site-footer mt-auto">
      <div className="in">
        <div className="fcols">
          <div>
            <Link href="/" className="flex items-center gap-2.5 text-xl font-extrabold no-underline">
              <LogoMark className="h-8 w-8" />
              AnyPress
            </Link>
            <p>Real WordPress, set up and looked after for you.</p>
          </div>
          {COLUMNS.map((c) => (
            <div key={c.title}>
              <h4>{c.title}</h4>
              <ul>
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="foot-legal">
          <span>© AnyPress, by Otaku Solutions.</span>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </div>
      </div>
    </footer>
  );
}
