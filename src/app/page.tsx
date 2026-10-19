import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import { SiteTypeDemo } from "@/components/SiteTypeDemo";
import { CtaBand } from "@/components/ui";
import { AUDIENCES, SITE_TYPES } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Hero />
      <AudienceRibbon />
      <Chores />
      <Features />
      <SiteTypes />
      <HowItWorks />
      <Compare />
      <Developers />
      <Faq />
      <CtaBand />
    </>
  );
}

function Hero() {
  return (
    <section className="grain relative overflow-hidden">
      <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="animate-glow bg-ribbon absolute -top-40 right-[-10%] h-[520px] w-[620px] rounded-full opacity-25 blur-[120px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pt-16 pb-20 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pt-24 lg:pb-28">
        <div>
          <p className="eyebrow flex items-center gap-2">
            <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-[#28c840]" />
            WordPress, set up and run for you
          </p>
          <h1 className="font-display mt-5 text-[clamp(3rem,8vw,6.5rem)] leading-[0.92] font-extrabold">
            Any site.
            <br />
            <span className="font-serif text-ribbon pr-2 font-normal tracking-normal italic">Any</span>business.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-on-ink-muted">
            Pick what you&apos;re building: a website, a booking page, an online store, a community with courses, or
            all of it. AnyPress builds it on its own WordPress, with the right tools already installed, and keeps it
            running.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/pricing" className="btn btn-ribbon">
              Start from ${SITE_TYPES[0].from}/mo
            </Link>
            <Link href="#site-types" className="btn btn-ghost">
              See what you can build
            </Link>
          </div>
          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-ink-line pt-6">
            {[
              ["0%", "of your sales"],
              ["1", "WordPress per site"],
              ["Nightly", "backups"],
            ].map(([k, v]) => (
              <div key={v}>
                <dt className="font-display text-2xl font-bold">{k}</dt>
                <dd className="mt-1 text-xs text-on-ink-muted">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <SiteTypeDemo />
      </div>
    </section>
  );
}

function AudienceRibbon() {
  const items = [...AUDIENCES, ...AUDIENCES];
  return (
    <section id="who" aria-label="Who AnyPress is for" className="relative z-10 -my-6 overflow-hidden py-6">
      <div className="bg-ribbon -rotate-2 py-4 shadow-[0_20px_60px_-20px_rgba(210,31,164,0.6)]">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
          {items.map((a, i) => (
            <span key={i} className="font-display flex items-center gap-10 text-2xl font-bold text-ink sm:text-3xl">
              {a}
              <LogoMark className="h-6 w-6 [&_path]:fill-ink" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const CHORES = [
  ["Servers", "We run the machines. Your site gets its own WordPress and its own database."],
  ["SSL", "Every address gets a certificate automatically, and it renews itself."],
  ["Backups", "A copy of your whole site every night, and a one-click restore when something breaks."],
  ["Your domain", "One-click setup with supported DNS providers, or a few records anywhere else."],
  ["Email", "Order and booking emails go out from your own domain, not a shared server."],
  ["Plugins", "The tools for your kind of site are installed and set up before you sign in."],
  ["Payments", "Stripe checkout is built in. Connect your account and you can take money."],
  ["Customers", "Every buyer, member and subscriber lands in your own CRM with lists ready."],
  ["Search", "SEO plugin configured, sitemap working, products included."],
  ["Sign-in", "Open your WordPress admin with one click from your account. No extra passwords."],
];

function Chores() {
  return (
    <section className="band-paper relative pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">What we take off your plate</p>
            <h2 className="font-display mt-4 text-5xl leading-[0.95] font-extrabold sm:text-6xl">
              Ten WordPress chores you&apos;ll{" "}
              <span className="font-serif font-normal tracking-normal text-[#d9481f] italic">never</span> do.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-on-paper-muted">
              WordPress can run anything. Getting it there is the hard part. We do the setup and the upkeep, you
              keep the freedom.
            </p>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-3xl border border-paper-line bg-paper-line sm:grid-cols-2">
            {CHORES.map(([title, body], i) => (
              <li key={title} className="group bg-paper p-6 transition-colors hover:bg-white">
                <span className="font-mono text-xs text-on-paper-muted">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display mt-3 text-2xl font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-on-paper-muted">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="grain relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="eyebrow">Built differently</p>
        <h2 className="font-display mt-4 max-w-3xl text-5xl leading-[0.95] font-extrabold sm:text-6xl">
          Not a page builder. Not bare hosting. <span className="text-ribbon">The whole thing.</span>
        </h2>

        <div className="mt-14 grid auto-rows-[minmax(240px,auto)] gap-4 md:grid-cols-6">
          {/* Isolation */}
          <article className="relative overflow-hidden rounded-3xl border border-ink-line bg-ink-2 p-7 md:col-span-4">
            <h3 className="font-display text-3xl font-bold">Your own WordPress. Really.</h3>
            <p className="mt-3 max-w-md text-on-ink-muted">
              Every site runs in its own container with its own database. A busy neighbour can&apos;t slow you down,
              and a hacked one can&apos;t reach you.
            </p>
            <div className="mt-8 grid grid-cols-6 gap-2 sm:grid-cols-8">
              {Array.from({ length: 16 }, (_, i) => (
                <div
                  key={i}
                  className={`flex aspect-square flex-col justify-between rounded-lg border p-1.5 font-mono text-[9px] ${
                    i === 5
                      ? "bg-ribbon border-transparent text-ink shadow-[0_0_40px_-5px_rgba(255,122,42,0.8)]"
                      : "border-ink-line text-on-ink-muted/50"
                  } ${i > 11 ? "hidden sm:flex" : ""}`}
                >
                  <span>{i === 5 ? "you" : "wp"}</span>
                  <span className="flex gap-0.5">
                    <span className="h-1 flex-1 rounded-full bg-current opacity-60" />
                    <span className="h-1 flex-1 rounded-full bg-current opacity-30" />
                  </span>
                </div>
              ))}
            </div>
          </article>

          {/* 0% */}
          <article className="bg-ribbon relative flex flex-col justify-between overflow-hidden rounded-3xl p-7 text-ink md:col-span-2">
            <p className="font-display text-[7rem] leading-none font-extrabold">0%</p>
            <div>
              <h3 className="font-display text-2xl font-bold">of your sales. Ever.</h3>
              <p className="mt-2 text-sm text-ink/75">
                One monthly price. Stripe&apos;s card fee is the only one on your orders.
              </p>
            </div>
          </article>

          {/* Domain */}
          <article className="rounded-3xl border border-ink-line bg-ink-2 p-7 md:col-span-3">
            <h3 className="font-display text-2xl font-bold">Your domain, connected for you</h3>
            <p className="mt-2 text-sm text-on-ink-muted">
              Start on a free <span className="font-mono text-on-ink">.anypress.site</span> address. Bring your own
              domain whenever you&apos;re ready.
            </p>
            <div className="mt-6 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between rounded-lg border border-ink-line px-3 py-2 text-on-ink-muted line-through decoration-rose/70">
                <span>kettle-and-crumb.anypress.site</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-orange/50 bg-orange/10 px-3 py-2">
                <span>kettleandcrumb.com</span>
                <span className="text-[#28c840]">● connected</span>
              </div>
            </div>
          </article>

          {/* Backups */}
          <article className="rounded-3xl border border-ink-line bg-ink-2 p-7 md:col-span-3">
            <h3 className="font-display text-2xl font-bold">Backed up every night</h3>
            <p className="mt-2 text-sm text-on-ink-muted">
              Deleted the wrong page? Bad update? Put the whole site back the way it was last night.
            </p>
            <div className="mt-6 grid grid-cols-14 gap-1" style={{ gridTemplateColumns: "repeat(14, minmax(0, 1fr))" }}>
              {Array.from({ length: 28 }, (_, i) => (
                <span
                  key={i}
                  className={`aspect-square rounded-[4px] ${i === 27 ? "bg-ribbon" : "bg-[#28c840]"}`}
                  style={{ opacity: i === 27 ? 1 : 0.25 + (i / 28) * 0.6 }}
                />
              ))}
            </div>
            <p className="mt-3 font-mono text-[11px] text-on-ink-muted">Last backup: last night · Restore ↺</p>
          </article>

          {/* Email */}
          <article className="rounded-3xl border border-ink-line bg-ink-2 p-7 md:col-span-2">
            <h3 className="font-display text-2xl font-bold">Email from you</h3>
            <p className="mt-2 text-sm text-on-ink-muted">Receipts and reminders come from your own address.</p>
            <div className="mt-6 rounded-xl bg-paper p-3 text-xs text-on-paper">
              <p className="text-on-paper-muted">From</p>
              <p className="font-semibold">hello@kettleandcrumb.com</p>
              <p className="mt-2 text-on-paper-muted">Subject</p>
              <p className="font-semibold">Your order #1042 is on its way ☕</p>
            </div>
          </article>

          {/* Sign in */}
          <article className="rounded-3xl border border-ink-line bg-ink-2 p-7 md:col-span-2">
            <h3 className="font-display text-2xl font-bold">One click to wp-admin</h3>
            <p className="mt-2 text-sm text-on-ink-muted">
              Sign in to your AnyPress account and open your site&apos;s dashboard with a one-time link.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink-line px-4 py-2 text-sm">
              <span className="font-bold">W</span> Open WordPress <span className="text-orange">→</span>
            </div>
          </article>

          {/* Open source */}
          <article className="rounded-3xl border border-ink-line bg-ink-2 p-7 md:col-span-2">
            <h3 className="font-display text-2xl font-bold">Open source, no lock-in</h3>
            <p className="mt-2 text-sm text-on-ink-muted">
              The API, plugins and dashboard behind AnyPress are public under the GPL. It&apos;s WordPress, so your
              site can always move.
            </p>
            <p className="mt-6 font-mono text-xs text-on-ink-muted">
              <span className="text-orange">$</span> git clone github.com/hamchowderr/…
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

function SiteTypes() {
  return (
    <section id="site-types" className="band-paper relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Five ways to start</p>
            <h2 className="font-display mt-4 max-w-2xl text-5xl leading-[0.95] font-extrabold sm:text-6xl">
              Pick what you&apos;re building. We&apos;ll install the rest.
            </h2>
          </div>
          <Link href="/pricing" className="btn btn-ghost">
            Compare plans
          </Link>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {SITE_TYPES.map((t, i) => (
            <Link
              href={`/sites/${t.id}`}
              key={t.id}
              className={`group relative flex flex-col overflow-hidden rounded-3xl border p-6 transition-transform hover:-translate-y-1 ${
                t.id === "everything"
                  ? "border-transparent bg-ink text-on-ink md:col-span-2 lg:col-span-1"
                  : "border-paper-line bg-white"
              }`}
            >
              {t.id === "everything" && (
                <div className="bg-ribbon absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-40 blur-2xl" />
              )}
              <span className="font-mono text-xs opacity-60">0{i + 1}</span>
              <h3 className="font-display mt-6 text-2xl leading-tight font-bold">{t.name}</h3>
              <p className={`mt-3 flex-1 text-sm leading-6 ${t.id === "everything" ? "text-on-ink-muted" : "text-on-paper-muted"}`}>
                {t.pitch}
              </p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {t.tools.slice(1).map((tool) => (
                  <li
                    key={tool}
                    className={`rounded-full border px-2 py-0.5 text-[11px] ${t.id === "everything" ? "border-ink-line" : "border-paper-line"}`}
                  >
                    {tool}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-current/10 pt-4">
                <span className="text-xs opacity-60">from</span>{" "}
                <span className="font-display text-3xl font-extrabold">${t.from}</span>
                <span className="text-xs opacity-60">/mo</span>
                <span className="float-right mt-2 transition-transform group-hover:translate-x-1">→</span>
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  ["Pick a site type", "Website, bookings, store, community, or everything. Choose a name for your free address."],
  ["We build it", "Its own WordPress, the tools for that kind of site, SSL and backups, ready in minutes."],
  ["Make it yours", "Add your products, classes or posts, connect Stripe and your domain, and open the doors."],
];

function HowItWorks() {
  return (
    <section className="grain relative overflow-hidden py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="eyebrow">How it works</p>
        <h2 className="font-display mt-4 text-5xl leading-[0.95] font-extrabold sm:text-6xl">
          Three steps. <span className="font-serif font-normal tracking-normal text-on-ink-muted italic">No servers.</span>
        </h2>
        <ol className="mt-16 grid gap-6 md:grid-cols-3">
          {STEPS.map(([title, body], i) => (
            <li key={title} className="relative">
              <span className="font-display text-ribbon block text-[9rem] leading-[0.8] font-extrabold">{i + 1}</span>
              <div className="relative -mt-8 rounded-3xl border border-ink-line bg-ink-2/90 p-6 backdrop-blur">
                <h3 className="font-display text-2xl font-bold">{title}</h3>
                <p className="mt-2 text-on-ink-muted">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const COMPARE_ROWS: [string, string, string, string][] = [
  ["Your own WordPress", "✓", "—", "✓"],
  ["Store, bookings, CRM, community tools included", "—", "✓", "✓"],
  ["Set up for you", "—", "✓", "✓"],
  ["No cut of your sales", "✓", "Often not", "✓"],
  ["Move your site anywhere", "✓", "—", "✓"],
  ["Open source", "—", "—", "✓"],
];

function Compare() {
  return (
    <section className="band-paper py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="eyebrow text-center">Why AnyPress</p>
        <h2 className="font-display mx-auto mt-4 max-w-3xl text-center text-4xl leading-tight font-extrabold sm:text-5xl">
          Hosts sell you a server. Builders rent you their tools. We hand you both, and the keys.
        </h2>
        <div className="mt-12 overflow-x-auto rounded-3xl border border-paper-line bg-white">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-paper-line">
                <th className="p-4 font-normal text-on-paper-muted" />
                <th className="p-4 font-semibold">WordPress hosting</th>
                <th className="p-4 font-semibold">Site builders</th>
                <th className="p-4">
                  <span className="flex items-center gap-1.5 font-display text-base font-bold">
                    <LogoMark className="h-5 w-5" /> AnyPress
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map(([label, ...cols]) => (
                <tr key={label} className="border-b border-paper-line last:border-0">
                  <td className="p-4 font-medium">{label}</td>
                  {cols.map((c, i) => (
                    <td
                      key={i}
                      className={`p-4 ${i === 2 ? "bg-orange/[0.07] font-bold text-[#d9481f]" : "text-on-paper-muted"}`}
                    >
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Developers() {
  return (
    <section id="developers" className="grain relative overflow-hidden py-24">
      <div className="animate-glow bg-ribbon absolute bottom-[-30%] left-[-10%] h-[420px] w-[520px] rounded-full opacity-15 blur-[120px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="eyebrow">For developers & SaaS teams</p>
          <h2 className="font-display mt-4 text-5xl leading-[0.95] font-extrabold sm:text-6xl">
            Spin up WordPress sites <span className="text-ribbon">from your own app.</span>
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-8 text-on-ink-muted">
            Everything AnyPress does is an API call. Create, suspend, restore and back up sites from your product,
            get webhooks when things change, or let an AI assistant run it through our MCP connector.
          </p>
          <ul className="mt-8 grid max-w-md grid-cols-2 gap-3 text-sm">
            {["REST API + OpenAPI", "TypeScript & PHP SDKs", "Signed webhooks", "MCP connector"].map((x) => (
              <li key={x} className="flex items-center gap-2">
                <span className="text-orange">◆</span>
                {x}
              </li>
            ))}
          </ul>
          <Link href="/developers" className="btn btn-ghost mt-9">
            More for developers
          </Link>
        </div>
        <div className="overflow-hidden rounded-2xl border border-ink-line bg-[#0a090d] shadow-2xl">
          <div className="flex items-center justify-between border-b border-ink-line px-4 py-2.5 font-mono text-xs text-on-ink-muted">
            <span>create-site.sh</span>
            <span className="rounded bg-ink-3 px-2 py-0.5">bash</span>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-6">
            <code>
              <span className="text-on-ink-muted"># Create a store for a new customer</span>
              {"\n"}
              <span className="text-amber">curl</span> -u <span className="text-[#7ee787]">&quot;$KEY:$SECRET&quot;</span> \{"\n"}
              {"  "}-H <span className="text-[#7ee787]">&apos;Content-Type: application/json&apos;</span> \{"\n"}
              {"  "}-d <span className="text-[#7ee787]">&apos;{"{"}&quot;name&quot;: &quot;Kettle &amp; Crumb&quot;,{"\n"}
              {"       "}&quot;externalId&quot;: &quot;order_1042&quot;{"}"}&apos;</span> \{"\n"}
              {"  "}https://api.anypress.io/v1/tenants{"\n\n"}
              <span className="text-on-ink-muted"># → your webhook, once it&apos;s built</span>
              {"\n"}
              {"{"} <span className="text-rose">&quot;type&quot;</span>: <span className="text-[#7ee787]">&quot;tenant.ready&quot;</span>,{"\n"}
              {"  "}<span className="text-rose">&quot;data&quot;</span>: {"{"} <span className="text-rose">&quot;tenant&quot;</span>: {"{"}{"\n"}{"    "}<span className="text-rose">&quot;domainName&quot;</span>: <span className="text-[#7ee787]">&quot;kettle-and-crumb.anypress.site&quot;</span> {"}"} {"}"} {"}"}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}

const FAQ = [
  [
    "What is AnyPress?",
    "A way to get a complete WordPress site without running a server. You choose the kind of site, we build it on its own WordPress with the right tools installed, then keep it running, secured and backed up.",
  ],
  [
    "Is it really my own WordPress?",
    "Yes. Each site has its own WordPress install and its own database, not a shared one. You get the WordPress admin you already know.",
  ],
  [
    "Do you take a cut of my sales?",
    "No. You pay one monthly price for the site. Stripe charges its normal card fee on payments; AnyPress adds nothing on top.",
  ],
  [
    "Can I use my own domain?",
    "Yes. Every site starts on a free .anypress.site address. Connect your own domain when you're ready: supported DNS providers set it up in one click, anywhere else takes a few records.",
  ],
  [
    "I build sites for clients. Can I sell AnyPress sites?",
    "Yes. Agencies can sell sites under their own brand, from their own WordPress shop, with their own prices.",
  ],
  [
    "Can my software create sites automatically?",
    "Yes. The API creates and manages sites, and webhooks tell your app when a site is ready. There are TypeScript and PHP SDKs.",
  ],
  [
    "Is AnyPress open source?",
    "Yes. The provisioning API, the WordPress plugins and the dashboard are all public under the GPL.",
  ],
];

function Faq() {
  return (
    <section id="faq" className="band-paper py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <p className="eyebrow">Questions</p>
          <h2 className="font-display mt-4 text-5xl leading-[0.95] font-extrabold sm:text-6xl">
            Asked &amp; <span className="font-serif font-normal tracking-normal text-[#d9481f] italic">answered.</span>
          </h2>
        </div>
        <div className="divide-y divide-paper-line border-y border-paper-line">
          {FAQ.map(([q, a]) => (
            <details key={q} className="group py-5">
              <summary className="font-display flex cursor-pointer list-none items-center justify-between gap-6 text-xl font-bold [&::-webkit-details-marker]:hidden">
                {q}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-paper-line text-lg transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl leading-7 text-on-paper-muted">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
