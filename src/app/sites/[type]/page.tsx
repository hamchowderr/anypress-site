import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { Drawing, type DrawingName } from "@/components/Drawing";
import { BrowserShot, PhoneShot } from "@/components/Shots";
import { ProblemFix } from "@/components/ProblemFix";
import { Tick } from "@/components/Tick";
import { Vignette } from "@/components/Vignette";
import { WhoChip } from "@/components/WhoChip";
import { CtaBand, Questions, SectionHead, SidePill } from "@/components/ui";
import { SITE_DETAILS } from "@/lib/siteDetails";
import { SITE_TYPES, SIZES, planUrl, startUrl } from "@/lib/site";

export function generateStaticParams() {
  return SITE_TYPES.map((t) => ({ type: t.id }));
}

export async function generateMetadata({ params }: PageProps<"/sites/[type]">): Promise<Metadata> {
  const { type } = await params;
  const t = SITE_TYPES.find((s) => s.id === type);
  return t ? { title: t.name, description: t.pitch } : {};
}

export default async function SiteTypePage({ params }: PageProps<"/sites/[type]">) {
  const { type } = await params;
  const t = SITE_TYPES.find((s) => s.id === type);
  if (!t) notFound();
  const d = SITE_DETAILS[t.id];
  const others = SITE_TYPES.filter((s) => s.id !== t.id);
  const ex = t.example;
  const kind = t.short.toLowerCase();

  const steps: [DrawingName, string, string][] = [
    ["pick", "Pick a size and pay", "Small, Medium or Large. Monthly or yearly."],
    ["tools", `We build your ${kind} site`, "Ready in minutes, with every tool switched on."],
    ["words", "Make it yours", `Add ${d.yourPart}.`],
    ["open", "Open your doors", "Share your link. We keep it running from here."],
  ];

  return (
    <>
      <section className="in type-hero" aria-labelledby="h-type">
        <div className="type-hero-text">
          <SidePill side="owners" />
          <span className="eyebrow">{t.name.toLowerCase()}</span>
          <h1 id="h-type">{t.headline}</h1>
          <p className="lead">{t.pitch}</p>
          <div className="ctas !justify-start">
            <a href={startUrl(t)} className="btn btn-ink">
              Start your {kind} site →
            </a>
            <a href="#sizes" className="btn btn-paper">
              See prices
            </a>
          </div>
          <ul className="checks !justify-start">
            <li>
              <Tick />
              From ${t.from} a month
            </li>
            <li>
              <Tick />
              No cut of your sales
            </li>
            <li>
              <Tick />
              30-day money-back
            </li>
          </ul>
          <p className="made-for">
            <b>Made for</b>
            {t.idealFor.map((x) => (
              <WhoChip key={x} label={x} />
            ))}
          </p>
        </div>
        <div className="type-hero-shot">
          <Drawing name={t.drawing} className="peek" />
          <div className="relative -rotate-[0.8deg] pr-8 pb-6 sm:pr-12">
            <BrowserShot example={ex} />
            <PhoneShot example={ex} className="absolute right-0 bottom-0 w-[22%] max-w-[130px]" />
          </div>
        </div>
      </section>

      <section className="in try-strip" aria-label="Try the example site">
        <div>
          <span className="hand">try it yourself</span>
          <b>{ex.name}</b>
          <span className="text-ink-soft">is a made-up business on a real AnyPress {kind} site.</span>
        </div>
        <ul>
          {ex.tryIt.map((x) => (
            <li key={x}>
              <Tick />
              {x}
            </li>
          ))}
        </ul>
        <a href={ex.url} target="_blank" rel="noopener" className="btn btn-honey !py-2.5">
          Open the example ↗
        </a>
      </section>

      <ProblemFix soft items={d.problems} eyebrow="sound familiar?" title={`What gets in the way, and how a ${kind} site fixes it.`} />

      <section className="sec in" aria-labelledby="h-does">
        <SectionHead eyebrow="what it does" title="What it does for you." id="h-does" />
        <div className="yours">
          {t.features.map((f, i) => (
            <div key={f.title}>
              <Drawing name={d.featureDrawings[i]} />
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sec soft" aria-labelledby="h-can">
        <div className="in">
          <SectionHead
            eyebrow="the full list"
            title="Everything you can do with it."
            lead="All of it is switched on when your site arrives. Nothing extra to buy."
            id="h-can"
          />
          <ul className="can-groups">
            {d.can.map((g) => (
              <li key={g.title} data-replay>
                <Vignette name={g.scene} />
                <h3>{g.title}</h3>
                <ul>
                  {g.items.map((x) => (
                    <li key={x}>
                      <Tick />
                      {x}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-ink-soft">
            Plus on every site: a copy saved every night, security fixes applied for you, the padlock and your own domain.{" "}
            <Link href="/included" className="font-bold text-ink underline">
              The tools by name
            </Link>
          </p>
        </div>
      </section>

      <section className="sec in" aria-labelledby="h-steps">
        <SectionHead eyebrow="from order to open" title="What happens when you buy." id="h-steps" />
        <ol className="flow">
          {steps.map(([dr, title, sub], i) => (
            <li key={title}>
              <Drawing name={dr} />
              <b>
                {i + 1}. {title}
              </b>
              <span>{sub}</span>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-center">
          <Link href="/how-it-works" className="inline-block py-1 font-bold underline underline-offset-4">
            See the whole system behind it →
          </Link>
        </p>
      </section>

      <section id="sizes" className="sec soft scroll-mt-20" aria-labelledby="h-sizes">
        <div className="in">
          <SectionHead
            eyebrow="pick a size"
            title={`${t.name} prices.`}
            lead="Same tools in every size. A bigger size gives your site more room, for when it gets busy."
            id="h-sizes"
          />
          <ul className="size-cards">
            {SIZES.map((s) => (
              <li key={s.name} className={s.times === 1 ? "pick-me" : ""}>
                {s.times === 1 && <span className="hand">most start here</span>}
                <h3>{s.name}</h3>
                <p className="good">{s.goodFor}</p>
                <p className="amt">
                  ${t.from * s.times}
                  <small> / month</small>
                </p>
                <p className="yr">or ${(t.from * s.times * 10).toLocaleString("en-US")} a year, two months free</p>
                <dl>
                  {[
                    ["Computing power", s.cpu],
                    ["Storage", s.storage],
                    ["Emails a month", s.emails],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
                <a href={planUrl(t, s.name)} className={`btn ${s.times === 1 ? "btn-ink" : "btn-paper"} w-full`}>
                  Start with {s.name}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-ink-soft">
            You pay on our shop, and you can get your money back within 30 days. Three or more sites? Every site saves 10 to 30%.{" "}
            <Link href="/pricing#calculator" className="font-bold text-ink underline">
              Work out your price
            </Link>
          </p>
        </div>
      </section>

      <section className="sec in" aria-labelledby="h-q">
        <SectionHead drawing="question" eyebrow="good to know" title={`Questions about ${t.name.toLowerCase()} sites`} id="h-q" />
        <Questions items={d.questions} firstOpen />
      </section>

      <section className="sec soft" aria-labelledby="h-other">
        <div className="in">
          <SectionHead eyebrow="or" title="Building something else?" id="h-other" />
          <div className="types fit" style={{ "--n": others.length } as CSSProperties}>
            {others.map((o) => (
              <Link key={o.id} className="type" href={`/sites/${o.id}`}>
                <Drawing name={o.drawing} />
                <h3>{o.name}</h3>
                <p>{o.pitch}</p>
                <div className="price">
                  ${o.from} <small>/ month</small>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={`Ready for your ${kind} site?`}
        body="It's ready to use the same day, and we look after it from there. Not for you? Get your money back within 30 days."
        href={startUrl(t)}
        label={`Start your ${kind} site`}
        drawings={[t.drawing, "open", "thirty"]}
      />
    </>
  );
}
