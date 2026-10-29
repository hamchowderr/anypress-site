import Link from "next/link";
import { NavLink, StartButton } from "@/components/HeaderLinks";
import { Logo } from "@/components/Logo";
import { ACCOUNT_URL, DASHBOARD_URL } from "@/lib/site";

// For people getting a website. Sellers and resellers get their own link, set apart after these.
const NAV = [
  { href: "/pricing", label: "Sites & prices" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/#examples", label: "Examples" },
  { href: "/who", label: "Who it's for" },
  { href: "/help", label: "Help" },
];

const SELL = [
  { href: "/agencies", label: "Sell websites" },
  { href: "/how-it-works/sellers", label: "How selling works" },
  { href: "/resellers", label: "Become a reseller" },
];

export function SiteHeader() {
  const signIn = ACCOUNT_URL;
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
            <span aria-hidden className="h-6 w-px bg-line" />
            <NavLink
              href="/agencies"
              label="Sell websites"
              className="rounded-full border border-ink px-3.5 py-1 hover:bg-paper-2 aria-[current=page]:bg-ink aria-[current=page]:text-paper"
            />
          </div>
          <div className="ml-auto flex items-center gap-4 lg:ml-0">
            <details className="nav-signin relative hidden sm:block">
              <summary className="cursor-pointer list-none font-semibold">Sign in</summary>
              <div className="card absolute right-0 mt-3 w-72 border-ink p-2 shadow-[6px_6px_0_var(--honey)]">
                <a href={signIn} className="block rounded-xl px-3 py-2.5 hover:bg-paper-2">
                  <b className="block">Your website</b>
                  <small className="text-ink-soft">You bought a site from AnyPress</small>
                </a>
                <a href={DASHBOARD_URL} className="block rounded-xl px-3 py-2.5 hover:bg-paper-2">
                  <b className="block">Seller and reseller dashboard</b>
                  <small className="text-ink-soft">You sell websites to your clients</small>
                </a>
              </div>
            </details>
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
                  Sign in to your website
                </a>
                <p className="mx-3 mt-3 border-t border-line pt-3 text-[13px] font-bold tracking-wide text-ink-soft uppercase">For sellers</p>
                {SELL.map((n) => (
                  <NavLink
                    key={n.href}
                    href={n.href}
                    label={n.label}
                    className="block rounded-xl px-3 py-2.5 font-semibold hover:bg-paper-2 aria-[current=page]:bg-paper-2"
                  />
                ))}
                <a href={DASHBOARD_URL} className="block rounded-xl px-3 py-2.5 font-semibold hover:bg-paper-2">
                  Seller and reseller sign-in
                </a>
              </div>
            </details>
          </div>
        </nav>
      </header>
    </>
  );
}
