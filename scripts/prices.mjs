// Copies AnyPress's one price list from the API (GET /pricing) into src/lib/pricing.json, which every price on
// the site is worked out from. `npm run prices` updates the copy; `npm run prices:check` (CI) fails when the copy
// differs from the API's list, so a price changed in the API can't be missed here.
import { readFile, writeFile } from "node:fs/promises";

const URL_ = process.env.PRICING_URL || "https://api.anypress.io/pricing";
const FILE = new URL("../src/lib/pricing.json", import.meta.url);
const check = process.argv.includes("--check");

let live;
try {
  const res = await fetch(URL_, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  live = `${JSON.stringify(await res.json(), null, 2)}\n`;
} catch (err) {
  // An API outage shouldn't stop the site building: the copy in the repository is still used.
  console.warn(`::warning::Couldn't read the price list from ${URL_} (${err.message}); keeping src/lib/pricing.json.`);
  process.exit(0);
}

const copy = await readFile(FILE, "utf8");
if (copy === live) {
  console.log("src/lib/pricing.json matches the API's price list.");
} else if (check) {
  console.error(`::error::src/lib/pricing.json differs from ${URL_}. Run \`npm run prices\` and commit the result.`);
  process.exit(1);
} else {
  await writeFile(FILE, live);
  console.log("Updated src/lib/pricing.json from the API's price list.");
}
