import type { Metadata } from "next";
import Link from "next/link";
import { CHANGES } from "@/content/changelog";
import { ChangelogList } from "@/components/ChangelogList";
import { LeadForm } from "@/components/LeadForm";
import { CtaBand, PageHero, SectionHead } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: "/changelog",
  title: "What's new",
  description: "New designs, new ways to move in and new things your site can do. Every AnyPress site gets them, and there's nothing to install.",
});

export default function Changelog() {
  return (
    <>
      <PageHero
        drawing="note"
        eyebrow="what's new"
        title="New on AnyPress. Already on your site."
        lead="New designs, new ways to move in and new things your site can do, newest first. There's nothing to install or update. We add it to your site for you."
      />

      <section className="sec">
        <div className="in">
          <ChangelogList changes={CHANGES} />
          <p className="text-sm">
            How updates reach your site without breaking it:{" "}
            <Link href="/updates" className="underline">
              safe updates
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="sec soft" aria-labelledby="h-news">
        <div className="in max-w-3xl">
          <SectionHead
            id="h-news"
            left
            eyebrow="by email"
            title="What's new, once a month"
            lead="A short roundup of what reached your site that month, with a tip or two for using it."
          />
          <LeadForm cta="Send me what's new" note="One email to confirm, then the monthly roundup. Unsubscribe any time." />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
