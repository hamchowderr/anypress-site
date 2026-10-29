import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { CopyField } from "@/components/CopyField";
import { Drawing } from "@/components/Drawing";
import { PageHero } from "@/components/ui";
import { ACCOUNT_URL, CONTACT_EMAIL, DASHBOARD_URL } from "@/lib/site";
import {
  SignedOut,
  accessExpired,
  accountApi,
  accountSignInEnabled,
  getSession,
  type DnsRecord,
  type Me,
  type Website,
  type Websites,
} from "@/lib/account";
import { chooseNewName, logInToWebsite, useOwnDomain } from "./actions";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: "/account",
  title: "Your websites",
  description: "Sign in to see your AnyPress websites, open each one's WordPress editor and connect your own domain.",
  noIndex: true,
});

export default function Account({ searchParams }: PageProps<"/account">) {
  return (
    <Suspense
      fallback={
        <section className="in acct">
          <p className="acct-loading">Loading your websites…</p>
        </section>
      }
    >
      <AccountBody searchParams={searchParams} />
    </Suspense>
  );
}

/** Previews and local runs can show the signed-in page with made-up websites: /account?sample */
const SAMPLES_ALLOWED = process.env.VERCEL_ENV !== "production";

async function AccountBody({ searchParams }: Pick<PageProps<"/account">, "searchParams">) {
  const params = await searchParams;
  const error = typeof params.error === "string" ? params.error : undefined;
  const done = typeof params.done === "string" ? params.done : undefined;

  if (SAMPLES_ALLOWED && params.sample !== undefined) {
    return params.sample === "out" ? <SignIn failed={false} /> : <Signed me={SAMPLE.me} data={SAMPLE.data} error={error} done={done} />;
  }
  if (!accountSignInEnabled()) {
    redirect(ACCOUNT_URL);
  }

  const session = await getSession();
  if (!session) {
    return <SignIn failed={error === "sign-in"} />;
  }
  if (accessExpired(session)) {
    redirect("/api/auth/refresh?next=/account");
  }

  let me: Me;
  let data: Websites;
  try {
    [me, data] = await Promise.all([accountApi<Me>(session, "/me"), accountApi<Websites>(session, "/websites")]);
  } catch (e) {
    if (e instanceof SignedOut) {
      redirect("/api/auth/refresh?next=/account");
    }
    throw e;
  }

  return <Signed me={me} data={data} error={error === "sign-in" ? undefined : error} done={done} />;
}

function SignIn({ failed }: { failed: boolean }) {
  return (
    <>
      <PageHero
        side="owners"
        drawing="key"
        eyebrow="your account"
        title="Your websites."
        lead="Sign in to open your website's editor, check how it's doing and use your own domain."
      />
      <section className="in acct acct-out">
        <div className="acct-signin">
          {failed && (
            <p className="acct-note error" role="alert">
              Signing in didn&apos;t work. Please try again.
            </p>
          )}
          <h2>Sign in</h2>
          <p>Use the email and password from when you bought your website.</p>
          <a href="/api/auth/signin?next=/account" className="btn btn-ink">
            Sign in to your account
          </a>
          <p className="acct-small">
            No password yet, or forgot it? Choose &ldquo;Lost your password?&rdquo; on the next page and we&apos;ll email you a link.
          </p>
        </div>
        <ul className="acct-help">
          <li>
            <b>No website yet?</b>
            <span>Pick the kind you need. It&apos;s ready the same day.</span>
            <a href="/pricing">See the plans</a>
          </li>
          <li>
            <b>Selling websites to clients?</b>
            <span>Sellers and resellers have their own dashboard.</span>
            <a href={DASHBOARD_URL}>Go to app.anypress.io</a>
          </li>
        </ul>
      </section>
    </>
  );
}

