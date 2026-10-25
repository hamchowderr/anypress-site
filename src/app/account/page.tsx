import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ACCOUNT_URL } from "@/lib/site";
import {
  SignedOut,
  accessExpired,
  accountApi,
  accountSignInEnabled,
  getSession,
  type DnsRecord,
  type Me,
  type Websites,
} from "@/lib/account";
import { logInToWebsite } from "./actions";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: "/account",
  title: "Your websites",
  description: "Sign in to see your AnyPress websites, open each one's WordPress editor and connect your own domain.",
  noIndex: true,
});

export default function Account({ searchParams }: PageProps<"/account">) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Your websites</h1>
      <Suspense fallback={<p className="mt-6 text-muted">Loading your websites…</p>}>
        <AccountBody searchParams={searchParams} />
      </Suspense>
    </section>
  );
}

async function AccountBody({ searchParams }: Pick<PageProps<"/account">, "searchParams">) {
  const { error } = await searchParams;
  if (!accountSignInEnabled()) {
    redirect(ACCOUNT_URL);
  }

  const session = await getSession();
  if (!session) {
    return (
      <div className="mt-6">
        {error === "sign-in" && <p className="mb-4 text-sm">Signing in didn&apos;t work. Please try again.</p>}
        <p className="text-muted">Sign in with your AnyPress account to see and manage your websites.</p>
        <a
          href="/api/auth/signin?next=/account"
          className="mt-6 inline-block rounded-md bg-accent px-4 py-2.5 font-medium text-on-accent hover:opacity-90"
        >
          Sign in
        </a>
      </div>
    );
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

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
        <span>Signed in as {me.email}</span>
        <form action="/api/auth/signout" method="post">
          <button type="submit" className="hover:text-accent">
            Sign out
          </button>
        </form>
      </div>
      {typeof error === "string" && error !== "sign-in" && <p className="mt-4 text-sm">{error}</p>}

      {data.websites.length === 0 ? (
        <p className="mt-8 text-muted">
          You don&apos;t have a website yet. <a href="/pricing" className="text-accent">See the plans</a>.
        </p>
      ) : (
        <ul className="mt-8 space-y-4">
          {data.websites.map((site) => (
            <li key={site.id} className="flex flex-wrap items-center gap-4 rounded-lg border border-line p-5">
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{site.domain || "Your new website"}</p>
                <p className="mt-1 text-sm text-muted">
                  {site.status_label}
                  {site.active_until && ` · online until ${new Date(site.active_until).toLocaleDateString("en-US", { dateStyle: "medium" })}`}
                </p>
                {site.needs_new_name && (
                  <p className="mt-1 text-sm">
                    That website name was taken. <a href={ACCOUNT_URL} className="text-accent">Choose a new one</a>.
                  </p>
                )}
              </div>
              {site.can_log_in && (
                <form action={logInToWebsite}>
                  <input type="hidden" name="id" value={site.id} />
                  <button type="submit" className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-on-accent hover:opacity-90">
                    Log in to WordPress
                  </button>
                </form>
              )}
              <a href={site.manage_plan_url} className="text-sm hover:text-accent">
                Manage plan
              </a>
            </li>
          ))}
        </ul>
      )}

      {data.custom_address_records && data.websites.length > 0 && (
        <div className="mt-12 text-sm">
          <h2 className="text-lg font-semibold">Using your own domain</h2>
          <p className="mt-2 text-muted">
            Add these records at your domain&apos;s DNS host, then change the address on the{" "}
            <a href={ACCOUNT_URL} className="text-accent">account page</a>.
          </p>
          <Records title="For a domain like example.com" records={data.custom_address_records.apex} />
          <Records title="For a subdomain like shop.example.com" records={data.custom_address_records.subdomain} />
        </div>
      )}
    </div>
  );
}

function Records({ title, records }: { title: string; records: DnsRecord[] }) {
  if (records.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <p className="font-medium">{title}</p>
      <ul className="mt-1 font-mono">
        {records.map((r) => (
          <li key={`${r.type}${r.value}`}>
            {r.type} {r.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
