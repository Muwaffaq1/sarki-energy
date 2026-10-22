import type { ReactNode } from "react";
import styles from "./SectionHeader.module.css";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  action?: ReactNode;
  tone?: "default" | "inverse";
};

/** Eyebrow, title and lead that open every page section, with an optional link on the right. */
export function SectionHeader({ id, eyebrow, title, lead, action, tone = "default" }: Props) {
  return (
    <div className={`${styles.head} ${tone === "inverse" ? styles.inverse : ""}`}>
      <div className={styles.text}>
        <p className={`overline ${styles.eyebrow}`}>{eyebrow}</p>
        <h2 id={id} className={`heading-1 ${styles.title}`}>{title}</h2>
        {lead ? <p className={`body-lg ${styles.lead}`}>{lead}</p> : null}
      </div>
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
}
