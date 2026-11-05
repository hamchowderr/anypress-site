import { PricingPage } from "@/components/PricingPage";

// The prices page with copy "b". src/proxy.ts shows it at /pricing to half of visitors and sends anyone who opens
// /pricing-b itself back to /pricing, so it has the prices page's own title and canonical address.
export { metadata } from "../pricing/page";

export default function PricingB() {
  return <PricingPage version="b" />;
}
