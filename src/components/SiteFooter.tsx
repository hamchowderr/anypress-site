import Link from "next/link";
import { ACCOUNT_URL } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-8 text-sm text-muted">
        <p>© AnyPress, by Otaku Solutions</p>
        <div className="flex gap-5">
          <Link href="/pricing" className="hover:text-fg">
            Pricing
          </Link>
          <Link href="/agencies" className="hover:text-fg">
            For agencies
          </Link>
          <a href={ACCOUNT_URL} className="hover:text-fg">
            Your account
          </a>
        </div>
      </div>
    </footer>
  );
}
