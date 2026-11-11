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
  website: { name: "Website", blueprint: "website" },
  bookings: { name: "Bookings site", blueprint: "bookings" },
  store: { name: "Online store", blueprint: "online-store" },
  community: { name: "Community site", blueprint: "community" },
  everything: { name: "Everything site", blueprint: "everything" },
  highlevel: { name: "HighLevel site", blueprint: "highlevel" },
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
