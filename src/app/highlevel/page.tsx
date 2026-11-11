import type { Metadata } from "next";
import Link from "next/link";
import { Drawing, type DrawingName } from "@/components/Drawing";
import { CtaBand, PageHero, Questions, SectionHead } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, faqLd, pageMeta } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site";
import { tryType } from "@/lib/try";

// For agencies on HighLevel. HighLevel is not a competitor: its agencies are customers, and AnyPress adds the
// WordPress website to what they already sell. Keep it a "works with" page, never a "vs" page.
export const metadata: Metadata = pageMeta({
  path: "/highlevel",
  title: "AnyPress for HighLevel agencies",
  card: "Works with HighLevel",
  description:
    "Keep HighLevel for your clients' contacts, texts and inbox. AnyPress adds a real WordPress website to every sub-account, created from a workflow and looked after for you.",
});

const HIGHLEVEL_DOC = "https://shop.anypress.io/docs/use-anypress-in-highlevel/";
const EARLY_ACCESS = `mailto:${CONTACT_EMAIL}?subject=AnyPress%20for%20HighLevel`;

const BENEFITS: [DrawingName, string, string][] = [
  ["plug", "A site from a workflow", "Add the AnyPress action to any HighLevel workflow, and a new sub-account comes with its own website."],
  ["nametag", "Your brand, your prices", "Clients see your name, not ours. You set what they pay."],
  ["server", "Nothing to host", "Every site gets its own space, a copy saved every night and security fixes, without you running servers."],
  ["website", "Real WordPress", "A store, bookings or courses when a client outgrows a funnel page, and a site they can keep."],
];

const FAQ: [string, string][] = [
  [
    "Do I have to stop using HighLevel?",
    "No. Keep HighLevel for contacts, texts, your inbox and your workflows. AnyPress adds the WordPress website next to it.",
  ],
  [
    "Can a site's forms and bookings reach HighLevel?",
    "Yes. AnyPress connects to HighLevel, so people who book or write in on the website can land in that sub-account's contacts.",
  ],
  [
    "What can a workflow do?",
    "Create a site, look one up, and suspend or resume it, so a site follows the client's subscription without anyone logging in.",
  ],
  ["Is it ready now?", "The HighLevel app is in early access. Email us and we'll set your agency up."],
];

export default function HighLevelPage() {
  return (
    <>
      <JsonLd data={[faqLd(FAQ), breadcrumbLd([["AnyPress for HighLevel", "/highlevel"]])]} />
      <PageHero
        side="technical"
        drawing="plug"
        eyebrow="for HighLevel agencies"
        title="Keep HighLevel. Give every client a real WordPress website."
        lead="HighLevel runs your clients' contacts, texts and inbox. AnyPress adds the website: a real WordPress site for every sub-account, created from a workflow and looked after for you."
      >
        <div className="ctas mt-8">
          <a href={EARLY_ACCESS} className="btn btn-ink">
            Get early access →
          </a>
          <Link href={tryType("highlevel")} className="btn btn-paper">
            Try one in your browser
          </Link>
          <a href={HIGHLEVEL_DOC} className="btn btn-paper">
            See how it connects
          </a>
        </div>
      </PageHero>

      <section className="sec soft">
        <div className="in">
          <SectionHead eyebrow="works with HighLevel" title="The website your HighLevel clients are missing." />
          <ul className="cards">
            {BENEFITS.map(([d, title, body]) => (
              <li key={title} className="!basis-[250px]">
                <Drawing name={d} />
                {title}
                <small>{body}</small>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center">
            <Link href="/automate" className="inline-block py-1 font-bold underline underline-offset-4">
              See every way to create sites automatically →
            </Link>
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="in">
          <SectionHead drawing="question" title="Questions" />
          <Questions items={FAQ} firstOpen />
        </div>
      </section>

      <CtaBand
        eyebrow="ready?"
        title="Add websites to what you already sell."
        body="Apply in a few minutes. We read every application and email you back."
        href="/sell"
        label="Apply to sell websites"
        drawings={["sell", "plug", "website"]}
      />
    </>
  );
}
