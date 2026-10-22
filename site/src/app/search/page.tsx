import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { SearchBox } from "@/components/search/SearchBox";
import { buildSearchIndex } from "@/lib/search-index";

export const metadata: Metadata = { title: "Search", robots: { index: false } };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  return (
    <PageShell whatsapp={false}>
      <section className="section" aria-labelledby="search-title">
        <div className="container">
          <h1 id="search-title" className="heading-1" style={{ marginBottom: "var(--space-24)" }}>Search</h1>
          <SearchBox index={buildSearchIndex()} initial={q} />
        </div>
      </section>
    </PageShell>
  );
}