function Signed({ me, data, error, done }: { me: Me; data: Websites; error?: string; done?: string }) {
  const first = me.name ? me.name.split(" ")[0] : "";
  return (
    <section className="in acct">
      <header className="acct-head">
        <div>
          <span className="eyebrow">your account</span>
          <h1>{first ? `Hi ${first}, here are your websites.` : "Your websites"}</h1>
          <p>Signed in as {me.email}</p>
        </div>
        <form action="/api/auth/signout" method="post">
          <button type="submit" className="btn btn-paper acct-btn-sm">
            Sign out
          </button>
        </form>
      </header>

      {error && (
        <p className="acct-note error" role="alert">
          {error}
        </p>
      )}
      {done && (
        <p className="acct-note done" role="status">
          {done}
        </p>
      )}

      {data.websites.length === 0 ? (
        <div className="acct-empty">
          <Drawing name="website" />
          <h2>You don&apos;t have a website yet.</h2>
          <p>Once you pick a plan, your website shows up here, usually within a few minutes.</p>
          <a href="/pricing" className="btn btn-ink">
            See the plans
          </a>
        </div>
      ) : (
        <ul className="acct-sites">
          {data.websites.map((site) => (
            <SiteCard key={site.id} site={site} records={data.custom_address_records} />
          ))}
        </ul>
      )}

      <ul className="acct-help">
        <li>
          <b>Questions?</b>
          <span>Answers about your account, your domain and billing.</span>
          <a href="/help">Open the help pages</a>
        </li>
        <li>
          <b>Need a hand?</b>
          <span>Email us with any question about your website.</span>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </li>
        <li>
          <b>Receipts and payment details</b>
          <span>Invoices, your card and billing address are on the shop.</span>
          <a href={ACCOUNT_URL}>Open billing</a>
        </li>
      </ul>
    </section>
  );
}

type Tone = "ready" | "busy" | "attention" | "off";

/** What the website's state means for the owner, in a few words and a line of explanation. */
function describe(site: Website): { tone: Tone; label: string; body: string } {
  const until = site.active_until ? new Date(site.active_until).toLocaleDateString("en-US", { dateStyle: "long" }) : "";
  if (site.needs_new_name) {
    return { tone: "attention", label: "Needs a new name", body: "Someone already has the name you picked. Choose another one below and we'll finish setting it up." };
  }
  switch (site.status) {
    case "Ready":
      return until
        ? { tone: "attention", label: `Online until ${until}`, body: `Your plan is cancelled. The website stays online until ${until}, then it goes offline.` }
        : { tone: "ready", label: "Online", body: "Your website is live. Open the editor to change pages, photos and products." };
    case "Queued":
    case "Provisioning":
      return { tone: "busy", label: "Being set up", body: "We're building your website. This usually takes a few minutes, and we'll email you when it's ready." };
    case "Linking Domain":
      return { tone: "busy", label: "Moving to your domain", body: "We're connecting your domain. It takes a few minutes." };
    case "Failed":
      return { tone: "busy", label: "Taking longer than usual", body: "Setting up your website is taking longer than it should. We're on it and will email you when it's ready." };
    case "Suspended":
      return { tone: "off", label: "Offline", body: "Your website is offline because its plan has ended. Pick a plan again to bring it back." };
    default:
      return { tone: "busy", label: site.status_label, body: "" };
  }
}

