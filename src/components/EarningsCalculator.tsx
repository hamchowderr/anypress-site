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
const typeOf = (id: SiteTypeId) => SITE_TYPES.find((x) => x.id === id)!;
const timesOf = (size: string) => SIZES.find((x) => x.name === size)!.times;
const suggested = (id: SiteTypeId, size: string) => SUGGESTED[id] + typeOf(id).from * (timesOf(size) - 1);

type Account = "seller" | "reseller";

/** The discount off list: the seller's volume saving for this many sites, or the reseller's wholesale discount. */
const discount = (account: Account, sites: number) => (account === "reseller" ? WHOLESALE_PERCENT : volumePercent(sites));

/** One account's numbers: what a site costs it, what it keeps on each and what it keeps a month. */
function figures(account: Account, list: number, price: number, sites: number) {
  const cost = cents((list * (100 - discount(account, sites))) / 100);
  return { cost, perSite: cents(price - cost), month: cents((price - cost) * sites) };
}

type Figures = ReturnType<typeof figures>;

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

  const list = typeOf(typeId).from * timesOf(size);
  const min = Math.ceil(list);
  const price = Math.max(charge, min);
  const pickType = (id: SiteTypeId) => {
    setTypeId(id);
    setCharge(suggested(id, size));
  };
  const pickSize = (name: string) => {
    setSize(name);
    setCharge(suggested(typeId, name));
  };

  return (
    <div className="calc-wrap">
      <div className="calc">
        <div className="calc-inputs">
          <AccountPicker account={account} onPick={setAccount} />
          <TypePicker typeId={typeId} onPick={pickType} />
          <SizePicker typeId={typeId} size={size} onPick={pickSize} />
          <Slider label="4. How many client sites?" min={1} max={100} value={clients} onChange={setClients} aria="Number of client sites" format={String} />
          <Slider
            label="5. What does each client pay you a month?"
            min={min}
            max={Math.max(min * 6, 300 * timesOf(size))}
            value={price}
            onChange={setCharge}
            aria="Your monthly price per client"
            format={money}
          />
        </div>
        <Result
          account={account}
          list={list}
          price={price}
          clients={clients}
          seller={figures("seller", list, price, clients)}
          reseller={figures("reseller", list, price, clients)}
        />
      </div>
    </div>
  );
}

function AccountPicker({ account, onPick }: { account: Account; onPick: (a: Account) => void }) {
  return (
    <fieldset>
      <legend>1. How do you sell?</legend>
      <div className="calc-seg two">
        <button type="button" aria-pressed={account === "seller"} onClick={() => onPick("seller")}>
          <b>Seller</b>
          <small>One storefront. Pay per site, 10 to 30% off as you grow.</small>
        </button>
        <button type="button" aria-pressed={account === "reseller"} onClick={() => onPick("reseller")}>
          <b>Reseller</b>
          <small>Several brands. {WHOLESALE_PERCENT}% off every site, one monthly bill.</small>
        </button>
      </div>
    </fieldset>
  );
}

function TypePicker({ typeId, onPick }: { typeId: SiteTypeId; onPick: (id: SiteTypeId) => void }) {
  return (
    <fieldset>
      <legend>2. What do you sell your clients?</legend>
      <div className="calc-types">
        {SITE_TYPES.map((x) => (
          <button key={x.id} type="button" aria-pressed={x.id === typeId} onClick={() => onPick(x.id)}>
            <Drawing name={x.drawing} still className="w-14" />
            <span>{x.short}</span>
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function SizePicker({ typeId, size, onPick }: { typeId: SiteTypeId; size: string; onPick: (name: string) => void }) {
  return (
    <fieldset>
      <legend>3. Size</legend>
      <div className="calc-seg">
        {SIZES.map((x) => (
          <button key={x.name} type="button" aria-pressed={x.name === size} onClick={() => onPick(x.name)}>
            <b>{x.name}</b>
            <small>{money(typeOf(typeId).from * x.times)} / month list</small>
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function Slider(props: { label: string; min: number; max: number; value: number; onChange: (n: number) => void; aria: string; format: (n: number) => string }) {
  return (
    <fieldset>
      <legend>
        {props.label} <output className="calc-count">{props.format(props.value)}</output>
      </legend>
      <input type="range" min={props.min} max={props.max} step={1} value={props.value} onChange={(e) => props.onChange(Number(e.target.value))} aria-label={props.aria} />
      <div className="calc-ticks" aria-hidden="true">
        <span>{props.format(props.min)}</span>
        <span>{props.format(props.max)}</span>
      </div>
    </fieldset>
  );
}

/** How the cost of one site is worked out, in words: "$12 list, less 20% volume saving". */
function costReason(account: Account, list: number, clients: number) {
  const percent = discount(account, clients);
  if (percent === 0) return `${money(list)} list, no volume saving below 3 sites`;
  return `${money(list)} list, less ${percent}% ${account === "reseller" ? "wholesale" : "volume saving"}`;
}

type ResultProps = { account: Account; list: number; price: number; clients: number; seller: Figures; reseller: Figures };

function Result({ account, list, price, clients, seller, reseller }: ResultProps) {
  const mine = account === "seller" ? seller : reseller;
  return (
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
          <dt>{`${clients} ${clients === 1 ? "client pays" : "clients pay"} you ${money(price)} each`}</dt>
          <dd>{money(price * clients)}</dd>
        </div>
        <div>
          <dt>
            You pay AnyPress {money(mine.cost)} a site
            <small className="calc-why">{costReason(account, list, clients)}</small>
          </dt>
          <dd>−{money(mine.cost * clients)}</dd>
        </div>
        <div className="total">
          <dt>You keep each month</dt>
          <dd>{money(mine.month)}</dd>
        </div>
      </dl>
      <NextTier account={account} clients={clients} />
      <Compare account={account} seller={seller} reseller={reseller} />
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
  );
}

/** For sellers: the next volume saving and when it starts. */
function NextTier({ account, clients }: { account: Account; clients: number }) {
  const next = nextTier(clients);
  if (account !== "seller" || !next) return null;
  return (
    <p className="calc-next">
      Reach {next.sites} sites and every site costs {next.percent}% less.
    </p>
  );
}

function Compare({ account, seller, reseller }: { account: Account; seller: Figures; reseller: Figures }) {
  const rows: [Account, string, Figures][] = [
    ["seller", "Seller", seller],
    ["reseller", "Reseller", reseller],
  ];
  return (
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
        {rows.map(([id, name, f]) => (
          <tr key={id} aria-current={account === id ? "true" : undefined}>
            <th scope="row">{name}</th>
            <td>{money(f.cost)}</td>
            <td>{money(f.month)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
