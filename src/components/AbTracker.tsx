"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AB_COOKIE, AB_TEST, parseAbCookie, type AbEvent } from "@/lib/ab";
import { ACCOUNT_URL, SHOP_URL } from "@/lib/site";

// For visitors in the hero test (src/lib/ab.ts): counts a homepage view, a click on the hero's "Start your site", and
// any click through to the shop from any page (not the sign-in link, which is for people who already bought). Shop links also get the version as UTM tags, which FluentCart keeps on
// the order, so orders can be split by version too.
function send(event: AbEvent, path: string) {
  const body = JSON.stringify({ event, path });
  if (!navigator.sendBeacon?.("/api/ab", new Blob([body], { type: "application/json" }))) {
    fetch("/api/ab", { method: "POST", body, keepalive: true }).catch(() => undefined);
  }
}

export function AbTracker() {
  const path = usePathname();

  useEffect(() => {
    const who = parseAbCookie(document.cookie.match(new RegExp(`(?:^|; )${AB_COOKIE}=([^;]+)`))?.[1]);
    if (!who) return;
    if (path === "/") send("view", path);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      if (a.dataset.ab === "start") send("start", path);
      else if (a.href.startsWith(`${SHOP_URL}/`) && !a.href.startsWith(ACCOUNT_URL)) {
        const url = new URL(a.href);
        if (!url.searchParams.has("utm_campaign")) {
          url.searchParams.set("utm_source", "anypress.io");
          url.searchParams.set("utm_medium", "site");
          url.searchParams.set("utm_campaign", AB_TEST);
          url.searchParams.set("utm_content", `hero-${who.version}`);
          a.href = url.toString();
        }
        send("shop", path);
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [path]);

  return null;
}
