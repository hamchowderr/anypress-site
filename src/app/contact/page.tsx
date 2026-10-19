import type { Metadata } from "next";
import Link from "next/link";
import { Accent, PageHero } from "@/components/ui";
import { ACCOUNT_URL, CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about AnyPress, agency accounts or API access.",
};

const TOPICS = [
  ["Choosing a site type", "Tell us what you're building and we'll point you to the right one."],
  ["Agency accounts", "Sell AnyPress sites under your own brand."],
  ["API access", "Create sites from your own product."],
  ["Something else", "Bigger projects, partnerships, press."],
];

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s <Accent>talk.</Accent>
          </>
        }
        lead="Questions about AnyPress, agency accounts or API access? Send us a note."
      >
        <div className="mt-9 flex flex-wrap gap-3">
          {CONTACT_EMAIL ? (
            <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-ribbon">
              {CONTACT_EMAIL}
            </a>
          ) : (
            <span className="btn btn-ghost cursor-default">Email address coming soon</span>
          )}
          <a href={ACCOUNT_URL} className="btn btn-ghost">
            Already a customer? Sign in
          </a>
        </div>
      </PageHero>

      <section className="band-paper py-20">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {TOPICS.map(([title, body]) => {
            const href = CONTACT_EMAIL
              ? `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`AnyPress: ${title}`)}`
              : undefined;
            const inner = (
              <>
                <h2 className="font-display text-2xl font-bold">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-on-paper-muted">{body}</p>
              </>
            );
            return href ? (
              <a key={title} href={href} className="rounded-3xl border border-paper-line bg-white p-6 hover:border-[#d9481f]">
                {inner}
              </a>
            ) : (
              <div key={title} className="rounded-3xl border border-paper-line bg-white p-6">
                {inner}
              </div>
            );
          })}
        </div>
        <p className="mx-auto mt-10 max-w-7xl px-4 text-sm text-on-paper-muted sm:px-6">
          Looking for answers first? Try the <Link href="/#faq" className="underline underline-offset-4">questions on the homepage</Link>.
        </p>
      </section>
    </>
  );
}
