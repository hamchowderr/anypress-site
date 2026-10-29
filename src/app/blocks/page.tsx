import type { Metadata } from "next";
import { BlocksLibrary } from "@/components/BlocksLibrary";
import { CtaBand, PageHero, Questions, SectionHead } from "@/components/ui";
import { BLOCK_GROUPS, BLOCKS } from "@/lib/blocks";
import { pageMeta } from "@/lib/seo";

// Not indexed until stores run the AnyPress theme.
export const metadata: Metadata = pageMeta({
  path: "/blocks",
  title: "AnyPress Blocks",
  description:
    "Ready-made sections for your AnyPress site: heroes, prices, reviews, contact and more. Add one in the WordPress editor, or ask your AI app to, and it takes your site's colours and fonts.",
  noIndex: true,
});

const QUESTIONS: [string, string][] = [
  [
    "Where do I find them on my site?",
    "In the WordPress editor, click + and open Patterns. Each group is listed under AnyPress Blocks: Heroes, About, Services and prices, Proof, Calls to action, Contact, Blog and Footers.",
  ],
  [
    "Will they match my site?",
    "Yes. Blocks use your site's colours, fonts and spacing, so the same section looks different on a salon site than on a law firm's. Change your style and every block follows.",
  ],
  [
    "Can my AI app add them?",
    "Yes. Connect AnyPress to Claude or ChatGPT and ask for a section in plain words, such as \"add three reviews under the hero\". It picks the right block and writes the words for your business.",
  ],
  [
    "Can I change a block after adding it?",
    "Everything in a block is ordinary WordPress: change the words, swap the photos, move or remove parts. Nothing is locked.",
  ],
];

export default function BlocksPage() {
  return (
    <>
      <PageHero
        side="owners"
        drawing="paint"
        eyebrow="AnyPress Blocks"
        title={
          <>
            Sections ready to <mark>drop in</mark>.
          </>
        }
        lead={`${BLOCKS.length} ready-made sections in ${BLOCK_GROUPS.length} groups, from the first thing visitors see to the footer. They work on every AnyPress site and take your site's colours and fonts.`}
      />

      <section className="sec" aria-labelledby="h-library">
        <div className="in">
          <SectionHead id="h-library" eyebrow="browse" title="Every block, by group." />
          <BlocksLibrary />
        </div>
      </section>

      <section className="sec soft" aria-labelledby="h-blocks-faq">
        <div className="in">
          <SectionHead id="h-blocks-faq" eyebrow="questions" title="How blocks work." />
          <Questions items={QUESTIONS} firstOpen />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
