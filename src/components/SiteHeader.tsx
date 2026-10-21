import Link from "next/link";
import { Logo } from "@/components/Logo";
import { accountSignInEnabled } from "@/lib/account";
import { ACCOUNT_URL } from "@/lib/site";

const NAV = [
  { href: "/#examples", label: "Examples" },
  { href: "/pricing", label: "Prices" },
  { href: "/who", label: "Who it's for" },
  { href: "/agencies", label: "Sell websites" },
];

export function SiteHeader() {
  const signIn = accountSignInEnabled() ? "/account" : ACCOUNT_URL;
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3 sm:px-6">
        <Link href="/" aria-label="AnyPress home" className="rounded-md">
          <Logo />
        </Link>
        <div className="hidden flex-1 items-center justify-center gap-8 text-[15px] font-medium text-ink-soft lg:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-ink">
              {n.label}
            </Link>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-4 lg:ml-0">
          <a href={signIn} className="hidden text-[15px] font-medium text-ink-soft hover:text-ink sm:inline">
            Sign in
          </a>
          <Link href="/#sites" className="btn btn-ink !gap-0 !px-4 !py-2 text-[15px] whitespace-nowrap">
            Start<span className="hidden sm:inline">&nbsp;your site</span>
          </Link>
          <details className="relative lg:hidden">
            <summary aria-label="Menu" className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-line bg-panel">
              <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M3 6h14M3 10h14M3 14h14" />
              </svg>
            </summary>
            <div className="card absolute right-0 mt-3 w-60 p-2 shadow-[0_18px_40px_-16px_rgb(29_27_33/0.35)]">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="block rounded-xl px-3 py-2.5 font-medium hover:bg-paper-2">
                  {n.label}
                </Link>
              ))}
              <a href={signIn} className="block rounded-xl px-3 py-2.5 font-medium hover:bg-paper-2">
                Sign in
              </a>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
