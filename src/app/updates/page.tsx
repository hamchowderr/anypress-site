import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Flow } from "@/components/FactPieces";
import type { DrawingName } from "@/components/Drawing";
import { JsonLd } from "@/components/JsonLd";
import { ProblemFix, type Problem } from "@/components/ProblemFix";
import { VersionStory } from "@/components/VersionStory";
import { CtaBand, PageHero, Questions, SectionHead } from "@/components/ui";
import { faqLd, pageMeta } from "@/lib/seo";

// How updates reach every site without breaking one: ours (WordPress, theme, blocks, included plugins) and a
// seller's own (versions of their starting site).
export const metadata: Metadata = pageMeta({
  path: "/updates",
  title: "Safe updates for every site",
  card: "Safe updates",
  description:
    "We update WordPress, the theme and the included plugins for every site, after trying each update on every kind of site. Sellers change their own starting site in versions they can go back from.",
});

const OURS: [DrawingName, string, ReactNode][] = [
  ["open", "We spot a new release", "Every hour we look for new versions of WordPress, our theme, our blocks and the plugins every site comes with."],
  ["tools", "We try it on every kind of site", "A test copy of each kind of site is built with the update. Every admin screen and the home page must load without an error."],
  ["backup", "We test it like a real site", "The test copy is set up the way a new site is, and every page must open before the update goes anywhere."],
  ["truck", "Sites move over", "Only then does it reach your sites. A site that doesn't move cleanly is put back where it was."],
  ["key", "The old version stays", "The version sites were on is kept, so we can always go back."],
];

const PROBLEMS: Problem[] = [
  {
    problem: ["One update takes the site down", "You press Update, the page goes white, and you hear about it from a customer."],
    fix: ["Tried before it touches you", "Every update runs on a test copy of every kind of site first. If anything errors, it never reaches yours."],
  },
  {
    problem: ["Updating site after site", "Forty client sites means forty logins and forty Update buttons, every week."],
    fix: ["Done for every site at once", "WordPress, the theme and the plugins every site comes with are updated for you, everywhere."],
  },
  {
    problem: ["No way back", "A change goes wrong and the only fix is a late night putting it back by hand."],
    fix: ["Go back in a click", "The version a site was on is kept. Move it back, and it's as it was."],
  },
];

const FAQ: [string, ReactNode][] = [
  [
    "Do I have to update anything?",
    "Not for WordPress, our theme, our blocks or the plugins every site comes with. We do those. Plugins you add yourself, you update in a new version of your starting site.",
  ],
  [
    "Will an update change my pages or orders?",
    "No. Updates change the software, not what's in the site. Your pages, posts, orders, members and uploads stay as they are.",
  ],
  [
    "How fast do security fixes arrive?",
    "We look for new releases every hour. A fix reaches sites as soon as it has passed the checks above, usually the same day.",
  ],
  [
    "What if an update breaks something?",
    "It shouldn't get that far, because every update is tried on every kind of site first. If it does, the site can go back to the version it was on, and every site also has nightly backups.",
  ],
  [
    "Can I stop my clients' sites from getting a change of mine?",
    "Yes. Your changes only reach a site when you move it to the new version. Until then it stays on the one it has.",
  ],
  [
    "Can I turn on automatic plugin updates in WordPress?",
    <>
      There&apos;s no need for the plugins we include, because we update them for you. For more about how sites are run, see{" "}
      <Link href="/hosting" className="underline">hosting and safety</Link>.
    </>,
  ],
];

export default function SafeUpdates() {
  return (
    <>
      <JsonLd data={faqLd(FAQ)} />
      <PageHero
        drawing="tools"
        side="technical"
        eyebrow="safe updates"
        title="Updates that never break your site."
        lead="We keep WordPress and everything that comes with it up to date, after trying every update on every kind of site. You never press Update, and you can always go back."
      />

      <ProblemFix soft items={PROBLEMS} eyebrow="why it matters" title="Updates are where websites break." />

      <section className="sec" aria-labelledby="h-ours">
        <div className="in">
          <SectionHead
            eyebrow="what we update for you"
            title="Every update is tried before it reaches you."
            lead="Nobody presses Update on a live site. Here's the path every update takes first."
            id="h-ours"
          />
          <Flow steps={OURS} />
        </div>
      </section>

      <section className="sec soft" aria-labelledby="h-yours">
        <div className="in">
          <SectionHead
            eyebrow="for sellers: your own changes"
            title="Change all your clients' sites at once, without breaking one."
            lead="Your starting site is the one every order is copied from. Change a copy of it, try it, then move sites over when you're ready."
            id="h-yours"
          />
          <VersionStory />
        </div>
      </section>

      <section className="sec" aria-labelledby="h-faq">
        <div className="in">
          <SectionHead drawing="question" title="Questions about updates" id="h-faq" />
          <Questions items={FAQ} firstOpen />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
