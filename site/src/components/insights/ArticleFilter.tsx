"use client";

import { useState } from "react";
import { ArticleGrid } from "./ArticleGrid";
import styles from "./ArticleFilter.module.css";

type Card = { href: string; meta: string; title: string; excerpt: string; category: string };

/** Category chips over the article grid (Figma 07 Insights). Filtering happens in the browser. */
export function ArticleFilter({ articles, categories }: { articles: Card[]; categories: string[] }) {
  const [active, setActive] = useState("All");
  const shown = active === "All" ? articles : articles.filter((a) => a.category === active);
  return (
    <>
      <div className={styles.chips} role="group" aria-label="Filter articles by topic">
        {categories.map((c) => (
          <button key={c} type="button" className={styles.chip} aria-pressed={active === c} onClick={() => setActive(c)}>
            {c}
          </button>
        ))}
      </div>
      <p className="visually-hidden" aria-live="polite">{shown.length} articles</p>
      <ArticleGrid articles={shown} />
    </>
  );
}
