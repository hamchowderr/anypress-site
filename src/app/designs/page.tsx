import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Drawing, type DrawingName } from "@/components/Drawing";
import { CtaBand, PageHero, Questions, SectionHead } from "@/components/ui";
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

const BLOCKS: { title: string; body: string }[] = [
  { title: "Popup", body: "A box over the page after a few seconds, on scroll or when someone is about to leave. Good for a signup or an offer." },
  { title: "Carousel", body: "Slides that scroll sideways with arrows and dots, for reviews, projects, team members or photos." },
  { title: "Before and after", body: "Two photos of the same job with a handle to drag between them: a kitchen, a lawn, a haircut, a roof." },
  { title: "Countdown", body: "Days, hours and minutes left until an offer ends or an event starts." },
  { title: "Counter", body: "A big number that counts up as it comes into view, such as years in business or jobs done." },
  { title: "Star rating", body: "Your rating, how many reviews and where they're from, for example 4.9 out of 5 on Google." },
  { title: "Map", body: "Your address on a map with a pin and a link for directions." },
  { title: "Location finder", body: "All your branches next to a map. Visitors search by town or tap “Near me” to find the closest." },
  { title: "Notice bar", body: "One short line across the top, such as holiday hours or free delivery. Visitors can close it." },
  { title: "Call and book bar", body: "A bar along the bottom of phones with Call and Book buttons, so the main action is one tap away." },
  { title: "Age check", body: "Asks visitors to confirm their age before they see the site, for shops selling age-restricted goods." },
  { title: "And the usual pieces", body: "Headings, text, photos, buttons, columns, galleries and videos, all set up to follow your look." },
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
            lead="Each kit has its own colours, fonts, page layouts and sections. These are the home pages from each kit's example site."
            id="h-kits"
          />
          <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {KITS.map((k) => (
              <li key={k.slug}>
                <figure className="overflow-hidden rounded-[14px] border-[1.5px] border-ink bg-panel">
                  <div className="flex items-center gap-1.5 border-b-[1.5px] border-ink bg-paper-2 px-3 py-2" aria-hidden>
                    <span className="h-2 w-2 rounded-full border-[1.5px] border-ink" />
                    <span className="h-2 w-2 rounded-full border-[1.5px] border-ink" />
                    <span className="h-2 w-2 rounded-full border-[1.5px] border-ink" />
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/designs/${k.slug}.webp`}
                    alt={`The home page of an example site in the ${k.name} kit`}
                    width={960}
                    height={600}
                    loading="lazy"
                    className="block aspect-[16/10] h-auto w-full object-cover object-top"
                  />
                </figure>
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
            {BLOCKS.map((b) => (
              <li key={b.title} className="rounded-2xl border border-line bg-panel p-6">
                <h3 className="text-lg font-extrabold">{b.title}</h3>
                <p className="mt-1.5 leading-7 text-ink-soft">{b.body}</p>
              </li>
            ))}
          </ul>
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
