import type { Metadata } from "next";
import Image from "next/image";
import { ArticleFilter } from "@/components/insights/ArticleFilter";
import { CTABand } from "@/components/layout/CTABand";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { TextLink } from "@/components/ui/TextLink";
import { contact } from "@/content/home";
import { articles, categories } from "@/content/insights";
import styles from "./insights.module.css";

export const metadata: Metadata = {
  title: "Insights",
  description: "The questions we get asked on every survey, answered with arithmetic, not adjectives.",
  alternates: { canonical: "/insights" },
};

const card = (a: (typeof articles)[number]) => ({ href: `/insights/${a.slug}`, meta: `${a.category} · ${a.minutes} min`, title: a.title, excerpt: a.excerpt, category: a.category });

// Figma Templates → 07 Insights (25:2467): featured article, three more, then everything with topic filters.
export default function InsightsPage() {
  const [featured, ...rest] = articles;
  return (
    <PageShell>
      <PageHero eyebrow="Insights" title="Straight answers, no sales pitch." lead="The questions we get asked on every survey, answered the way we answer them on site: with arithmetic, not adjectives." />
      <section className="section" style={{ paddingTop: 0 }} aria-label="Featured">
        <div className={`container ${styles.featured}`}>
          <article className={styles.lead}>
            {featured.image ? (
              <div className={styles.media}>
                <Image src={featured.image.src} alt={featured.image.alt} fill priority sizes="(min-width: 1024px) 600px, 100vw" />
              </div>
            ) : null}
            <p className="overline" style={{ color: "var(--ink-muted)" }}>{featured.category} · {featured.minutes} min</p>
            <h2 className="heading-2">{featured.title}</h2>
            <p className={styles.muted}>{featured.excerpt}</p>
            <TextLink href={`/insights/${featured.slug}`}>Read</TextLink>
          </article>
          <ul className={styles.side}>
            {rest.slice(0, 3).map((a) => (
              <li key={a.slug}>
                <p className="overline" style={{ color: "var(--ink-muted)" }}>{a.category} · {a.minutes} min</p>
                <h3 className="heading-4">{a.title}</h3>
                <p className={styles.muted}>{a.excerpt}</p>
                <TextLink href={`/insights/${a.slug}`}>Read</TextLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="all-title">
        <div className="container">
          <h2 id="all-title" className="visually-hidden">All articles</h2>
          <ArticleFilter articles={articles.map(card)} categories={categories} />
        </div>
      </section>
      <CTABand
        title="Have a question these don’t answer?"
        text="Ask an engineer directly. We reply with arithmetic, not adjectives."
        primary={{ label: "Ask an engineer", href: contact.whatsappHref }}
        secondary={{ label: "Ask on WhatsApp", href: contact.whatsappHref }}
      />
    </PageShell>
  );
}
