import { SellersPage } from "@/components/SellersPage";

// /sellers with copy "b". src/proxy.ts shows it at /sellers to half of visitors and sends anyone who opens /sellers-b
// itself back there, so it has that page's own title and canonical address.
export { metadata } from "../sellers/page";

export default function SellersB() {
  return <SellersPage version="b" />;
}
