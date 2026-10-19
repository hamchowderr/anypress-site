import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ACCOUNT_URL, SITE_TYPES } from "@/lib/site";

const COLUMNS = [
  {
    title: "Build",
    links: SITE_TYPES.map((t) => ({ href: "/#site-types", label: t.name })),
  },
  {
    title: "AnyPress",
    links: [
      { href: "/#features", label: "Features" },
      { href: "/pricing", label: "Pricing" },
      { href: "/#who", label: "Who it's for" },
      { href: "/agencies", label: "For agencies" },
      { href: "/#faq", label: "Questions" },
    ],
  },
  {
    title: "Developers",
    links: [
      { href: "/#developers", label: "API & webhooks" },
      { href: "https://github.com/hamchowderr/waas-provisioning-api", label: "Provisioning API" },
      { href: "https://github.com/hamchowderr/waas-plugins", label: "WordPress plugins" },
      { href: "https://github.com/hamchowderr/waas-dashboard", label: "Dashboard" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: ACCOUNT_URL, label: "Sign in" },
      { href: "https://app.anypress.io", label: "Partner dashboard" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="grain relative mt-auto overflow-hidden border-t border-ink-line bg-ink text-on-ink">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-16 pb-10 sm:px-6 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-6 text-on-ink-muted">
            Any website, on its own WordPress, with the tools already set up. Open source under the GPL.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {COLUMNS.map((c) => (
            <div key={c.title}>
              <p className="eyebrow">{c.title}</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-on-ink-muted transition-colors hover:text-on-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p
        aria-hidden
        className="font-display text-ribbon pointer-events-none -mb-[0.22em] text-center text-[22vw] leading-none font-extrabold select-none"
      >
        AnyPress
      </p>
      <div className="relative border-t border-ink-line bg-ink">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-on-ink-muted sm:px-6">
          © AnyPress, by Otaku Solutions.
        </p>
      </div>
    </footer>
  );
}
