import type { Metadata } from "next";
import { type Problem, ProblemFix } from "@/components/ProblemFix";
import { PageHero } from "@/components/ui";
import { ApplicationForm } from "./ApplicationForm";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: "/sell",
  title: "Sell websites with AnyPress",
  description:
    "Apply to sell WordPress websites to your own clients under your own name. Each order creates a finished site, and AnyPress hosts and looks after every one.",
});

const STEPS = [
  {
    title: "Apply",
    body: "Tell us about your business and who you build websites for. It takes two minutes.",
  },
  {
    title: "Book a short call",
    body: "We email you a link to book a call. We get to know your business, show you how selling works and agree how billing works, then approve your account.",
  },
  {
    title: "Start selling",
    body: "Sign in, set up your shop, and sell your first website. There's no minimum.",
  },
];

const WHO = ["Freelance web designers", "Small web design studios", "Niche site sellers", "Anyone whose clients ask for a website"];

const PROBLEMS: Problem[] = [
  {
    problem: [
      "Paying for every client's site piece by piece",
      "Hosting, a theme, plugin licences and an email service for every client, each with its own bill and renewal.",
    ],
    fix: ["One price per site, everything in", "Hosting, plugins, email, nightly copies and security fixes are in every site's price. Nothing else to buy."],
  },
  {
    problem: ["You get paid once, then start again at zero", "You build a site, send the invoice, and next month you need a new project to get paid."],
    fix: ["A monthly service", "Clients pay you every month for their site, at the prices you set."],
  },
  {
    problem: [
      "Hosting every client is a second job",
      "A hosting account, a renewal and a bill for every client, and you're the one they call.",
    ],
    fix: ["One login for every site", "Each order becomes its own website on our servers, and you see them all in one dashboard."],
  },
  {
    problem: ["One update breaks a client's site", "Everything stops working, and you hear it from your client before you know it's happened."],
    fix: ["We look after every site", "Security fixes applied for you and a copy saved every night, under your name, not ours."],
  },
];

export default function Sell() {
  return (
    <>
      <PageHero
        drawing="sell"
        side="technical"
        eyebrow="For sellers and resellers"
        title={
          <>
            Sell websites under your name and get paid every month. <mark>We set it all up</mark>.
          </>
        }
        lead="Tell us about your business below, then book a short call. We set up your storefront with you, then host every site, back it up every night and apply security fixes. Your price per site drops as you grow."
      />

      <ProblemFix soft who={WHO} items={PROBLEMS} title="Stop paying for every client's site one piece at a time." />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <ol className="grid gap-8 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="border-t border-line pt-6">
              <p className="font-display text-sm font-semibold text-accent">Step {i + 1}</p>
              <h2 className="font-display mt-2 text-xl font-semibold">{s.title}</h2>
              <p className="mt-1.5 leading-7 text-ink-soft">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="card mt-12 p-6 sm:p-10">
          <h2 className="font-display text-2xl font-semibold">Your application</h2>
          <ApplicationForm storeDomain={process.env.NEXT_PUBLIC_STORE_DOMAIN || "anypress.site"} />
        </div>
      </section>
    </>
  );
}
