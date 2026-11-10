import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Drawing, type DrawingName } from "@/components/Drawing";
import { FramedShot, TryLive } from "@/components/Shots";
import { CtaBand, PageHero, Questions, SectionHead } from "@/components/ui";
import { BLOCKS, blockPlayground, kitPlayground } from "@/lib/blocks";
import { KITS } from "@/lib/kits";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: "/designs",
  title: "Designs",
  description:
    "Sixteen ready-made looks for different kinds of business, plus popups, countdowns, before-and-after sliders, maps and more. Switch your site's whole look in one click.",
});

const THEME_REPO = "https://github.com/hamchowderr/anypress-theme";
const BLOCKS_REPO = "https://github.com/hamchowderr/anypress-blocks";

const SWITCH: { drawing: DrawingName; title: string; body: ReactNode }[] = [
  {
    drawing: "paint",
    title: "Pick a look",
    body: "Open your site's design screen and click a kit. Colours, fonts and spacing change across every page at once.",
  },
  {
    drawing: "words",
    title: "Or ask your AI app",
    body: (
      <>
        Connect AnyPress to your <Link href="/ai">AI app</Link> and ask to see the designs. Each kit shows as a live
        preview of your own site, right in the chat, with a button to switch it on.
      </>
    ),
  },
  {
    drawing: "backup",
    title: "Change your mind",
    body: "Your old look is saved when you switch, so you can go straight back. Your words, photos and pages stay as they are.",
  },
];

const EXTRAS = [
  ...BLOCKS,
  { slug: "", title: "And the usual pieces", body: "Headings, text, photos, buttons, columns, galleries and videos, all set up to follow your look." },
];

const FAQ: [string, ReactNode][] = [
  [
    "Do I have to use a kit?",
    "No. Every site starts with the AnyPress theme's own look. Kits are there when you want one made for your kind of business.",
  ],
  [
    "Can I change the colours and fonts myself?",
    "Yes. Pick a kit, then change any colour or font in the design screen. Every page follows, because pages use the site's colours and fonts rather than fixed ones.",
  ],
  [
    "Will switching break my pages?",
    "No. A kit changes how things look, not what's on the page. Your text, photos, forms and shop stay where they are, and the old look is saved.",
  ],
  [
    "Do the extras cost more?",
    "No. Popups, countdowns, maps and the rest come with every site, on every plan.",
  ],
  [
    "What happens when I click Try it live?",
    "A full WordPress site with that kit opens in your browser, using WordPress Playground. Click around, open the editor, change anything. Nothing is installed and nothing is saved, and it can take a minute to open.",
  ],
  [
    "Can I use the designs on another WordPress site?",
    <>
      Yes. The <a href={THEME_REPO}>AnyPress theme</a> and the <a href={BLOCKS_REPO}>AnyPress Blocks plugin</a> are
      free and open source, for any WordPress site.
    </>,
  ],
];

export default function Designs() {
  return (
    <>
      <PageHero
        side="owners"
        drawing="paint"
        eyebrow="designs"
        title={
          <>
            Sixteen looks, <mark>one click</mark> to switch.
          </>
        }
        lead="Every site comes with ready-made looks for different kinds of business. Pick the one that fits, change the colours if you like, and your whole site follows."
      >
        <div className="ctas mt-8">
          <a href="#kits" className="btn btn-ink">
            See the looks →
          </a>
          <a href="#extras" className="btn btn-paper">
            See the extras
          </a>
        </div>
      </PageHero>

      <section className="sec soft scroll-mt-20" aria-labelledby="h-kits" id="kits">
        <div className="in">
          <SectionHead
            eyebrow="the kits"
            title="Made for your kind of business."
            lead="Each kit has its own colours, fonts, page layouts and sections. Try any of them live: the whole example site opens in your browser, ready to click around."
            id="h-kits"
          />
          <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {KITS.map((k) => (
              <li key={k.slug}>
                <FramedShot
                  src={`/designs/${k.slug}.webp`}
                  alt={`The home page of an example site in the ${k.name} kit`}
                  href={kitPlayground(k.slug)}
                />
                <div className="mt-4 flex items-center justify-between gap-3">
                  <h3 className="text-xl font-extrabold">{k.name}</h3>
                  <span className="flex shrink-0 -space-x-1.5" aria-label={`${k.name} colours`} role="img">
                    {k.colors.map((c) => (
                      <span
                        key={c}
                        className="h-5 w-5 rounded-full border-[1.5px] border-ink"
                        style={{ background: c }}
                      />
                    ))}
                  </span>
                </div>
                <p className="mt-1 text-ink-soft">{k.who}</p>
                <TryLive href={kitPlayground(k.slug)} label={`Try ${k.name} live`} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec in" aria-labelledby="h-switch">
        <SectionHead eyebrow="any time" title="Try a new look without starting over." id="h-switch" />
        <ol className="steps">
          {SWITCH.map((s, i) => (
            <li key={s.title}>
              <Drawing name={s.drawing} />
              <div>
                <h3>
                  {i + 1}. {s.title}
                </h3>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="sec soft scroll-mt-20" aria-labelledby="h-extras" id="extras">
        <div className="in">
          <SectionHead
            eyebrow="the extras"
            title="Pieces that do something."
            lead="Add them to any page. They match your look, work on phones, and only load on the pages that use them."
            id="h-extras"
          />
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {EXTRAS.map((b) => (
              <li key={b.title} className="rounded-2xl border border-line bg-panel p-6">
                <h3 className="text-lg font-extrabold">
                  {b.slug ? <Link href={`/designs/blocks#${b.slug}`} className="hover:underline">{b.title}</Link> : b.title}
                </h3>
                <p className="mt-1.5 leading-7 text-ink-soft">{b.body}</p>
              </li>
            ))}
          </ul>
          <div className="ctas mt-10 justify-center">
            <Link href="/designs/blocks" className="btn btn-ink">
              See them working →
            </Link>
            <a href={blockPlayground()} target="_blank" rel="noopener" className="btn btn-paper">
              Try them all live ↗
            </a>
          </div>
        </div>
      </section>

      <section className="sec in" aria-labelledby="h-faq">
        <SectionHead eyebrow="questions" title="Good to know." id="h-faq" />
        <Questions items={FAQ} />
      </section>

      <CtaBand drawings={["paint", "website", "store"]} />
    </>
  );
}
