import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { formatDate } from "@/content/insights";
import { getPolicy, policies } from "@/content/legal";
import styles from "./policy.module.css";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return policies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getPolicy((await params).slug);
  return p ? { title: p.title, description: p.intro, alternates: { canonical: `/legal/${p.slug}` } } : {};
}

// Figma Templates → 19 Policy (30:5406): contents list on the left, sections on the right.
export default async function PolicyPage({ params }: Params) {
  const p = getPolicy((await params).slug);
  if (!p) notFound();
  return (
    <PageShell whatsapp={false}>
      <PageHero eyebrow={`Last updated ${formatDate(p.updated)}`} title={p.title} lead={p.intro} />
      <section className="section" style={{ paddingTop: 0 }} aria-label={p.title}>
        <div className={`container ${styles.layout}`}>
          <nav aria-label="On this page" className={styles.toc}>
            <p className="overline" style={{ color: "var(--ink-muted)" }}>On this page</p>
            <ol>
              {p.sections.map((s, i) => (
                <li key={s.title}><a href={`#s${i + 1}`}>{s.title}</a></li>
              ))}
            </ol>
            <p className="overline" style={{ color: "var(--ink-muted)", marginTop: "var(--space-24)" }}>Other policies</p>
            <ul>
              {policies.filter((o) => o.slug !== p.slug).map((o) => (
                <li key={o.slug}><Link href={`/legal/${o.slug}`}>{o.title}</Link></li>
              ))}
            </ul>
          </nav>
          <div className={styles.body}>
            <p className={styles.draft} role="note">Draft for legal review. Sarki Energy’s lawyers will complete this policy before launch.</p>
            {p.sections.map((s, i) => (
              <div key={s.title} id={`s${i + 1}`} className={styles.block}>
                <h2 className="heading-4">{i + 1}. {s.title}</h2>
                {s.text.map((t) => <p key={t}>{t}</p>)}
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
