import { PageHero } from "@/components/ui";

/** A legal document: page heading, effective date, then the approved text. */
export function LegalPage({ title, effective, html }: { title: string; effective: string; html: string }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} lead={`Effective date: ${effective}`} />
      <section>
        <div className="legal mx-auto max-w-3xl px-4 py-16 sm:px-6" dangerouslySetInnerHTML={{ __html: html }} />
      </section>
    </>
  );
}
