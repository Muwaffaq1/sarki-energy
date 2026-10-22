import Image from "next/image";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { TextLink } from "@/components/ui/TextLink";
import { whoWeAre } from "@/content/home";
import styles from "./WhoWeAre.module.css";

export function WhoWeAre() {
  return (
    <section className="section section--subtle" aria-labelledby="who-title">
      <div className={`container ${styles.split}`}>
        <div className={styles.copy}>
          <p className="overline" style={{ color: "var(--ink-muted)" }}>Who we are</p>
          <h2 id="who-title" className={`heading-1 ${styles.title}`}>{whoWeAre.title}</h2>
          <p className={`body-lg ${styles.body}`}>{whoWeAre.body}</p>
          <div className={styles.today}>
            <h3 className="label">What we do today</h3>
            <ul className={styles.list}>
              {whoWeAre.today.map((item) => (
                <li key={item}>
                  <CheckCircle size={20} className={styles.check} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <TextLink href="/about">Learn more about Sarki Energy</TextLink>
        </div>
        <div className={styles.photo}>
          <Image src={whoWeAre.image.src} alt={whoWeAre.image.alt} fill sizes="(min-width: 1024px) 560px, 100vw" />
        </div>
      </div>
    </section>
  );
}
