"use client";

import { useState } from "react";
import { Drawing } from "@/components/Drawing";
import { SITE_TYPES, SIZES, nextTier, planUrl, volumePercent, type SiteTypeId } from "@/lib/site";

const money = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })}`;

/**
 * "What will it cost?": pick a kind of site, a size and how many sites, monthly or yearly. Shows the price per site,
 * the volume saving and how close the next saving is. Works out the same numbers the shop's cart does.
 */
export function PriceCalculator() {
  const [typeId, setTypeId] = useState<SiteTypeId>("store");
  const [size, setSize] = useState("Small");
  const [count, setCount] = useState(1);
  const [yearly, setYearly] = useState(false);

  const t = SITE_TYPES.find((x) => x.id === typeId)!;
  const s = SIZES.find((x) => x.name === size)!;
  const monthly = t.from * s.times;
  const listPrice = yearly ? monthly * 10 : monthly;
  const percent = volumePercent(count);
  const each = Math.round(listPrice * (1 - percent / 100) * 100) / 100;
  const total = Math.round(each * count * 100) / 100;
  const saved = Math.round((listPrice * count - total) * 100) / 100;
  const next = nextTier(count);
  const per = yearly ? "year" : "month";

  return (
    <div className="calc">
      <div className="calc-inputs">
        <fieldset>
          <legend>1. What are you building?</legend>
          <div className="calc-types">
            {SITE_TYPES.map((x) => (
              <button key={x.id} type="button" aria-pressed={x.id === typeId} onClick={() => setTypeId(x.id)}>
                <Drawing name={x.drawing} still className="w-14" />
                <span>{x.short}</span>
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>2. How big?</legend>
          <div className="calc-seg">
            {SIZES.map((x) => (
              <button key={x.name} type="button" aria-pressed={x.name === size} onClick={() => setSize(x.name)}>
                <b>{x.name}</b>
                <small>{x.goodFor}</small>
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>
            3. How many sites? <output className="calc-count">{count}</output>
          </legend>
          <input type="range" min={1} max={50} value={count} onChange={(e) => setCount(Number(e.target.value))} aria-label="Number of sites" />
          <div className="calc-ticks" aria-hidden>
            <span>1</span>
            <span>3 · save 10%</span>
            <span>10 · 20%</span>
            <span>25 · 30%</span>
            <span>50</span>
          </div>
        </fieldset>
        <fieldset>
          <legend>4. Pay monthly or yearly?</legend>
          <div className="calc-seg two">
            <button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)}>
              <b>Monthly</b>
              <small>Cancel any time</small>
            </button>
            <button type="button" aria-pressed={yearly} onClick={() => setYearly(true)}>
              <b>Yearly</b>
              <small>2 months free</small>
            </button>
          </div>
        </fieldset>
      </div>

      <div className="calc-result" aria-live="polite">
        <span className="eyebrow">your estimate</span>
        <p className="calc-big">
          {money(total)}
          <small> / {per}</small>
        </p>
        <p className="calc-line">
          {count} {t.short.toLowerCase()} {count === 1 ? "site" : "sites"}, {size}, at {money(each)} each
          {percent > 0 && <> (you save {percent}%)</>}
        </p>
        {saved > 0 && <p className="calc-save">You save {money(saved)} every {per}.</p>}
        {next && (
          <p className="calc-next">
            {next.sites - count} more {next.sites - count === 1 ? "site" : "sites"} and every site saves {next.percent}%.
          </p>
        )}
        <a href={planUrl(t, size)} className="btn btn-ink mt-5 w-full">
          Start with one {t.short.toLowerCase()} site →
        </a>
        <p className="calc-fine">
          Prices in US dollars. Savings apply when you have 3 or more live sites, and your existing sites move to the new price
          when they renew. The card company&apos;s fee on your own sales isn&apos;t included.
        </p>
      </div>
    </div>
  );
}
