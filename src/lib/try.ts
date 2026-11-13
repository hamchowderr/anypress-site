/**
 * The /try page: a site opened in WordPress Playground, in the visitor's own browser, inside our own page (no
 * Playground bar or panels). Nothing is made on a server.
 */

/** Our own Playground (no Playground bar), whose remote.html runs the site inside the /try page. */
export const PLAYGROUND_REMOTE = "https://demo.anypress.site/remote.html";

/** Its client library, the same build as remote.html (the client starts only a remote.html served next to it). */
export const PLAYGROUND_CLIENT = "https://demo.anypress.site/client/index.js";

const RAW = "https://raw.githubusercontent.com/hamchowderr/";

/**
 * The site types you can try, each with the blueprint that sets up a site as a new store of that type starts
 * (waas-provisioning-api templates/anypress-store/playground). The marketing site's "store" is the template's
 * "online-store".
 */
export const TRY_TYPES = {
  website: { name: "Website", short: "Website", blueprint: "website" },
  bookings: { name: "Bookings Site", short: "Bookings", blueprint: "bookings" },
  store: { name: "Online Store", short: "Online Store", blueprint: "online-store" },
  community: { name: "Community Site", short: "Community", blueprint: "community" },
  everything: { name: "Everything Site", short: "Everything", blueprint: "everything" },
  highlevel: { name: "HighLevel Site", short: "HighLevel", blueprint: "highlevel" },
} as const;

export type TryType = keyof typeof TRY_TYPES;

export const isTryType = (v: unknown): v is TryType =>
  typeof v === "string" && Object.hasOwn(TRY_TYPES, v);

export const typeBlueprint = (type: TryType) =>
  `${RAW}waas-provisioning-api/main/templates/anypress-store/playground/${TRY_TYPES[type].blueprint}.json`;

/** Only our own blueprints open on /try: a link can't make the page run someone else's. */
export const isOurBlueprint = (url: unknown): url is string =>
  typeof url === "string" && url.startsWith(RAW) && !url.includes("..");

/** A site type's demo. */
export const tryType = (type: TryType) => `/try?type=${type}`;

/** Any of our blueprints (a kit's or a block's example site), with the name shown in the bar. */
export const tryBlueprint = (url: string, title: string) =>
  `/try?blueprint=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;

/** The /try site type a prospect demo's store site type opens as. */
export function prospectType(siteType: string): TryType {
  if (siteType === "online-store") return "store";
  if (siteType === "store") return "everything";
  return isTryType(siteType) ? siteType : "website";
}

/**
 * What a prospect demo adds to its site type's blueprint: what was read from the business's website, then the
 * sample's last part (templates/anypress-store/playground/sample/prospect.php), which gives the site their look.
 */
export const prospectSteps = (demo: unknown) => [
  { step: "writeFile", path: "/wordpress/anypress-prospect.json", data: JSON.stringify(demo) },
  {
    step: "runPHP",
    code: `<?php define('ANYPRESS_SAMPLE_PARTS', ["prospect"]); require '/wordpress/anypress-sample/run.php';`,
    progress: { caption: "Making the demo yours" },
  },
];
