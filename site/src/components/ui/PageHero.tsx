import Image from "next/image";
import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";
import { CapabilityStatus, type Capability } from "./Status";
import styles from "./PageHero.module.css";

type Props = {
  id?: string;
  eyebrow: string;
  title: string;
  lead: string;
  actions?: ReactNode;
  image?: { src: string; alt: string };
  /** Page (white) or Inverse (black band, used on business line and service pages). */
  tone?: "page" | "inverse";
  breadcrumbs?: { label: string; href: string }[];
  /** The current page, shown last in the breadcrumbs. */
  current?: string;
  status?: Capability;
};

/**
 * Hero (Figma 19:337), Page and Inverse variants: optional breadcrumbs and Available now / In development
 * status, display-xl title, lead, optional actions and an optional photo on the right.
 */
export function PageHero({ id, eyebrow, title, lead, actions, image, tone = "page", breadcrumbs, current, status }: Props) {
  const inverse = tone === "inverse";
  return (
    <section id={id} className={`section ${styles.hero} ${inverse ? styles.inverse : ""}`} aria-labelledby="page-title">
      <div className={`container ${image ? styles.split : ""}`}>
        <div className={styles.text}>
          {breadcrumbs ? (
            <nav aria-label="Breadcrumb">
              <ol className={styles.crumbs}>
                {breadcrumbs.map((c) => (
                  <li key={c.href}>
                    <Link href={c.href}>{c.label}</Link>
                    <CaretRight size={12} aria-hidden="true" />
                  </li>
                ))}
                {current ? <li aria-current="page" className={styles.currentCrumb}>{current}</li> : null}
              </ol>
            </nav>
          ) : null}
          {status ? <CapabilityStatus status={status} tone={inverse ? "inverse" : "default"} /> : null}
          <p className={`overline ${styles.eyebrow}`}>{eyebrow}</p>
          <h1 id="page-title" className={styles.title}>{title}</h1>
          <p className={`body-lg ${styles.lead}`}>{lead}</p>
          {actions ? <div className={styles.actions}>{actions}</div> : null}
        </div>
        {image ? (
          <div className={styles.media}>
            <Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 1024px) 560px, 100vw" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
