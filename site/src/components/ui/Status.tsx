import styles from "./Status.module.css";

export type Capability = "available" | "in-development";

const LABEL: Record<Capability, string> = { available: "Available now", "in-development": "In development" };

/**
 * Marks a business line, product, service or station as Available now or In development (PRD §31).
 * The status is a CMS field; never imply an asset Sarki does not have.
 */
export function CapabilityStatus({ status, tone = "default" }: { status: Capability; tone?: "default" | "inverse" }) {
  return (
    <span className={`${styles.pill} ${styles[status]} ${tone === "inverse" ? styles.inverse : ""}`}>
      <span className={styles.dot} aria-hidden="true" />
      {LABEL[status]}
    </span>
  );
}

/** Project status badge. The dot keeps meaning from depending on colour alone. */
export function ProjectStatus({ status }: { status: "delivered" | "ongoing" }) {
  return (
    <span className={`${styles.badge} ${styles[status]}`}>
      <span className={styles.dot} aria-hidden="true" />
      {status === "delivered" ? "Delivered" : "Ongoing"}
    </span>
  );
}
