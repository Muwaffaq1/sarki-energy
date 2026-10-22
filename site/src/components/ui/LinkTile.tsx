import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Icon, type IconName } from "./Icon";
import styles from "./LinkTile.module.css";

/**
 * Icon disc + name + one line + arrow. Covers two Figma components:
 * AudienceTile (size "lg": the "I am a…" pathways) and SectorCard (size "md": industries).
 * Hover (pointer devices): ink border, arrow nudges 4px, 160ms ease-out.
 */
export function LinkTile({ href, title, text, icon, size = "md" }: { href: string; title: string; text: string; icon: IconName; size?: "md" | "lg" }) {
  return (
    <Link href={href} className={`${styles.tile} ${styles[size]}`}>
      <span className={styles.disc}>
        <Icon name={icon} size={24} />
      </span>
      <span className={styles.copy}>
        <span className={styles.title}>{title}</span>
        <span className={styles.text}>{text}</span>
      </span>
      <ArrowRight size={20} className={styles.arrow} aria-hidden="true" />
    </Link>
  );
}
