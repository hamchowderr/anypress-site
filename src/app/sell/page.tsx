import type { Metadata } from "next";
import { ApplicationForm } from "./ApplicationForm";

export const metadata: Metadata = {
  title: "Sell websites with AnyPress",
  description: "Apply to sell WordPress websites to your own clients, hosted and kept running by AnyPress.",
};

const STEPS = [
  { title: "Apply", body: "Tell us about your business and who you build websites for. It takes two minutes." },
  { title: "We review it", body: "We look at every application ourselves and email you when you're approved." },
  { title: "Start selling", body: "Sign in, set up your shop, and sell your first websites. You can start with three." },
];

export default function Sell() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Sell websites with AnyPress</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Sell websites to your clients under your own name. We host every site, keep it backed up and up to date, and
        you pay per site with lower prices as you grow.
      </p>

      <ol className="mt-10 grid gap-8 sm:grid-cols-3">
        {STEPS.map((s, i) => (
          <li key={s.title}>
            <p className="text-sm text-muted">Step {i + 1}</p>
            <h2 className="mt-1 font-semibold">{s.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{s.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-12 rounded-lg border border-line bg-panel p-6 sm:p-8">
        <h2 className="text-xl font-semibold">Your application</h2>
        <ApplicationForm storeDomain={process.env.NEXT_PUBLIC_STORE_DOMAIN || "anypress.site"} />
      </div>
    </section>
  );
}
