"use client";

import { useState } from "react";
import { SITE_TYPES } from "@/lib/site";

const input =
  "mt-1 block w-full rounded-md border border-line bg-bg px-3 py-2 text-fg focus:outline-none focus:ring-2 focus:ring-accent";
const money = (n: number) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: Number.isInteger(Math.round(n * 100) / 100) ? 0 : 2, maximumFractionDigits: 2 })}`;

function Num({ label, value, onChange, step = 1 }: { label: string; value: number; onChange: (n: number) => void; step?: number }) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input type="number" min={0} step={step} value={value} onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))} className={input} />
    </label>
  );
}

function Result({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="mt-8 divide-y divide-line border-y border-line">
      {rows.map(([k, v]) => (
        <div key={k} className="flex items-center justify-between gap-6 py-4">
          <dt className="text-ink-soft">{k}</dt>
          <dd className="font-display text-xl font-semibold">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

/** A year on a course platform (monthly fee plus a share of sales) next to a year on the Community plan. */
export function CourseCalculator() {
  const community = SITE_TYPES.find((t) => t.id === "community")!;
  const [sales, setSales] = useState(2000);
  const [fee, setFee] = useState(99);
  const [share, setShare] = useState(5);
  const platform = 12 * (fee + (sales * share) / 100);
  const ours = 12 * community.from;
  return (
    <div className="card p-6">
      <div className="grid gap-5 sm:grid-cols-3">
        <Num label="Your course sales per month ($)" value={sales} onChange={setSales} step={100} />
        <Num label="Platform fee per month ($)" value={fee} onChange={setFee} />
        <Num label="Share of each sale it takes (%)" value={share} onChange={setShare} step={0.5} />
      </div>
      <Result
        rows={[
          ["Your platform, per year", money(platform)],
          [`AnyPress ${community.name}, per year`, money(ours)],
          ["Difference per year", money(platform - ours)],
        ]}
      />
      <p className="mt-4 text-sm text-ink-soft">
        Card fees apply on both and aren&apos;t counted here. {community.name} starts at ${community.from} a month (Small size); bigger sizes cost more.
      </p>
    </div>
  );
}

const discount = (sites: number) => (sites >= 25 ? 0.3 : sites >= 10 ? 0.2 : sites >= 3 ? 0.1 : 0);

/** Monthly profit from reselling sites: the client price minus our per-site price after the volume discount. */
export function AgencyCalculator() {
  const [type, setType] = useState("website");
  const [sites, setSites] = useState(10);
  const [price, setPrice] = useState(99);
  const plan = SITE_TYPES.find((t) => t.id === type)!;
  const cost = plan.from * (1 - discount(sites));
  return (
    <div className="card p-6">
      <div className="grid gap-5 sm:grid-cols-3">
        <label className="block text-sm font-medium">
          Kind of site
          <select value={type} onChange={(e) => setType(e.target.value)} className={input}>
            {SITE_TYPES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} (${t.from})
              </option>
            ))}
          </select>
        </label>
        <Num label="Clients" value={sites} onChange={setSites} />
        <Num label="Your price per month ($)" value={price} onChange={setPrice} />
      </div>
      <Result
        rows={[
          ["You pay us per site", `${money(cost)} (${Math.round(discount(sites) * 100)}% off)`],
          ["You keep per site", money(price - cost)],
          ["Your profit per month", money(sites * (price - cost))],
          ["Your profit per year", money(12 * sites * (price - cost))],
        ]}
      />
      <p className="mt-4 text-sm text-ink-soft">Small size prices. Card fees on your clients&apos; payments aren&apos;t counted.</p>
    </div>
  );
}
