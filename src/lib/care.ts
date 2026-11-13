import PRICES from "./pricing.json";
import { YEARLY_MONTHS } from "./site";

// Care packages and one-time help, from the one price list (the API's GET /pricing, copied into pricing.json).
// Never type a care price into a page: use these.

export type CarePackage = (typeof PRICES.care.packages)[number];
export type CareService = (typeof PRICES.care.services)[number];

export const CARE_PACKAGES: CarePackage[] = PRICES.care.packages;

/** The lowest monthly care price, in dollars. */
export const CARE_FROM = Math.min(...CARE_PACKAGES.map((p) => p.monthly));

/** One-time help anyone can buy (set up, move in, one hour of changes). */
export const CARE_SERVICES: CareService[] = PRICES.care.services.filter((s) => !s.careOnly);

/** Extra time at the care price, sold only for a website with a care package. */
export const CARE_EXTRA_HOUR = PRICES.care.services.find((s) => s.careOnly);

/** The hour of changes anyone can buy without care. */
export const ONE_HOUR = PRICES.care.services.find((s) => !s.careOnly && s.minutes === 60);

/** Months a yearly package saves: a year costs YEARLY_MONTHS months. */
export const CARE_MONTHS_FREE = 12 - YEARLY_MONTHS;

/** 30 → "30 minutes", 120 → "2 hours", 90 → "1 hour 30 minutes". */
export function careTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const hours = h ? `${h} hour${h === 1 ? "" : "s"}` : "";
  const mins = m ? `${m} minute${m === 1 ? "" : "s"}` : "";
  return [hours, mins].filter(Boolean).join(" ");
}

/** $1,990 */
export const dollars = (n: number) => `$${n.toLocaleString("en-US")}`;
