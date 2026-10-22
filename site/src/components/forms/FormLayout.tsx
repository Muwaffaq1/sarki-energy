import type { ReactNode } from "react";
import styles from "./FormLayout.module.css";

/** Form on the left, a sticky aside on the right (Figma 10 Start a project / 25 Request a quote). */
export function FormLayout({ label, form, aside }: { label: string; form: ReactNode; aside: ReactNode }) {
  return (
    <section className={styles.section} aria-label={label}>
      <div className={`container ${styles.split}`}>
        {form}
        <aside className={styles.aside}>{aside}</aside>
      </div>
    </section>
  );
}

/** A card in the aside: title, then free content. */
export function AsideCard({ title, tone = "outline", children }: { title: string; tone?: "outline" | "subtle"; children: ReactNode }) {
  return (
    <div className={tone === "subtle" ? styles.next : styles.talk}>
      <h2 className="heading-5">{title}</h2>
      {children}
    </div>
  );
}

export { styles as formLayoutStyles };
