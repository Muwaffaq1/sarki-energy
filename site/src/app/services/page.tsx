import type { Metadata } from "next";
import Link from "next/link";
import { CTABand } from "@/components/layout/CTABand";
import { PageShell } from "@/components/layout/PageShell";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { CapabilityStatus } from "@/components/ui/Status";
import { TextLink } from "@/components/ui/TextLink";
import { businessLinePages } from "@/content/business-lines";
import styles from "./services.module.css";

export const metadata: Metadata = {
  title: "Services",
  description: "Every service Sarki Energy offers, grouped by business line and marked available now or in development.",
  alternates: { canonical: "/services" },
};

// Services directory, composed from the design system: every service from every business line page.
export default function ServicesPage() {
  const lines = [...businessLinePages].sort((a, b) => Number(a.status === "in-development") - Number(b.status === "in-development"));
  return (
    <PageShell>
      <PageHero eyebrow="Services" title="Everything we do, in one place." lead="Grouped by business line. Each line is marked available now or in development, so you know what you can order today." />
      {lines.map((line, i) => (
        <section key={line.slug} className={`section ${i % 2 === 0 ? "section--subtle" : ""}`} aria-labelledby={`line-${line.slug}`}>
          <div className="container">
            <div className={styles.head}>
              <div className={styles.titleRow}>
                <h2 id={`line-${line.slug}`} className="heading-2">{line.title}</h2>
                <CapabilityStatus status={line.status} />
              </div>
              <TextLink href={`/business/${line.slug}`}>{`About ${line.title.toLowerCase()}`}</TextLink>
            </div>
            <ul className={styles.grid}>
              {line.services.map((s) => (
                <li key={s.title}>
                  <Link href={`/business/${line.slug}`} className={styles.card}>
                    <Icon name={s.icon} size={24} className={styles.icon} />
                    <span className="heading-5">{s.title}</span>
                    <span className={styles.text}>{s.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
      <CTABand title="Not sure which service you need?" text="Tell us the site and the problem. An engineer replies with next steps." />
    </PageShell>
  );
}
