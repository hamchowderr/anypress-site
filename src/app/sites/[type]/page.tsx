import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SEARCH_NAME, SiteTypePage } from "@/components/SiteTypePage";
import { SITE_TYPES } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return SITE_TYPES.map((t) => ({ type: t.id }));
}

export async function generateMetadata({ params }: PageProps<"/sites/[type]">): Promise<Metadata> {
  const { type } = await params;
  const t = SITE_TYPES.find((s) => s.id === type);
  if (!t) return {};
  return pageMeta({
    path: `/sites/${t.id}`,
    title: `${SEARCH_NAME[t.id]} on managed WordPress`,
    card: t.headline,
    description: `${t.pitch} ${SEARCH_NAME[t.id] === "Online store" || SEARCH_NAME[t.id] === "All-in-one business site" ? "An" : "A"} ${SEARCH_NAME[t.id].toLowerCase()} on WordPress, set up for you and looked after every day, from $${t.from} a month.`,
  });
}

export default async function Page({ params }: PageProps<"/sites/[type]">) {
  const { type } = await params;
  if (!SITE_TYPES.some((s) => s.id === type)) notFound();
  return <SiteTypePage type={type} />;
}
