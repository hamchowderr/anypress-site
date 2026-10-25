import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { TERMS } from "@/content/legal";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: "/terms",
  title: "Terms of Service",
  description: "The terms for using AnyPress: buying a plan in our shop, using your WordPress site, the dashboard and the AnyPress API.",
});

export default function Terms() {
  return <LegalPage title="Terms of Service" effective={TERMS.effective} html={TERMS.html} />;
}
