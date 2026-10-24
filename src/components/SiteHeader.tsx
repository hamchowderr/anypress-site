import Link from "next/link";
import { NavLink, StartButton } from "@/components/HeaderLinks";
import { Logo } from "@/components/Logo";
import { accountSignInEnabled } from "@/lib/account";
import { ACCOUNT_URL } from "@/lib/site";

const NAV = [
  { href: "/pricing", label: "Sites & prices" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/#examples", label: "Examples" },
  { href: "/who", label: "Who it's for" },
  { href: "/agencies", label: "Sell websites" },
  { href: "/help", label: "Help" },
];

export function SiteHeader() {
  const signIn = accountSignInEnabled() ? "/account" : ACCOUNT_URL;
  return (
    <>
      <aside className="announce" aria-label="Affiliate program">
        <div className="in">
          <span className="pill">Affiliates</span> Earn 30% of every first payment you send our way.{" "}
          <Link href="/affiliates">Join the program →</Link>
        </div>
      </aside>
      <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md">
        <nav className="in flex items-center gap-6 py-3.5" aria-label="Main">
          <Link href="/" aria-label="AnyPress home" className="rounded-md">
            <Logo />
          </Link>
          <div className="hidden flex-1 items-center justify-center gap-7 text-[16px] font-medium lg:flex">
            {NAV.map((n) => (
              <NavLink key={n.href} href={n.href} label={n.label} className="underline-offset-4 hover:underline aria-[current=page]:underline aria-[current=page]:decoration-2" />
            ))}
          </div>
          <div className="ml-auto flex items-center gap-4 lg:ml-0">
            <a href={signIn} className="hidden font-semibold sm:inline">
              Sign in
            </a>
            <StartButton />
            <details className="relative lg:hidden">
              <summary aria-label="Menu" className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-ink bg-panel">
                <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M3 6h14M3 10h14M3 14h14" />
                </svg>
              </summary>
              <div className="card absolute right-0 mt-3 w-64 border-ink p-2 shadow-[6px_6px_0_var(--honey)]">
                {NAV.map((n) => (
                  <NavLink
                    key={n.href}
                    href={n.href}
                    label={n.label}
                    className="block rounded-xl px-3 py-2.5 font-semibold hover:bg-paper-2 aria-[current=page]:bg-paper-2"
                  />
                ))}
                <a href={signIn} className="block rounded-xl px-3 py-2.5 font-semibold hover:bg-paper-2">
                  Sign in
                </a>
              </div>
            </details>
          </div>
        </nav>
      </header>
    </>
  );
}
