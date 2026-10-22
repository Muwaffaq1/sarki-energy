import { SectionHeader } from "@/components/ui/SectionHeader";
import { CapabilityStatus } from "@/components/ui/Status";
import { TextLink } from "@/components/ui/TextLink";
import { businessIndex } from "@/content/business";
import styles from "./BusinessLineList.module.css";

/** CapabilityRow ×7 (Figma 20:280, Show status on): number, name + status + Explore, and the services as tags. */
export function BusinessLineList() {
  return (
    <section className="section" aria-labelledby="lines-title">
      <div className="container">
        <SectionHeader id="lines-title" eyebrow="Business lines" title="What each business covers." />
        <ol className={styles.list}>
          {businessIndex.map((line, i) => (
            <li key={line.href} className={styles.row}>
              <span className={styles.number}>{String(i + 1).padStart(2, "0")}</span>
              <div className={styles.head}>
                <div className={styles.titleRow}>
                  <h3 className="heading-3">{line.title}</h3>
                  <CapabilityStatus status={line.status} />
                </div>
                <TextLink href={line.href}>Explore</TextLink>
              </div>
              <ul className={styles.tags} aria-label={`${line.title} services`}>
                {line.tags.map((tag) => (
                  <li key={tag} className={styles.tag}>{tag}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
