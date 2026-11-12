import { ResellersPage } from "@/components/ResellersPage";

// /resellers with copy "b". src/proxy.ts shows it at /resellers to half of visitors and sends anyone who opens /resellers-b
// itself back there, so it has that page's own title and canonical address.
export { metadata } from "../resellers/page";

export default function ResellersB() {
  return <ResellersPage version="b" />;
}
