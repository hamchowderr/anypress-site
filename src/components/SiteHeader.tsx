import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ACCOUNT_URL } from "@/lib/site";

const NAV = [
  { href: "/#how", label: "How it works" },
  { href: "/#pick", label: "Sites & prices" },
  { href: "/who", label: "Who it's for" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b-[2.5px] border-ink bg-paper">
      <nav className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3 sm:px-6">
        <Link href="/" aria-label="AnyPress home" className="rounded-md">
          <Logo />
        </Link>
        <div className="hidden flex-1 items-center justify-center gap-8 font-bold lg:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="hover:underline">
              {n.label}
            </Link>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-4 lg:ml-0">
          <a href={ACCOUNT_URL} className="hidden font-bold hover:underline sm:inline">
            Sign in
          </a>
          <Link href="/#pick" className="btn btn-ink !gap-0 !px-4 !py-2 whitespace-nowrap">
            Start<span className="hidden sm:inline">&nbsp;your site</span>
          </Link>
          <details className="relative lg:hidden">
            <summary aria-label="Menu" className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border-[2.5px] border-ink">
              <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M3 6h14M3 10h14M3 14h14" />
              </svg>
            </summary>
            <div className="absolute right-0 mt-3 w-60 rounded-2xl border-[2.5px] border-ink bg-paper p-2 shadow-[0_18px_40px_-16px_rgb(23_19_28/0.5)]">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="block rounded-xl px-3 py-2.5 font-bold hover:bg-paper-2">
                  {n.label}
                </Link>
              ))}
              <a href={ACCOUNT_URL} className="block rounded-xl px-3 py-2.5 font-bold hover:bg-paper-2">
                Sign in
              </a>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
