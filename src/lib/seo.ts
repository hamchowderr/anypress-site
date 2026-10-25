import type { Metadata } from "next";
import { isValidElement, type ReactNode } from "react";

export const BASE_URL = "https://anypress.io";
export const SITE_NAME = "AnyPress";

/**
 * Metadata for one page: title, description, its canonical address, and the card people see when
 * the link is shared (Open Graph and X). The card's picture is drawn by /og with the page's title on it.
 */
export function pageMeta({
  path,
  title,
  description,
  card,
  noIndex = false,
}: {
  path: string;
  title?: string;
  description: string;
  // The words on the share picture, when they should differ from the title.
  card?: string;
  noIndex?: boolean;
}): Metadata {
  const shown = title ? `${title} · ${SITE_NAME}` : `${SITE_NAME}: managed WordPress, set up and looked after for you`;
  const image = { url: `/og?t=${encodeURIComponent(card ?? title ?? "Managed WordPress, set up and looked after for you")}`, width: 1200, height: 630, alt: shown };
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: SITE_NAME, locale: "en_US", url: path, title: shown, description, images: [image] },
    twitter: { card: "summary_large_image", title: shown, description, images: [image.url] },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** The plain words inside some JSX, for structured data (answers in FAQs are written as JSX). */
export function toText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return toText(node.props.children);
  return "";
}

/** FAQPage structured data from the same question list a page shows. */
export function faqLd(items: [string, ReactNode][]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: toText(a).replace(/\s+/g, " ").trim() },
    })),
  };
}

/** Breadcrumbs from the home page down to this one: [["Who it's for", "/who"], ["Shops", "/who/shops"]]. */
export function breadcrumbLd(trail: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [["Home", "/"], ...trail].map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${BASE_URL}${path === "/" ? "" : path}`,
    })),
  };
}
