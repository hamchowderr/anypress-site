import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui";
import { ACCOUNT_URL, CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about AnyPress, agency accounts or creating sites from your own app.",
};

const TOPICS = [
  ["Choosing a site", "Tell us what you're building and we'll point you to the right box."],
  ["Selling sites to clients", "Agency accounts, under your own name."],
  ["Creating sites from your app", "Access for your developers."],
  ["Something else", "Bigger projects, partnerships, press."],
];

export default function Contact() {
  return (
    <>
      <PageHero band="orange" title="Ask us anything." lead="Questions about AnyPress, selling sites to your clients, or creating sites from your own app? Send us a note.">
        <div className="mt-9 flex flex-wrap gap-3">
          {CONTACT_EMAIL && (
            <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-ink text-lg">
              {CONTACT_EMAIL}
            </a>
          )}
          <a href={ACCOUNT_URL} className="btn btn-paper text-lg">
            Already a customer? Sign in
          </a>
        </div>
      </PageHero>

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <ul className="grid border-t-[2.5px] border-ink md:grid-cols-2 md:gap-x-14">
            {TOPICS.map(([title, body]) => (
              <li key={title} className="border-b-[2.5px] border-ink py-7">
                {CONTACT_EMAIL ? (
                  <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`AnyPress: ${title}`)}`} className="group block">
                    <span className="block text-xl font-bold group-hover:underline">{title}</span>
                    <span className="mt-1 block text-lg text-ink-soft">{body}</span>
                  </a>
                ) : (
                  <>
                    <span className="block text-xl font-bold">{title}</span>
                    <span className="mt-1 block text-lg text-ink-soft">{body}</span>
                  </>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-lg text-ink-soft">
            Looking for a quick answer? Try the{" "}
            <Link href="/#faq" className="font-bold text-ink underline">
              questions on the homepage
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
