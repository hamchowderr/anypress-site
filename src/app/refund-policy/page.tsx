import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { REFUND } from "@/content/legal";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: "/refund-policy",
  title: "Refund Policy",
  description: "Your first AnyPress payment has a 30-day money-back guarantee. How to ask for a refund, how long it takes, and what happens to your site.",
});

export default function RefundPolicy() {
  return <LegalPage title="Refund Policy" effective={REFUND.effective} html={REFUND.html} />;
}
