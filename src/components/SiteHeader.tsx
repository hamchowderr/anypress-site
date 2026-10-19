import Link from "next/link";
import { accountSignInEnabled } from "@/lib/account";
import { ACCOUNT_URL } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-b border-line">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          AnyPress
        </Link>
        <div className="flex flex-1 flex-wrap items-center justify-end gap-x-5 gap-y-2 text-sm">
          <Link href="/pricing" className="hover:text-accent">
            Pricing
          </Link>
          <Link href="/agencies" className="hover:text-accent">
            For agencies
          </Link>
          <a href={accountSignInEnabled() ? "/account" : ACCOUNT_URL} className="hover:text-accent">
            Sign in
          </a>
          <Link href="/pricing" className="rounded-md bg-accent px-3 py-1.5 font-medium text-on-accent hover:opacity-90">
            Get started
          </Link>
        </div>
      </nav>
    </header>
  );
}
