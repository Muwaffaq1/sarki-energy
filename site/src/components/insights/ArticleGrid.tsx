import { TextLink } from "@/components/ui/TextLink";
import styles from "./ArticleGrid.module.css";

type Card = { href: string; meta: string; title: string; excerpt: string };

/** ArticleCard (Figma 20:270), default: hairline-topped text card, 3-up. */
export function ArticleGrid({ articles }: { articles: Card[] }) {
  return (
    <ul className={styles.grid}>
      {articles.map((a) => (
        <li key={a.href} className={styles.card}>
          <p className="overline" style={{ color: "var(--ink-muted)" }}>{a.meta}</p>
          <h3 className="heading-4">{a.title}</h3>
          <p className={styles.excerpt}>{a.excerpt}</p>
          <TextLink href={a.href}>Read</TextLink>
        </li>
      ))}
    </ul>
  );
}
