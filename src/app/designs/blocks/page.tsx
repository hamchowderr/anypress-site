import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Drawing, type DrawingName } from "@/components/Drawing";
import { FramedShot, TryLive } from "@/components/Shots";
import { CtaBand, PageHero, Questions, SectionHead } from "@/components/ui";
import { BLOCKS, blockPlayground } from "@/lib/blocks";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: "/designs/blocks",
  title: "Blocks",
  description:
    "Popups, carousels, before-and-after sliders, countdowns, maps, a location finder and more, on every AnyPress site. Try each one live in your browser.",
});

const BLOCKS_REPO = "https://github.com/hamchowderr/anypress-blocks";

const TRAITS: { drawing: DrawingName; title: string; body: string }[] = [
  {
    drawing: "paint",
    title: "They match your look",
    body: "Every block uses your site's colours, fonts and spacing, so it changes with your kit.",
  },
  {
    drawing: "thirty",
    title: "They keep pages quick",
    body: "A block's code only loads on the pages that use it. Pages without one carry nothing extra.",
  },
  {
    drawing: "open",
    title: "They work for everyone",
    body: "They work on phones and with a keyboard, and stay still for visitors who turn motion off.",
  },
];

const FAQ: [string, ReactNode][] = [
  [
    "How do I add one?",
    "Open a page in the editor, click the plus button and type the block's name, such as Popup or Countdown. Or ask your AI app to add one for you.",
  ],
  [
    "Do they cost more?",
    "No. Every block comes with every site, on every plan.",
  ],
  [
    "What happens when I click Try it live?",
    "A full WordPress site opens in your browser on that block's page, using WordPress Playground. Click around, open the editor, change anything. Nothing is installed and nothing is saved, and it can take a minute to open.",
  ],
  [
    "Can I use them on another WordPress site?",
    <>
      Yes. <a href={BLOCKS_REPO}>AnyPress Blocks</a> is a free, open source plugin that works with any theme.
    </>,
  ],
];

export default function Blocks() {
  return (
    <>
      <PageHero
        side="owners"
        drawing="tools"
        eyebrow="the blocks"
        title={
          <>
            Pieces that <mark>do something</mark>.
          </>
        }
        lead="Popups, sliders, countdowns, maps and more, ready to drop into any page of your site. Try each one live before you use it."
      >
        <div className="ctas mt-8">
          <a href={blockPlayground()} target="_blank" rel="noopener" className="btn btn-ink">
            Try them all live ↗
          </a>
          <Link href="/designs" className="btn btn-paper">
            See the designs
          </Link>
        </div>
      </PageHero>

      <section className="sec soft" aria-labelledby="h-blocks">
        <div className="in">
          <SectionHead
            eyebrow="every block"
            title="On every site, ready to use."
            lead="Each picture is the block working on an example page. Try it live to open that page in your browser."
            id="h-blocks"
          />
          <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {BLOCKS.map((b) => (
              <li key={b.slug} id={b.slug} className="scroll-mt-24">
                <FramedShot src={`/designs/blocks/${b.slug}.webp`} alt={`The ${b.title} block on an example page`} href={blockPlayground(b.slug)} />
                <h3 className="mt-4 text-xl font-extrabold">{b.title}</h3>
                <p className="mt-1 leading-7 text-ink-soft">{b.body}</p>
                <TryLive href={blockPlayground(b.slug)} label={`Try the ${b.title.toLowerCase()} live`} />
              </li>
            ))}
            <li className="flex flex-col justify-center rounded-[14px] border-[1.5px] border-dashed border-ink p-8 text-center">
              <Drawing name="note" still className="mx-auto w-20" />
              <h3 className="mt-4 text-xl font-extrabold">Missing one?</h3>
              <p className="mt-1 leading-7 text-ink-soft">Tell us what your site needs.</p>
              <Link href="/contact" className="mt-3 font-semibold underline underline-offset-4 hover:no-underline">
                Ask for a block
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="sec in" aria-labelledby="h-traits">
        <SectionHead eyebrow="built well" title="Made for real visitors." id="h-traits" />
        <ol className="steps">
          {TRAITS.map((t) => (
            <li key={t.title}>
              <Drawing name={t.drawing} />
              <div>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="sec soft" aria-labelledby="h-faq">
        <div className="in">
          <SectionHead eyebrow="questions" title="Good to know." id="h-faq" />
          <Questions items={FAQ} />
        </div>
      </section>

      <CtaBand drawings={["tools", "website", "store"]} />
    </>
  );
}
