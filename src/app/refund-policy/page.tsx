import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { REFUND } from "@/content/legal";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Our 30-day money-back guarantee and how refunds work.",
};

export default function RefundPolicy() {
  return <LegalPage title="Refund Policy" effective={REFUND.effective} html={REFUND.html} />;
}
