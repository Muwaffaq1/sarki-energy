import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import styles from "./TextLink.module.css";

/** Inline text action with an arrow: "Learn more", "Explore", "View project". Never the primary action. */
export function TextLink({ href, children, tone = "default" }: { href: string; children: string; tone?: "default" | "inverse" }) {
  return (
    <Link href={href} className={`${styles.link} ${tone === "inverse" ? styles.inverse : ""}`}>
      <span>{children}</span>
      <ArrowRight size={16} className={styles.arrow} aria-hidden="true" />
    </Link>
  );
}
