"use client";

import Link from "next/link";
import { useState } from "react";
import { Drawing } from "@/components/Drawing";
import { SITE_TYPES, SIZES, WHOLESALE_PERCENT, nextTier, volumePercent, type SiteTypeId } from "@/lib/site";

const money = (n: number) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: Number.isInteger(Math.round(n * 100) / 100) ? 0 : 2, maximumFractionDigits: 2 })}`;
const cents = (n: number) => Math.round(n * 100) / 100;

// What sellers often charge for a looked-after Small site, as a starting point for the price slider. A bigger size adds
// what the bigger size costs, so the suggested margin stays the same.
const SUGGESTED: Record<SiteTypeId, number> = { website: 49, bookings: 79, store: 99, community: 129, everything: 249 };
const suggested = (id: SiteTypeId, times: number) => SUGGESTED[id] + SITE_TYPES.find((x) => x.id === id)!.from * (times - 1);

type Account = "seller" | "reseller";

/** What one site costs you a month: the list price for its type and size, less the seller's volume saving or the reseller's wholesale discount. */
function costPerSite(account: Account, list: number, sites: number): number {
  const percent = account === "reseller" ? WHOLESALE_PERCENT : volumePercent(sites);
  return cents((list * (100 - percent)) / 100);
}

/**
 * What a seller or reseller keeps each month: the clients' payments less what AnyPress charges for their sites.
 * Uses the shop's live plan prices (lib/site.ts), the volume tiers and the wholesale discount, so it changes with them.
 */
export function EarningsCalculator({ start = "seller" }: { start?: Account }) {
  const [account, setAccount] = useState<Account>(start);
  const [typeId, setTypeId] = useState<SiteTypeId>("website");
  const [size, setSize] = useState("Small");
  const [clients, setClients] = useState(10);
  const [charge, setCharge] = useState(SUGGESTED.website);

  const t = SITE_TYPES.find((x) => x.id === typeId)!;
  const s = SIZES.find((x) => x.name === size)!;
  const list = t.from * s.times;
  const min = Math.ceil(list);
  const price = Math.max(charge, min);

  const figures = (a: Account) => {
    const cost = costPerSite(a, list, clients);
    return { cost, perSite: cents(price - cost), month: cents((price - cost) * clients) };
  };
  const mine = figures(account);
  const other = figures(account === "seller" ? "reseller" : "seller");
  const seller = account === "seller" ? mine : other;
  const reseller = account === "reseller" ? mine : other;
  const percent = account === "reseller" ? WHOLESALE_PERCENT : volumePercent(clients);
  const next = account === "seller" ? nextTier(clients) : undefined;

  const pickType = (id: SiteTypeId) => {
    setTypeId(id);
    setCharge(suggested(id, s.times));
  };
  const pickSize = (name: string) => {
    const times = SIZES.find((x) => x.name === name)!.times;
    setSize(name);
    setCharge(suggested(typeId, times));
  };

  return (
    <div className="calc-wrap">
      <div className="calc">
        <div className="calc-inputs">
          <fieldset>
            <legend>1. How do you sell?</legend>
            <div className="calc-seg two">
              <button type="button" aria-pressed={account === "seller"} onClick={() => setAccount("seller")}>
                <b>Seller</b>
                <small>One storefront. Pay per site, 10 to 30% off as you grow.</small>
              </button>
              <button type="button" aria-pressed={account === "reseller"} onClick={() => setAccount("reseller")}>
                <b>Reseller</b>
                <small>Several brands. {WHOLESALE_PERCENT}% off every site, one monthly bill.</small>
              </button>
            </div>
          </fieldset>
          <fieldset>
            <legend>2. What do you sell your clients?</legend>
            <div className="calc-types">
              {SITE_TYPES.map((x) => (
                <button key={x.id} type="button" aria-pressed={x.id === typeId} onClick={() => pickType(x.id)}>
                  <Drawing name={x.drawing} still className="w-14" />
                  <span>{x.short}</span>
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>3. Size</legend>
            <div className="calc-seg">
              {SIZES.map((x) => (
                <button key={x.name} type="button" aria-pressed={x.name === size} onClick={() => pickSize(x.name)}>
                  <b>{x.name}</b>
                  <small>{money(t.from * x.times)} / month list</small>
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>
              4. How many client sites? <output className="calc-count">{clients}</output>
            </legend>
            <input type="range" min={1} max={100} value={clients} onChange={(e) => setClients(Number(e.target.value))} aria-label="Number of client sites" />
            <div className="calc-ticks" aria-hidden="true">
              <span>1</span>
              <span>100</span>
            </div>
          </fieldset>
          <fieldset>
            <legend>
              5. What does each client pay you a month? <output className="calc-count">{money(price)}</output>
            </legend>
            <input
              type="range"
              min={min}
              max={Math.max(min * 6, 300 * s.times)}
              step={1}
              value={price}
              onChange={(e) => setCharge(Number(e.target.value))}
              aria-label="Your monthly price per client"
            />
            <div className="calc-ticks" aria-hidden="true">
              <span>{money(min)}</span>
              <span>{money(Math.max(min * 6, 300 * s.times))}</span>
            </div>
          </fieldset>
        </div>

        <div className="calc-result" aria-live="polite">
          <span className="eyebrow">what you keep as a {account}</span>
          <p className="calc-big">
            {money(mine.month)}
            <small> / month</small>
          </p>
          <p className="calc-line">
            {money(mine.perSite)} on each site, {money(mine.month * 12)} a year.
          </p>
          <dl className="calc-sum">
            <div>
              <dt>
                {clients} {clients === 1 ? "client pays" : "clients pay"} you {money(price)} each
              </dt>
              <dd>{money(price * clients)}</dd>
            </div>
            <div>
              <dt>
                You pay AnyPress {money(mine.cost)} a site
                <small className="calc-why">
                  {money(list)} list
                  {percent > 0
                    ? `, less ${percent}% ${account === "reseller" ? "wholesale" : "volume saving"}`
                    : ", no volume saving below 3 sites"}
                </small>
              </dt>
              <dd>−{money(mine.cost * clients)}</dd>
            </div>
            <div className="total">
              <dt>You keep each month</dt>
              <dd>{money(mine.month)}</dd>
            </div>
          </dl>
          {next && (
            <p className="calc-next">
              Reach {next.sites} sites and every site costs {next.percent}% less.
            </p>
          )}

          <table className="calc-compare">
            <caption>Seller and reseller, at these numbers</caption>
            <thead>
              <tr>
                <th scope="col" />
                <th scope="col">You pay a site</th>
                <th scope="col">You keep a month</th>
              </tr>
            </thead>
            <tbody>
              <tr aria-current={account === "seller" ? "true" : undefined}>
                <th scope="row">Seller</th>
                <td>{money(seller.cost)}</td>
                <td>{money(seller.month)}</td>
              </tr>
              <tr aria-current={account === "reseller" ? "true" : undefined}>
                <th scope="row">Reseller</th>
                <td>{money(reseller.cost)}</td>
                <td>{money(reseller.month)}</td>
              </tr>
            </tbody>
          </table>

          <p className="calc-fine">
            US dollars, before your payment company&apos;s fees and taxes. You set your own prices and your clients pay you directly; we
            build, host and look after every site. Sellers&apos; savings count all their live sites. Resellers are for running several brands,{" "}
            <Link href="/resellers" className="underline">
              see how they differ
            </Link>
            . Only want to recommend us? Affiliates earn 30% of a new customer&apos;s first payment,{" "}
            <Link href="/affiliates" className="underline">
              see affiliates
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
