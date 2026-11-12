import { notFound } from "next/navigation";
import { SiteTypePage } from "@/components/SiteTypePage";
import { SITE_TYPES } from "@/lib/site";

// A site type's page with copy "b". src/proxy.ts shows it at /sites/<type> to half of visitors and sends anyone who
// opens /sites-b/<type> itself back there, so it has that page's own title and canonical address.
export { generateMetadata, generateStaticParams } from "../../sites/[type]/page";

export default async function SiteTypePageB({ params }: PageProps<"/sites-b/[type]">) {
  const { type } = await params;
  if (!SITE_TYPES.some((s) => s.id === type)) notFound();
  return <SiteTypePage type={type} version="b" />;
}
