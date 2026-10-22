import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTABand } from "@/components/layout/CTABand";
import { PageShell } from "@/components/layout/PageShell";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectStatus } from "@/components/ui/Status";
import { TextLink } from "@/components/ui/TextLink";
import { projects } from "@/content/home";
import { caseStudies, getCaseStudy } from "@/content/projects";
import styles from "./case-study.module.css";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getCaseStudy((await params).slug);
  return p ? { title: `${p.title}, ${p.location}`, description: p.text, alternates: { canonical: `/projects/${p.slug}` } } : {};
}

// Figma Templates → 06 Project case study (24:2381). The client quote and gallery wait for real material.
export default async function CaseStudyPage({ params }: Params) {
  const p = getCaseStudy((await params).slug);
  if (!p) notFound();
  const more = projects.filter((c) => !c.href.endsWith(p.slug));

  return (
    <PageShell>
      <section className="section" style={{ paddingBottom: "var(--space-32)" }} aria-labelledby="page-title">
        <div className="container">
          <nav aria-label="Breadcrumb" className={styles.crumbs}>
            <Link href="/">Home</Link> <span aria-hidden="true">›</span> <Link href="/projects">Projects</Link> <span aria-hidden="true">›</span>{" "}
            <span aria-current="page">{p.title}, {p.location}</span>
          </nav>
          <div className={styles.meta}>
            <ProjectStatus status={p.status} />
            <span className="overline" style={{ color: "var(--ink-muted)" }}>{p.line} · {p.location} · {p.year}</span>
          </div>
          <h1 id="page-title" className={styles.title}>{p.headline}</h1>
        </div>
      </section>

      <div className="container">
        <div className={styles.lead}>
          <Image src={p.image} alt="" fill priority sizes="(min-width: 1280px) 1248px, 100vw" />
        </div>
      </div>

      <section className="section" aria-label="Results">
        <div className="container">
          <ul className={styles.stats}>
            {p.stats.map((s) => (
              <li key={s.label} className={styles.stat}>
                <span className={styles.statLabel}><Icon name={s.icon} size={20} />{s.label}</span>
                <span className={styles.statValue}>
                  {s.value}
                  {s.unit ? <span className={styles.unit}>{s.unit}</span> : null}
                </span>
                <span className={styles.statNote}>{s.note}</span>
              </li>
            ))}
          </ul>

          <div className={styles.split}>
            <div className={styles.story}>
              {p.story.map((b) => (
                <div key={b.title}>
                  <h2 className="heading-4">{b.title}</h2>
                  <p>{b.text}</p>
                </div>
              ))}
            </div>
            <aside className={styles.aside}>
              <p className="heading-5">Want numbers like these for your site?</p>
              <p className={styles.muted}>Tell us the site and what it runs. We measure first, then quote.</p>
              <Button href="/quote" variant="accent">Request a quote</Button>
              <TextLink href={p.line === "Engineering & EPC" ? "/business/engineering-epc" : "/business/power-renewables"}>{`About ${p.line}`}</TextLink>
            </aside>
          </div>
        </div>
      </section>

      <section className="section section--subtle" aria-labelledby="more-title">
        <div className="container">
          <SectionHeader id="more-title" eyebrow="Projects" title="More projects" action={<TextLink href="/projects">All projects</TextLink>} />
          <ProjectGrid projects={more} />
        </div>
      </section>

      <CTABand title="Have a site in mind? We’ll come and measure it." text="Tell us the site. We visit, log your load, and give you numbers you can decide with." />
    </PageShell>
  );
}
