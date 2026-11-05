import { HomePage } from "@/components/HomePage";

// The homepage with copy "b". src/proxy.ts shows it at / to half of visitors and sends anyone who opens /home-b
// itself back to /, so it has the homepage's own title and canonical address.
export { metadata } from "../page";

export default function HomeB() {
  return <HomePage version="b" />;
}
