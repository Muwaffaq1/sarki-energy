import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ArticleGrid } from "@/components/insights/ArticleGrid";
import { CTABand } from "@/components/layout/CTABand";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { articles, formatDate, getArticle } from "@/content/insights";
import styles from "./article.module.css";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const a = getArticle((await params).slug);
  return a ? { title: a.title, description: a.excerpt, alternates: { canonical: `/insights/${a.slug}` }, openGraph: { type: "article", publishedTime: a.date } } : {};
}

// Figma Templates → 08 Article (25:2751).
export default async function ArticlePage({ params }: Params) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  const more = [...articles.filter((x) => x.slug !== a.slug && x.category === a.category), ...articles.filter((x) => x.category !== a.category)].slice(0, 3);

  return (
    <PageShell>
      <div className={`container ${styles.layout}`}>
        <article className={styles.article} aria-labelledby="article-title">
          <nav aria-label="Breadcrumb" className={styles.crumbs}>
            <Link href="/">Home</Link> <span aria-hidden="true">›</span> <Link href="/insights">Insights</Link> <span aria-hidden="true">›</span>{" "}
            <span aria-current="page">{a.category}</span>
          </nav>
          <p className="overline" style={{ color: "var(--ink-muted)" }}>
            {a.category} · {a.minutes} min read · <time dateTime={a.date}>{formatDate(a.date)}</time>
          </p>
          <h1 id="article-title" className={styles.title}>{a.title}</h1>
          <p className={`body-lg ${styles.muted}`}>{a.excerpt}</p>
          {a.image ? (
            <div className={styles.media}>
              <Image src={a.image.src} alt={a.image.alt} fill priority sizes="(min-width: 1024px) 760px, 100vw" />
            </div>
          ) : null}
          <div className={styles.body}>
            {a.body.map((b, i) =>
              b.type === "h2" ? (
                <h2 key={i} className="heading-4">{b.text}</h2>
              ) : b.type === "ul" ? (
                <ul key={i}>{b.items.map((it) => <li key={it}>{it}</li>)}</ul>
              ) : (
                <p key={i}>{b.text}</p>
              ),
            )}
          </div>
        </article>
        <aside className={styles.aside}>
          <p className="heading-5">Want this worked out for your site?</p>
          <p className={styles.muted}>Send your monthly fuel spend and we’ll compare it with solar and grid.</p>
          <Button href="/quote?service=audit" variant="accent" iconRight={<ArrowRight size={16} aria-hidden="true" />}>Compare my costs</Button>
        </aside>
      </div>

      <section className="section section--subtle" aria-labelledby="more-title">
        <div className="container">
          <h2 id="more-title" className="heading-2" style={{ marginBottom: "var(--space-32)" }}>Keep reading</h2>
          <ArticleGrid articles={more.map((m) => ({ href: `/insights/${m.slug}`, meta: `${m.category} · ${m.minutes} min`, title: m.title, excerpt: m.excerpt }))} />
        </div>
      </section>
      <CTABand title="Have a site in mind? We’ll come and measure it." text="Tell us the site. We visit, log your load, and give you numbers you can decide with." />
    </PageShell>
  );
}
