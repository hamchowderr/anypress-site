"use client";

import { useState } from "react";
import { Drawing } from "@/components/Drawing";
import { SITE_TYPES, SIZES, volumePercent, type SiteTypeId } from "@/lib/site";

const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

// What sellers often charge for a looked-after website, as a starting point for the slider.
const SUGGESTED: Record<SiteTypeId, number> = { website: 49, bookings: 79, store: 99, community: 129, everything: 249 };

/**
 * For sellers: how many client sites, what you charge each month, and what you keep after paying AnyPress.
 * Seller prices are the normal prices with the volume saving; resellers get wholesale prices, so they'd keep more.
 */
export function EarningsCalculator() {
  const [typeId, setTypeId] = useState<SiteTypeId>("website");
  const [size, setSize] = useState("Small");
  const [clients, setClients] = useState(10);
  const [charge, setCharge] = useState(SUGGESTED.website);

  const t = SITE_TYPES.find((x) => x.id === typeId)!;
  const s = SIZES.find((x) => x.name === size)!;
  const ours = t.from * s.times * (1 - volumePercent(clients) / 100);
  const min = Math.ceil(t.from * s.times);
  const price = Math.max(charge, min);
  const income = price * clients;
  const cost = ours * clients;
  const keep = income - cost;

  const pick = (id: SiteTypeId) => {
    setTypeId(id);
    setCharge(Math.max(SUGGESTED[id], SITE_TYPES.find((x) => x.id === id)!.from * s.times));
  };

  return (
    <div className="calc">
      <div className="calc-inputs">
        <fieldset>
          <legend>1. What do you sell your clients?</legend>
          <div className="calc-types">
            {SITE_TYPES.map((x) => (
              <button key={x.id} type="button" aria-pressed={x.id === typeId} onClick={() => pick(x.id)}>
                <Drawing name={x.drawing} still className="w-14" />
                <span>{x.short}</span>
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>2. Size</legend>
          <div className="calc-seg">
            {SIZES.map((x) => (
              <button key={x.name} type="button" aria-pressed={x.name === size} onClick={() => setSize(x.name)}>
                <b>{x.name}</b>
                <small>{money(t.from * x.times)} / month</small>
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>
            3. How many clients? <output className="calc-count">{clients}</output>
          </legend>
          <input type="range" min={3} max={100} value={clients} onChange={(e) => setClients(Number(e.target.value))} aria-label="Number of client sites" />
        </fieldset>
        <fieldset>
          <legend>
            4. What do you charge each client a month? <output className="calc-count">{money(price)}</output>
          </legend>
          <input
            type="range"
            min={min}
            max={Math.max(min * 6, 300)}
            step={1}
            value={price}
            onChange={(e) => setCharge(Number(e.target.value))}
            aria-label="Your monthly price per client"
          />
        </fieldset>
      </div>

      <div className="calc-result" aria-live="polite">
        <span className="eyebrow">what you keep</span>
        <p className="calc-big">
          {money(keep)}
          <small> / month</small>
        </p>
        <dl className="calc-sum">
          <div>
            <dt>Your clients pay you</dt>
            <dd>{money(income)}</dd>
          </div>
          <div>
            <dt>
              You pay AnyPress{volumePercent(clients) > 0 && <> (with {volumePercent(clients)}% off)</>}
            </dt>
            <dd>−{money(cost)}</dd>
          </div>
          <div className="total">
            <dt>You keep, every year</dt>
            <dd>{money(keep * 12)}</dd>
          </div>
        </dl>
        <p className="calc-fine">
          An estimate at seller prices, before your payment company&apos;s fees and taxes. Resellers pay wholesale prices, so they keep
          more. We build, host and look after every one of these sites.
        </p>
      </div>
    </div>
  );
}
