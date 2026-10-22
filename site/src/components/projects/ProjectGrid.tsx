import Image from "next/image";
import { ProjectStatus } from "@/components/ui/Status";
import { TextLink } from "@/components/ui/TextLink";
import styles from "./ProjectGrid.module.css";

type Card = { title: string; text: string; location: string; status: "delivered" | "ongoing"; image: string; href: string };

/** ProjectCard (Figma 20:248) in a 3-up grid: photo, status, location, title, one line, View project. */
export function ProjectGrid({ projects }: { projects: Card[] }) {
  return (
    <ul className={styles.grid}>
      {projects.map((p) => (
        <li key={p.href} className={styles.card}>
          <div className={styles.media}>
            <Image src={p.image} alt="" fill sizes="(min-width: 768px) 400px, 100vw" />
          </div>
          <div className={styles.body}>
            <div className={styles.meta}>
              <ProjectStatus status={p.status} />
              <span className={styles.location}>{p.location}</span>
            </div>
            <h3 className="heading-3">{p.title}</h3>
            <p className={styles.text}>{p.text}</p>
            <TextLink href={p.href}>View project</TextLink>
          </div>
        </li>
      ))}
    </ul>
  );
}
