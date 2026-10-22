import { SectionHeader } from "./SectionHeader";
import styles from "./NumberedPoints.module.css";

/** BenefitItem (Figma 18:70), number variant, 3-up on a black band (Figma: Why clients switch). */
export function NumberedPoints({ id, eyebrow, title, points }: { id: string; eyebrow: string; title: string; points: { title: string; text: string }[] }) {
  return (
    <section className="section section--inverse" aria-labelledby={id}>
      <div className="container">
        <SectionHeader id={id} eyebrow={eyebrow} title={title} tone="inverse" />
        <ol className={styles.grid}>
          {points.map((p, i) => (
            <li key={p.title} className={styles.item}>
              <span className={styles.number}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className="heading-4">{p.title}</h3>
              <p className={styles.text}>{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
