"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import type { SearchEntry } from "@/lib/search-index";
import styles from "./SearchBox.module.css";

/** Filters the whole index in the browser; every word must appear in the title, text or keywords. */
export function SearchBox({ index, initial }: { index: SearchEntry[]; initial: string }) {
  const router = useRouter();
  const [q, setQ] = useState(initial);
  const results = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    return index
      .map((e) => {
        const hay = `${e.title} ${e.text} ${e.keywords ?? ""} ${e.type}`.toLowerCase();
        if (!words.every((w) => hay.includes(w))) return null;
        const score = words.reduce((s, w) => s + (e.title.toLowerCase().includes(w) ? 3 : 1), 0);
        return { e, score };
      })
      .filter((x): x is { e: SearchEntry; score: number } => x !== null)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.e);
  }, [q, index]);

  return (
    <div className={styles.wrap}>
      <form
        role="search"
        className={styles.box}
        onSubmit={(e) => {
          e.preventDefault();
          router.replace(`/search?q=${encodeURIComponent(q)}`);
        }}
      >
        <MagnifyingGlass size={20} aria-hidden="true" />
        <label htmlFor="q" className="visually-hidden">Search the site</label>
        <input id="q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search fuel, gas, solar, projects…" autoFocus className={styles.input} />
      </form>
      <p className={styles.count} aria-live="polite">
        {q.trim() ? (results.length ? `${results.length} result${results.length === 1 ? "" : "s"}` : "No results. Try fewer or different words.") : "Type to search products, services, projects and articles."}
      </p>
      <ul className={styles.results}>
        {results.map((r) => (
          <li key={r.href + r.title}>
            <Link href={r.href} className={styles.result}>
              <span className="overline" style={{ color: "var(--ink-muted)" }}>{r.type}</span>
              <span className="heading-5">{r.title}</span>
              <span className={styles.text}>{r.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
