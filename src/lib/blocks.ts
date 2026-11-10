/**
 * The blocks in AnyPress Blocks (hamchowderr/anypress-blocks), with the demo page each one has in WordPress
 * Playground (demo/blueprints/<slug>.json in that repository). Screenshots in public/designs/blocks/<slug>.webp are
 * from that demo.
 */
export interface Block {
  slug: string;
  title: string;
  body: string;
}

export const BLOCKS: Block[] = [
  { slug: "popup", title: "Popup", body: "A box over the page after a few seconds, on scroll or when someone is about to leave. Good for a signup or an offer." },
  { slug: "carousel", title: "Carousel", body: "Slides that scroll sideways with arrows and dots, for reviews, projects, team members or photos." },
  { slug: "before-after", title: "Before and after", body: "Two photos of the same job with a handle to drag between them: a kitchen, a lawn, a haircut, a roof." },
  { slug: "countdown", title: "Countdown", body: "Days, hours and minutes left until an offer ends or an event starts." },
  { slug: "counter", title: "Counter", body: "A big number that counts up as it comes into view, such as years in business or jobs done." },
  { slug: "star-rating", title: "Star rating", body: "Your rating, how many reviews and where they're from, for example 4.9 out of 5 on Google." },
  { slug: "map", title: "Map", body: "Your address on a map with a pin and a link for directions." },
  { slug: "location-finder", title: "Location finder", body: "All your branches next to a map. Visitors search by town or tap “Near me” to find the closest." },
  { slug: "notice-bar", title: "Notice bar", body: "One short line across the page, such as holiday hours or free delivery. Visitors can close it." },
  { slug: "phone-bar", title: "Call and book bar", body: "A bar along the bottom of the screen with Call and Book buttons, so the main action is one tap away." },
  { slug: "age-check", title: "Age check", body: "Asks visitors to confirm their age before they see the site, for shops selling age-restricted goods." },
];

const PLAYGROUND = "https://playground.wordpress.net/?blueprint-url=";
const RAW = "https://raw.githubusercontent.com/hamchowderr/";

/** Opens a kit's example site in WordPress Playground, on the latest theme and blocks. */
export const kitPlayground = (slug: string) => `${PLAYGROUND}${RAW}anypress-theme/main/demo/${slug}/blueprint.json`;

/** Opens one block's demo page in WordPress Playground, or every block's when no slug is given. */
export const blockPlayground = (slug?: string) =>
  `${PLAYGROUND}${RAW}anypress-blocks/main/demo/${slug ? `blueprints/${slug}.json` : "blueprint.json"}`;
