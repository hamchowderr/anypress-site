import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { PRIVACY } from "@/content/legal";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: "/privacy",
  title: "Privacy Policy",
  description: "How AnyPress collects, uses and protects personal data for website owners, sellers, resellers and the visitors to their sites.",
});

export default function Privacy() {
  return <LegalPage title="Privacy Policy" effective={PRIVACY.effective} html={PRIVACY.html} />;
}
