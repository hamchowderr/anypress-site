import Link from "next/link";
import { CompareTable } from "@/components/CompareTable";
import { SectionHead } from "@/components/ui";
import { WP_HOST } from "@/lib/prices";

// Most people hear "WordPress" and picture an empty install. This says what actually arrives.
const ROWS: [string, string, string][] = [
  ["Price for one site", `From $${WP_HOST.price}/mo for hosting alone (${WP_HOST.who})`, "From $12/mo, tools included"],
  ["Shop, bookings, members or courses", "Research, buy and install plugins", "Installed and switched on"],
  ["Contact forms and a mailing list", "Another plugin to set up and connect", "Ready, and every sign-up lands in your list"],
  ["Getting found on Google", "Install an SEO plugin and work through it", "Set up on every page"],
  ["Email that arrives", "Set up a sending service yourself", "Sends from your own address"],
  ["Plugins that work together", "Hope they do", "One family of tools sharing one customer list"],
  ["Security fixes", "Your job", "Done for you"],
];

export function ReadyBuilt({ soft = false }: { soft?: boolean }) {
  return (
    <section className={`sec${soft ? " soft" : ""}`} aria-labelledby="h-ready">
      <div className="in">
        <SectionHead
          drawing="tools"
          eyebrow="not an empty install"
          title="WordPress, already built for what you do."
          lead="Most WordPress hosts hand you a blank site and a long list of plugins to research. An AnyPress site arrives with its tools installed, connected and set up for the kind of site you picked."
          id="h-ready"
        />
        <CompareTable head={["Out of the box", "Plain WordPress hosting", "AnyPress"]} rows={ROWS} />
        <p className="compare-note">
          {WP_HOST.who}&apos;s price is from{" "}
          <a href={WP_HOST.url} target="_blank" rel="noopener nofollow" className="underline">
            its own pricing page
          </a>
          , billed monthly.{" "}
          <Link href="/included" className="underline">
            See every plugin in each site, by name
          </Link>
        </p>
      </div>
    </section>
  );
}
