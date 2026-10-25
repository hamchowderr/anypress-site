import type { Metadata } from "next";
import { type Problem, ProblemFix } from "@/components/ProblemFix";
import { PageHero } from "@/components/ui";
import { ApplicationForm } from "./ApplicationForm";

export const metadata: Metadata = {
  title: "Sell websites with AnyPress",
  description: "Apply to sell WordPress websites to your own clients, hosted and kept running by AnyPress.",
};

const STEPS = [
  {
    title: "Apply",
    body: "Tell us about your business and who you build websites for. It takes two minutes.",
  },
  {
    title: "We review it",
    body: "We look at every application ourselves and email you when you're approved.",
  },
  {
    title: "Start selling",
    body: "Sign in, set up your shop, and sell your first website. There's no minimum.",
  },
];

const WHO = ["Freelance web designers", "Small agencies", "Niche site sellers", "Anyone whose clients ask for a website"];

const PROBLEMS: Problem[] = [
  {
    problem: ["You get paid once", "You build a site, send the invoice, and next month you need a new project to get paid."],
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
    problem: ["Upkeep eats your weekends", "Security fixes, backups and the odd emergency, for every site you've ever built."],
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
        title="Sell websites with AnyPress."
        lead="Sell websites to your clients under your own name. We host every site, keep it backed up and apply security fixes, and you pay per site with lower prices as you grow."
      />

      <ProblemFix soft who={WHO} items={PROBLEMS} title="Selling websites shouldn't mean running a hosting company." />

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
