import styles from "./Statements.module.css";

/**
 * Two labelled statements side by side on a subtle band (Figma: About → Mission and vision,
 * reused as Business line → Where it stands).
 */
export function Statements({ id, label, items }: { id?: string; label: string; items: { label: string; text: string }[] }) {
  return (
    <section id={id} className="section section--subtle" aria-label={label}>
      <div className={`container ${styles.grid}`}>
        {items.map((s) => (
          <div key={s.label} className={styles.item}>
            <h2 className="overline" style={{ color: "var(--ink-muted)" }}>{s.label}</h2>
            <p className={styles.text}>{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
