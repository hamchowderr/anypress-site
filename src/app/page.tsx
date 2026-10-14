import Link from "next/link";

const FEATURES = [
  {
    title: "Your own WordPress",
    body: "Every website runs on its own WordPress and database. No shared installs, so one site can't slow down or break another.",
  },
  {
    title: "Ready to sell",
    body: "New sites start from a store template with FluentCart, so you can add products and take orders straight away.",
  },
  {
    title: "Your domain, connected for you",
    body: "Start on a free AnyPress address. When you're ready, connect your own domain; supported DNS providers set it up in one click.",
  },
  {
    title: "Nightly backups",
    body: "Each site is backed up every night, so a bad update or a deleted page can be put back.",
  },
  {
    title: "Email from your domain",
    body: "Order emails and notices go out from your own domain once you add a few DNS records.",
  },
  {
    title: "One click to your dashboard",
    body: "Sign in to your AnyPress account and open your site's WordPress admin with a one-time link. No extra passwords.",
  },
];

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-4 pt-20 pb-16">
        <p className="text-sm font-medium text-accent">WordPress websites, hosted and ready</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          A website that&apos;s yours, without running a server.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          AnyPress sets up a complete WordPress site for you, keeps it running and backed up, and gives you the tools to
          sell from it. You build the business; we look after the hosting.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/pricing" className="rounded-md bg-accent px-5 py-2.5 font-medium text-on-accent hover:opacity-90">
            See plans
          </Link>
          <Link href="/agencies" className="rounded-md border border-line px-5 py-2.5 font-medium hover:bg-panel">
            For agencies
          </Link>
        </div>
      </section>

      <section className="border-t border-line bg-panel">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 py-16 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title}>
              <h2 className="font-semibold">{f.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-2xl font-semibold tracking-tight">Building sites for clients?</h2>
        <p className="mt-3 max-w-2xl text-muted">
          Agencies can sell AnyPress websites under their own brand, from their own WordPress shop, with their own
          prices and payment account.
        </p>
        <Link href="/agencies" className="mt-5 inline-block font-medium text-accent hover:underline">
          How it works for agencies
        </Link>
      </section>
    </>
  );
}
