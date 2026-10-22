import Image from "next/image";
import { CapabilityStatus } from "@/components/ui/Status";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";
import { businessLines } from "@/content/home";
import styles from "./BusinessLines.module.css";

/** Our energy business: every line carries an Available now / In development status (PRD §31). */
export function BusinessLines() {
  return (
    <section className="section" aria-labelledby="business-title">
      <div className="container">
        <SectionHeader
          id="business-title"
          eyebrow="Our energy business"
          title="Seven businesses across the energy value chain."
          lead="Some run today; others are being built. Every line is labelled, so you know which is which."
          action={<TextLink href="/business">All of our business</TextLink>}
        />
        <div className={styles.legend}>
          <CapabilityStatus status="available" />
          <CapabilityStatus status="in-development" />
        </div>
        <ul className={styles.grid}>
          {businessLines.map((line) => (
            <li key={line.href} className={styles.tile}>
              <div className={styles.media}>
                {line.image ? (
                  <Image src={line.image} alt="" fill sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" />
                ) : (
                  <Icon name={line.icon} size={40} className={styles.icon} />
                )}
              </div>
              <div className={styles.body}>
                <CapabilityStatus status={line.status} />
                <h3 className="heading-4">{line.title}</h3>
                <p className={styles.services}>{line.services}</p>
                <TextLink href={line.href}>{line.link}</TextLink>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
