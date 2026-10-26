import { Drawing, type DrawingName } from "@/components/Drawing";
import { SectionHead } from "@/components/ui";

// What sellers and resellers can put in the sites they sell (waas-provisioning-api docs/plugin-choices.md, and
// site archives as a storefront's starting site). The blocked kinds match BLOCKED in src/pluginchoices.ts there.
const WAYS: [DrawingName, string, string][] = [
  ["website", "Start from ours", "Sell the five ready-built sites as they are, with every tool already set up."],
  ["plug", "Add any free plugin", "Search the WordPress plugin directory from your dashboard and pick which of your sites get each one."],
  [
    "key",
    "Bring your premium plugins",
    "Upload the paid plugins you already use, with your licence key, and every new site gets them ready to go.",
  ],
  [
    "box",
    "Or upload a whole site",
    "Built a site you love? Upload it as your starting site, with its theme, pages and plugins. Every order is a copy.",
  ],
];

export function BuildYourOwn({ soft = false }: { soft?: boolean }) {
  return (
    <section className={`sec${soft ? " soft" : ""}`} aria-labelledby="h-own">
      <div className="in">
        <SectionHead
          eyebrow="for sellers and resellers"
          title="Sell our ready-built sites, or sites you build yourself."
          lead="Your storefront sells whatever WordPress site you want to sell. Each order becomes its own copy, and we host and look after every one."
          id="h-own"
        />
        <ul className="cards big">
          {WAYS.map(([d, title, body]) => (
            <li key={title} className="!basis-[250px]">
              <Drawing name={d} />
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ul>
        <p className="compare-note">
          A few kinds of plugin can&apos;t be added because the hosting already does their job: page caching, backups, email sending, file
          managers and server firewalls.
        </p>
      </div>
    </section>
  );
}
