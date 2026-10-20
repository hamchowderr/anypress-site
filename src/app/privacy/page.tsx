import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { PRIVACY } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How AnyPress handles personal data.",
};

export default function Privacy() {
  return <LegalPage title="Privacy Policy" effective={PRIVACY.effective} html={PRIVACY.html} />;
}
