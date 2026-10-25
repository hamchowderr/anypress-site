import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { PageHero, Questions } from "@/components/ui";
import { ACCOUNT_URL, CONTACT_EMAIL } from "@/lib/site";
import { faqLd, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = pageMeta({
  path: "/help",
  title: "Help with your AnyPress website",
  card: "Help",
  description: "How to sign in, open your site's WordPress editor, use your own domain, cancel a plan, and get a refund on AnyPress.",
});

const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <Link href={href} className="font-semibold text-ink underline">
    {children}
  </Link>
);

const SECTIONS: { title: string; items: [string, ReactNode][] }[] = [
  {
    title: "Your account",
    items: [
      [
        "How do I sign in?",
        <>
          Go to <A href="/account">Your websites</A> and choose Sign in. Use the email address you bought your plan with. If you
          don&apos;t know your password, choose &quot;Lost your password?&quot; on the sign-in page and we&apos;ll email you a link to set a new one.
        </>,
      ],
      [
        "How do I open my site's editor?",
        <>
          Sign in to <A href="/account">Your websites</A> and choose Log in to WordPress next to your site. It opens your site&apos;s
          WordPress dashboard already signed in, with no second password.
        </>,
      ],
      [
        "My site isn't ready yet. Is that normal?",
        "A new site is usually ready a few minutes after you pay. We email you when it is. If it's been more than an hour, email us and we'll look right away.",
      ],
    ],
  },
  {
    title: "Your domain",
    items: [
      [
        "What address does my site start with?",
        "Every site starts on a free address ending in anypress.site, with a secure (https) connection. You can keep it or switch to your own domain whenever you like.",
      ],
      [
        "How do I use my own domain?",
        <>
          Sign in to <A href="/account">Your websites</A>. Under &quot;Using your own domain&quot; you&apos;ll find the records to add
          where your domain is managed (the company you bought it from, or Cloudflare). Add them, then change your site&apos;s address on
          the <A href={ACCOUNT_URL}>account page</A>. The secure connection is set up for you, and the old address keeps working for a few
          minutes while it switches.
        </>,
      ],
    ],
  },
  {
    title: "Billing",
    items: [
      [
        "How do I cancel?",
        <>
          Sign in to <A href="/account">Your websites</A> and choose Manage plan next to the site, then cancel. Your site stays online
          until the end of the period you&apos;ve paid for, and you won&apos;t be charged again.
        </>,
      ],
      [
        "How do I get a refund?",
        <>
          Your first payment for a new plan is covered by our 30-day money-back guarantee. Email{" "}
          {CONTACT_EMAIL ? <a href={`mailto:${CONTACT_EMAIL}?subject=Refund`} className="font-semibold text-ink underline">{CONTACT_EMAIL}</a> : "us"}{" "}
          within 30 days with your account&apos;s email address and your site name. A refund ends the plan and takes the site offline, so
          export anything you want to keep first. The details are in our <A href="/refund-policy">refund policy</A>.
        </>,
      ],
      [
        "Can I change my plan or size?",
        <>
          Yes. <A href="/contact">Email us</A> with your site name and what you&apos;d like, and we&apos;ll switch it for you. The new price
          starts from your next renewal.
        </>,
      ],
    ],
  },
  {
    title: "Looking after your site",
    items: [
      [
        "Is my site backed up?",
        "Yes. We save a copy of every site each night and keep daily and weekly copies. If something goes wrong, email us and we'll bring it back.",
      ],
      [
        "Who looks after security fixes?",
        "We do. Security fixes for WordPress, its plugins and the server are applied for you, so you can get on with your business.",
      ],
    ],
  },
];

export default function Help() {
  return (
    <>
      <JsonLd data={faqLd(SECTIONS.flatMap((s) => s.items))} />
      <PageHero drawing="lifebuoy"
        eyebrow="Help"
        title="How can we help?"
        lead="Quick answers to the things people ask most. If yours isn't here, email us and a person will get back to you."
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/account" className="btn btn-ink">
            Sign in to your websites
          </Link>
          {CONTACT_EMAIL && (
            <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-paper">
              {CONTACT_EMAIL}
            </a>
          )}
        </div>
      </PageHero>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {SECTIONS.map((s) => (
          <section key={s.title} className="grid gap-6 py-8 lg:grid-cols-[1fr_1.7fr] lg:gap-10 [&_.faq]:m-0 [&_.faq]:w-full [&_.faq]:max-w-none">
            <h2 className="font-display text-2xl font-semibold">{s.title}</h2>
            <Questions items={s.items} />
          </section>
        ))}
      </div>
    </>
  );
}