function SiteCard({ site, records }: { site: Website; records: Websites["custom_address_records"] }) {
  const state = describe(site);
  const hasRecords = records && (records.apex.length > 0 || records.subdomain.length > 0);
  return (
    <li className={`acct-site ${state.tone}`}>
      <div className="acct-site-top">
        <div className="acct-site-name">
          <span className={`acct-status ${state.tone}`}>
            <i aria-hidden />
            {state.label}
          </span>
          <h2>{site.domain || "Your new website"}</h2>
          {site.domain && site.can_log_in && (
            <a href={`https://${site.domain}`} target="_blank" rel="noopener" className="acct-visit">
              Visit your website <span aria-hidden>↗</span>
            </a>
          )}
        </div>
        {state.body && <p className="acct-site-body">{state.body}</p>}
        {site.needs_new_name && (
          <form action={chooseNewName} className="acct-form">
            <input type="hidden" name="id" value={site.id} />
            <label htmlFor={`name-${site.id}`}>New website name</label>
            <div className="acct-field">
              <input id={`name-${site.id}`} name="name" required autoComplete="organization" placeholder="Your business name" />
              <button type="submit" className="btn btn-ink">
                Use this name
              </button>
            </div>
          </form>
        )}
        <div className="acct-actions">
          {site.can_log_in && (
            <form action={logInToWebsite}>
              <input type="hidden" name="id" value={site.id} />
              <button type="submit" className="btn btn-ink">
                Edit your website
              </button>
            </form>
          )}
          <a href={site.manage_plan_url} className="btn btn-paper">
            {site.status === "Suspended" ? "Choose a plan" : "Change or cancel plan"}
          </a>
        </div>
      </div>

      {site.can_log_in && (hasRecords || site.buy_emails_url) && (
        <div className="acct-extras">
          {hasRecords && (
            <details className="acct-more">
              <summary>Use your own domain</summary>
              <div className="acct-more-body">
                <ol className="acct-steps">
                  <li>
                    <b>Add these records where you bought your domain.</b>
                    <span>Look for &ldquo;DNS&rdquo; or &ldquo;DNS records&rdquo; in that company&apos;s settings.</span>
                    <Records title="For a domain like example.com" records={records.apex} />
                    <Records title="For one like shop.example.com" records={records.subdomain} />
                  </li>
                  <li>
                    <b>Then tell us the domain.</b>
                    <span>It can take up to an hour for new records to work. If it says the records aren&apos;t there yet, try again a little later.</span>
                    <form action={useOwnDomain} className="acct-form">
                      <input type="hidden" name="id" value={site.id} />
                      <label htmlFor={`domain-${site.id}`} className="sr-only">
                        Your domain
                      </label>
                      <div className="acct-field">
                        <input id={`domain-${site.id}`} name="domain" required inputMode="url" autoCapitalize="none" spellCheck={false} placeholder="example.com" />
                        <button type="submit" className="btn btn-ink">
                          Use this domain
                        </button>
                      </div>
                    </form>
                  </li>
                </ol>
              </div>
            </details>
          )}
          {site.buy_emails_url && (
            <p className="acct-emails">
              Sending lots of email? <a href={site.buy_emails_url}>Buy more emails</a>. They never expire.
            </p>
          )}
        </div>
      )}
    </li>
  );
}

function Records({ title, records }: { title: string; records: DnsRecord[] }) {
  if (records.length === 0) {
    return null;
  }

  return (
    <div className="acct-records">
      <p>{title}</p>
      <ul>
        {records.map((r) => (
          <li key={`${r.type}${r.value}`}>
            <span className="acct-type">{r.type}</span>
            <CopyField value={r.value} label={`${r.type} record value`} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Made-up websites for previews (/account?sample), one in each state an owner can meet. */
const SAMPLE: { me: Me; data: Websites } = {
  me: { id: 1, email: "jordan@juniperstreetbakery.com", name: "Jordan Lee" },
  data: {
    websites: [
      {
        id: 101,
        domain: "juniperstreetbakery.anypress.site",
        status: "Ready",
        status_label: "Ready",
        active_until: null,
        can_log_in: true,
        needs_new_name: false,
        manage_plan_url: ACCOUNT_URL,
        buy_emails_url: ACCOUNT_URL,
      },
      {
        id: 102,
        domain: "",
        status: "Provisioning",
        status_label: "Setting up your website",
        active_until: null,
        can_log_in: false,
        needs_new_name: false,
        manage_plan_url: ACCOUNT_URL,
      },
      {
        id: 103,
        domain: "",
        status: "Needs New Name",
        status_label: "Choose a new website name",
        active_until: null,
        can_log_in: false,
        needs_new_name: true,
        manage_plan_url: ACCOUNT_URL,
      },
    ],
    custom_address_records: {
      apex: [{ type: "A", value: "203.0.113.10" }],
      subdomain: [{ type: "CNAME", value: "stores.anypress.site" }],
    },
  },
};
