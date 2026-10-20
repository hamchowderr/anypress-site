import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { TERMS } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for using AnyPress, our shop, dashboard and API.",
};

export default function Terms() {
  return <LegalPage title="Terms of Service" effective={TERMS.effective} html={TERMS.html} />;
}
