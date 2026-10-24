"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// The header's links, marked with the page you're on, and a Start button that stays on the kind of site you're
// looking at instead of sending you back to the homepage picker.
export function NavLink({ href, label, className }: { href: string; label: string; className?: string }) {
  const path = usePathname();
  const here = !href.includes("#") && (path === href || path.startsWith(`${href}/`));
  return (
    <Link href={href} aria-current={here ? "page" : undefined} className={className}>
      {label}
    </Link>
  );
}

export function StartButton() {
  const path = usePathname();
  const href = /^\/sites\/[^/]+$/.test(path) ? "#sizes" : path.startsWith("/who/") ? "#plans" : "/#sites";
  return (
    <Link href={href} className="btn btn-ink !gap-0 !px-4 !py-2.5 text-[15px]">
      Start<span className="hidden sm:inline">&nbsp;your site</span>
    </Link>
  );
}
