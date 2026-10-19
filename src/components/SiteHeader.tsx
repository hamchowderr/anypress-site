import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ACCOUNT_URL } from "@/lib/site";

const NAV = [
  { href: "/#site-types", label: "Site types" },
  { href: "/who", label: "Who it's for" },
  { href: "/#features", label: "Features" },
  { href: "/developers", label: "Developers" },
  { href: "/pricing", label: "Pricing" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink-line/70 bg-ink/80 text-on-ink backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3 sm:px-6">
        <Link href="/" aria-label="AnyPress home">
          <Logo />
        </Link>
        <div className="hidden flex-1 items-center justify-center gap-7 text-sm text-on-ink-muted lg:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="transition-colors hover:text-on-ink">
              {n.label}
            </Link>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-3 text-sm lg:ml-0">
          <a href={ACCOUNT_URL} className="hidden text-on-ink-muted hover:text-on-ink sm:inline">
            Sign in
          </a>
          <Link href="/pricing" className="btn btn-ribbon !px-4 !py-2 text-sm">
            Get started
          </Link>
          <details className="group relative lg:hidden">
            <summary
              aria-label="Menu"
              className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-full border border-ink-line [&::-webkit-details-marker]:hidden"
            >
              <span className="block h-px w-4 bg-on-ink shadow-[0_5px_0_var(--on-ink),0_-5px_0_var(--on-ink)]" />
            </summary>
            <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-ink-line bg-ink-2 p-2 shadow-2xl">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="block rounded-xl px-3 py-2 hover:bg-ink-3">
                  {n.label}
                </Link>
              ))}
              <a href={ACCOUNT_URL} className="block rounded-xl px-3 py-2 hover:bg-ink-3">
                Sign in
              </a>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
