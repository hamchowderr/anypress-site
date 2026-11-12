import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { FactSheet, Flow, PlainTable, VideoRow, type Fact, type Video } from "@/components/FactPieces";
import type { DrawingName } from "@/components/Drawing";
import { JsonLd } from "@/components/JsonLd";
import { ProblemFix, type Problem } from "@/components/ProblemFix";
import { CtaBand, PageHero, Questions, SectionHead } from "@/components/ui";
import { faqLd, pageMeta } from "@/lib/seo";
import { SIZES } from "@/lib/site";

// How every site is hosted and kept safe, in plain words with the detail for people who know WordPress.
export const metadata: Metadata = pageMeta({
  path: "/hosting",
  title: "Hosting and safety",
  card: "Hosting and safety",
  description:
    "Every AnyPress site runs on its own, with its own WordPress and database, a free padlock, nightly backups we test every day, and the speed settings already done.",
});

const FACTS: Fact[] = [
  ["server", "Its own WordPress", "Every site has its own copy of WordPress, its own database and its own web server. Nothing is shared with other sites."],
  ["lock", "The padlock, free", "Every site and every domain gets an HTTPS certificate, renewed for you. Browsers are told to always use it."],
  ["cloud", "Nightly backups", "Files and database, every night, stored away from the servers. We test that one restores every day."],
  ["bolt", "Fast from day one", "Pages are cached, PHP is tuned for WordPress, and communities get their own Redis cache."],
  ["shield", "Sign-ins protected", "Repeated wrong passwords are blocked, and the file editor is switched off in wp-admin."],
  ["mail", "Email that arrives", "Site email sends from your own domain once it's verified, not from a shared server."],
  ["code", "Up to date", "WordPress 7.1 on PHP 8.3, updated for you after every update is tried on every kind of site."],
  ["download", "Yours to take", "Download your whole site as one zip any time. It works on any WordPress host."],
];

const PROBLEMS: Problem[] = [
  {
    problem: ["A slow site loses customers", "Shared hosting means a busy neighbour can slow your pages right when people are buying."],
    fix: ["Your own space, already fast", "Your site has its own set share of the machine, with caching and speed settings done for you."],
  },
  {
    problem: ["Backups nobody has tested", "You find out a backup doesn't work on the day you need it."],
    fix: ["Tested every single day", "Every night we restore a real backup onto a spare copy and check it opens."],
  },
  {
    problem: ["Plugins just to keep the lights on", "A backup plugin, a security plugin, a cache plugin, an SSL setup. Each one more thing to update."],
    fix: ["Built in, not bolted on", "Backups, the padlock, caching and sign-in protection come with every site. Nothing to install."],
  },
];

const BACKUPS: [DrawingName, string, ReactNode][] = [
  ["backup", "Every night", "Your site's files and database are zipped and stored away from the servers."],
  ["note", "Kept for weeks", "We keep one copy from each of the last 7 days and each of the last 4 weeks."],
  ["tools", "Tested every day", "Every night one site's backup is restored onto a spare copy and checked it opens. Every site gets its turn."],
  ["open", "Put back in a click", "Restore any copy from your dashboard. We save the site as it is first, so you can undo it."],
];

const VIDEOS: Video[] = [["backups-and-restores", "Backups and restores", "0:29"]];

const FAQ: [string, ReactNode][] = [
  [
    "Is my site on a shared server?",
    "Sites share the machine, not the site. Each one has its own WordPress, database and set amount of computing power and memory, so a busy neighbour can't slow yours down or reach your files.",
  ],
  [
    "What happens if a backup fails?",
    "It's tried again ten minutes later. If it still fails, it lands on our list to fix. Your site keeps running either way.",
  ],
  [
    "How big can uploads be?",
    "Up to 64 MB a file on most sites. Community and Everything sites take up to 512 MB, for the videos members post.",
  ],
  [
    "Do you keep my backups if I leave?",
    "When a site is removed, its backups are kept for another 90 days, so it can be brought back if you change your mind.",
  ],
  [
    "Can I install my own plugins?",
    <>
      Yes. Your site is real WordPress. We look after the plugins every site comes with; ones you add, you update.{" "}
      <Link href="/included" className="underline">See what&apos;s included</Link>.
    </>,
  ],
  [
    "Who updates WordPress?",
    <>
      We do. <Link href="/updates" className="underline">How updates stay safe</Link>.
    </>,
  ],
];

export default function Hosting() {
  return (
    <>
      <JsonLd data={faqLd(FAQ)} />
      <PageHero
        drawing="server"
        side="technical"
        eyebrow="hosting and safety"
        title="Fast, safe hosting you never have to think about."
        lead="Your site runs on its own, it's backed up every night, and the padlock and speed settings are done before you log in. Here's exactly how, in plain words."
      />

      <ProblemFix soft items={PROBLEMS} eyebrow="why it matters" title="Hosting shouldn't be another job." />

      <section className="sec" aria-labelledby="h-facts">
        <div className="in">
          <SectionHead eyebrow="every site gets" title="Done for you before you write a word." id="h-facts" />
          <FactSheet facts={FACTS} />
        </div>
      </section>

      <section className="sec soft" aria-labelledby="h-sizes">
        <div className="in">
          <SectionHead
            eyebrow="sizes"
            title="Start Small, move up any time."
            lead="Each size gets its own share of the machine, sized from load tests. Move up when your site gets busier."
            id="h-sizes"
          />
          <PlainTable
            label="Site sizes"
            head={["", "Computing power", "Memory", "Storage", "Emails a month", "Good for"]}
            rows={SIZES.map((s) => [s.name, s.cpu, s.memory, s.storage, s.emails, s.goodFor])}
          />
        </div>
      </section>

      <section className="sec" aria-labelledby="h-backups">
        <div className="in">
          <SectionHead
            eyebrow="backups"
            title="A backup only counts if it restores."
            lead="So we restore one every day to prove it."
            id="h-backups"
          />
          <Flow steps={BACKUPS} />
          <div className="mx-auto mt-12 max-w-[360px]">
            <VideoRow videos={VIDEOS} />
          </div>
        </div>
      </section>

      <section className="sec soft" aria-labelledby="h-faq">
        <div className="in">
          <SectionHead drawing="question" title="Questions about hosting" id="h-faq" />
          <Questions items={FAQ} firstOpen />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
