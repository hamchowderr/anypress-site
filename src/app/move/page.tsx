import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Flow } from "@/components/FactPieces";
import { Drawing, type DrawingName } from "@/components/Drawing";
import { type Problem, ProblemFix } from "@/components/ProblemFix";
import { Tick } from "@/components/Tick";
import { CtaBand, PageHero, Questions, SectionHead } from "@/components/ui";
import { CONTACT_EMAIL } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: "/move",
  title: "Move your site",
  description:
    "Bring your current WordPress site to AnyPress. We copy it straight from your old host with WordPress's own free Reprint plugin. Your old site isn't changed, and everything comes across.",
});

const STEPS: [DrawingName, string, ReactNode][] = [
  ["ticket", "Get your token", "We set up your new site and give you its Migration Token."],
  ["plug", "Add Reprint", "Install Reprint, WordPress's own free moving plugin, on your current site and paste the token in."],
  ["truck", "We copy it across", "Your new site copies the old one straight from its host. Nothing to download, nothing to upload."],
  ["open", "Check it, then go live", "Look it over on its new address, copy again to catch new orders, then point your domain at it."],
];

const MOVES: [DrawingName, string, string][] = [
  ["words", "Every page and post", "Your whole database: pages, posts, products, orders, customers and settings."],
  ["paint", "Your look", "Your themes, plugins, photos, files and languages."],
  ["lock", "Your old site, untouched", "Nothing on your current site is changed or deleted. It keeps running until you switch."],
];

// The moves built into every AnyPress site (AnyPress Client's switches; AnyPress Move for any other WordPress).
const SWITCHES: [string, string, string][] = [
  ["Circle", "FluentCommunity", "Spaces, members, posts, comments and courses, through Circle's own Admin API."],
  ["LearnDash, Tutor LMS or LifterLMS", "FluentCommunity courses", "Courses and lessons, students and how far each one got."],
  ["MemberPress", "FluentCommunity", "Active members get their spaces and courses, with FluentCRM tags. Payments stay in MemberPress."],
  ["BuddyPress or BuddyBoss", "FluentCommunity", "Groups become spaces with their members, and posts come with their comments, reactions and photos."],
  ["WooCommerce", "FluentCart", "Products, orders, customers, coupons and refunds, plus gallery images and shipping zones."],
  ["Contact Form 7, WPForms or Ninja Forms", "Fluent Forms", "Your forms with their entries, and the pages that show them."],
  ["WooCommerce buyers, MailPoet or Newsletter", "FluentCRM", "Your contacts and lists. Unsubscribed people stay unsubscribed."],
  ["AffiliateWP, SliceWP and others", "FluentAffiliate", "Your affiliates, their referrals and payouts."],
  ["Awesome Support and others", "Fluent Support", "Your help desk tickets."],
];

const WHO = ["WordPress site owners", "Shops on another host", "Sellers moving clients' sites"];

const PROBLEMS: Problem[] = [
  {
    problem: [
      "Moving takes a weekend",
      "Exporting the database, copying files and fixing what broke on the way is a job most people put off for years.",
    ],
    fix: ["A free plugin and a token", "Add WordPress's free Reprint plugin to your current site and paste in your token. We copy the rest."],
  },
  {
    problem: [
      "The site goes down while it moves",
      "Visitors and orders hit an error page while files are copied and settings are changed.",
    ],
    fix: [
      "No downtime",
      "Your current site keeps running the whole time. Visitors only reach the new one once you point your domain at it.",
    ],
  },
  {
    problem: ["Something gets left behind", "A missing plugin, a lost photo folder or last week's orders turn up after the switch."],
    fix: [
      "Everything comes across, right up to the switch",
      "Pages, posts, products, orders, customers, settings, themes, plugins, photos and files. Copy again before you go live and the newest orders come too.",
    ],
  },
  {
    problem: ["The upkeep stays with you", "On most hosts, security fixes and copies of your site are still your job after you move."],
    fix: ["Looked after from then on", "We apply security fixes and save a copy of your site every night."],
  },
];

