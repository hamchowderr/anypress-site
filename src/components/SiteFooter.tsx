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
      { href: "/#how", label: "How it works" },
      { href: "/pricing", label: "Prices" },
      { href: "/who", label: "Who it's for" },
      { href: "/agencies", label: "For agencies" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "The details",
    links: [
      { href: "/included", label: "What's included" },
      { href: "/developers", label: "For developers" },
      { href: "https://github.com/hamchowderr/waas-plugins", label: "Open source code" },
    ],
  },
  {
    title: "Your account",
    links: [
      { href: ACCOUNT_URL, label: "Sign in" },
      { href: "https://app.anypress.io", label: "Partner dashboard" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-ink text-paper">
      <div className="flex h-3" aria-hidden>
        <span className="flex-1 bg-amber" />
        <span className="flex-1 bg-orange" />
        <span className="flex-1 bg-red" />
        <span className="flex-1 bg-rose" />
        <span className="flex-1 bg-magenta" />
      </div>
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_2fr]">
        <div className="flex items-start gap-4">
          <LogoMark className="h-16 w-16 shrink-0" />
          <div>
            <p className="font-display text-3xl font-extrabold">AnyPress</p>
            <p className="mt-2 max-w-xs text-paper/75">WordPress, set up and looked after for you.</p>
            <p className="mt-6 text-sm text-paper/60">© AnyPress, by Otaku Solutions.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {COLUMNS.map((c) => (
            <div key={c.title}>
              <p className="font-bold">{c.title}</p>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-paper/75 hover:text-paper hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
