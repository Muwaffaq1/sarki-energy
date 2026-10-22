import styles from "./ProcessSteps.module.css";

/** ProcessStep (Figma 18:84), horizontal: a 4-up row of numbered stages under an ink rule. */
export function ProcessSteps({ steps }: { steps: { kicker: string; title: string; text: string }[] }) {
  return (
    <ol className={styles.steps}>
      {steps.map((step, i) => (
        <li key={step.kicker} className={styles.step}>
          <span className={styles.number}>{String(i + 1).padStart(2, "0")}</span>
          <div className={styles.body}>
            <p className="overline" style={{ color: "var(--ink-muted)" }}>{step.kicker}</p>
            <h3 className="heading-4">{step.title}</h3>
            <p className={styles.text}>{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
