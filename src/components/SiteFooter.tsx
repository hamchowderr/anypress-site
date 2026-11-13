import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import { ACCOUNT_URL, CONTACT_EMAIL, DASHBOARD_URL, SITE_TYPES } from "@/lib/site";

const COLUMNS = [
  {
    title: "Get a website",
    links: [
      ...SITE_TYPES.map((t) => ({ href: `/sites/${t.id}`, label: t.name })),
      { href: "/pricing", label: "Prices" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/move", label: "Move your site" },
      { href: "/care", label: "Care for your site" },
      { href: "/compare", label: "Compare" },
    ],
  },
  {
    title: "Sell websites",
    links: [
      { href: "/sellers", label: "Sell websites" },
      { href: "/how-it-works/sellers", label: "How selling works" },
      { href: "/sellers/setup", label: "How we set you up" },
      { href: "/sellers/autopilot", label: "Selling on autopilot" },
      { href: "/resellers", label: "Become a reseller" },
      { href: "/sell", label: "Apply to sell" },
      { href: "/automate", label: "Create sites automatically" },
      { href: "/ai", label: "AnyPress in your AI app" },
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
      { href: "/designs", label: "Designs" },
      { href: "/designs/blocks", label: "Blocks" },
      { href: "/included", label: "What's included" },
      { href: "/hosting", label: "Hosting and safety" },
      { href: "/updates", label: "Safe updates" },
      { href: "/affiliates", label: "Affiliate program" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/help", label: "Help" },
      { href: ACCOUNT_URL, label: "Sign in to your website" },
      { href: DASHBOARD_URL, label: "Seller and reseller sign-in" },
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
              <h2>{c.title}</h2>
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
          <a href={`mailto:${CONTACT_EMAIL}`} className="inline-block py-1">
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </footer>
  );
}