const FAQ: [string, ReactNode][] = [
  [
    "How do I get a Migration Token?",
    <>
      Pick your plan, then email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with your current site&apos;s address and
      we&apos;ll send you a token. Selling sites with AnyPress? Choose Move a site in on your dashboard and the token is right there.
    </>,
  ],
  [
    "What is Reprint?",
    <>
      A{" "}
      <a href="https://wordpress.org/plugins/reprint/" target="_blank" rel="noreferrer">
        free plugin made by WordPress.org
      </a>{" "}
      for moving sites. Add it from Plugins, Add New Plugin like any other, then open Tools, Reprint Server, paste the token and
      choose Authorize client. It lets your new AnyPress site read a copy of the old one, and nothing on the old site is changed.
    </>,
  ],
  [
    "Do I have to keep a page open while it moves?",
    "No. The copy runs on our side, straight from your old host, and your new site shows Ready when it's done. Big sites can take a while, and an interrupted copy carries on where it stopped.",
  ],
  [
    "Is my site down while it moves?",
    "No. Your current site keeps running the whole time. Visitors only reach the new one once you point your domain at it.",
  ],
  [
    "What about orders that come in after the copy?",
    "Your new site stays on hold until you go live: it sends no emails to customers, runs no renewals and isn't shown to search engines. Just before you switch, copy it again and the newest orders, posts and form entries come across. Changes made on the new site in the meantime are replaced, so do your edits after you go live.",
  ],
  [
    "What if my host blocks the copy?",
    "Some security services, such as Cloudflare's browser check or Wordfence, stop the copy. We'll tell you what got in the way. Let it through and copy again, or we'll give you another way to send the site.",
  ],
  [
    "What doesn't come across?",
    "Caches and backup plugins' archives are left out, because your AnyPress site has its own. Caching add-ons your old host put in place are removed for the same reason.",
  ],
  [
    "Can I switch plugins once my site is on AnyPress?",
    "Yes. The moves from Circle, LearnDash, Tutor LMS, LifterLMS, MemberPress, BuddyPress, WooCommerce and the rest are built into every AnyPress site. Each one checks first and tells you what will come across, and an undo takes out only what it added. Your old plugin and its data aren't changed.",
  ],
  [
    "My site isn't on AnyPress. Can I still use the moves?",
    "Yes. The same moves come as AnyPress Move, a free plugin for any WordPress. It adds Tools, Move to Fluent, with the same check and undo.",
  ],
  [
    "Can I move a multisite network?",
    "Not yet. We move one WordPress site at a time. If you run a network, talk to us about your options.",
  ],
  [
    "Does my site need anything special?",
    "It needs to be reachable at an https address. Reprint runs on almost any WordPress and PHP your host offers.",
  ],
];

export default function Move() {
  return (
    <>
      <PageHero
        side="owners"
        drawing="truck"
        eyebrow="move your site"
        title={
          <>
            Move your site without losing a thing. <mark>We copy it all across</mark>.
          </>
        }
        lead="Already have a WordPress site somewhere else? Add WordPress's free Reprint plugin, paste in your token, and we copy the whole site across. Your old site isn't touched."
      >
        <div className="ctas mt-8">
          <Link href="/pricing" className="btn btn-ink">
            Pick a plan →
          </Link>
          <a href={`mailto:${CONTACT_EMAIL}?subject=Moving%20my%20site%20to%20AnyPress`} className="btn btn-paper">
            Ask about moving
          </a>
        </div>
        <ul className="checks">
          <li>
            <Tick />
            Nothing to upload
          </li>
          <li>
            <Tick />
            No downtime
          </li>
          <li>
            <Tick />
            Old site left as it is
          </li>
        </ul>
      </PageHero>

      <ProblemFix soft who={WHO} title="Moving a site shouldn't be a weekend job." items={PROBLEMS} />

      <section className="sec">
        <div className="in">
          <SectionHead eyebrow="how it works" title="Add a plugin, paste a token. We do the moving." />
          <Flow steps={STEPS} />
        </div>
      </section>

      <section className="sec soft">
        <div className="in">
          <SectionHead eyebrow="what comes across" title="Everything that makes it your site." />
          <div className="yours !grid-cols-1 md:!grid-cols-3">
            {MOVES.map(([d, title, body]) => (
              <div key={title}>
                <Drawing name={d} />
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="in">
          <SectionHead
            eyebrow="switch to Fluent"
            title="Leaving another plugin or platform? Bring it along."
            lead="Once your site is here, a move copies one plugin's data into the Fluent plugin that replaces it. It checks first and says what will come across, it can be undone, and your old plugin is left as it was."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SWITCHES.map(([from, into, what]) => (
              <div key={from} className="rounded-xl border border-line bg-paper-2 p-5">
                <h3 className="font-semibold">
                  {from} <span aria-hidden="true">→</span>
                  <span className="sr-only">into</span> {into}
                </h3>
                <p className="mt-2 text-sm">{what}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec soft !pt-0">
        <div className="in">
          <div className="sell">
            <Drawing name="agency" />
            <div>
              <span className="eyebrow">selling sites?</span>
              <h2>Move your clients&apos; sites in from your dashboard.</h2>
              <p>
                Choose <b className="text-white">Move a site in</b> on your Stores page. It sets up a store that waits for the site and
                gives you the Migration Token to hand to your client. Once Reprint is authorized, enter the old site&apos;s address and
                start the copy, and copy again before it goes live.
              </p>
              <p>Developers can start and repeat the copy with one API call.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link className="btn btn-honey" href="/sellers">
                  How selling works →
                </Link>
                <Link className="btn border-white/40 text-white hover:bg-white/10" href="/developers">
                  For developers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="in">
          <SectionHead drawing="question" title="Questions about moving" />
          <Questions items={FAQ} firstOpen />
        </div>
      </section>

      <CtaBand
        eyebrow="ready to move?"
        title="Your site, without the old hassle."
        body="Pick a plan, then we'll send your token. Your site keeps running until you switch."
        href="/pricing"
        label="Pick a plan"
        drawings={["truck", "box", "open"]}
      />
    </>
  );
}
