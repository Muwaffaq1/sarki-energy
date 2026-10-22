import { ArticleGrid } from "@/components/insights/ArticleGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";
import { insights } from "@/content/home";

export function Insights() {
  return (
    <section className="section" aria-labelledby="insights-title">
      <div className="container">
        <SectionHeader
          id="insights-title"
          eyebrow="Insights"
          title="Straight answers, no sales pitch."
          action={<TextLink href="/insights">All articles</TextLink>}
        />
        <ArticleGrid articles={insights} />
      </div>
    </section>
  );
}
