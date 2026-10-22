import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { CapabilityStatus } from "@/components/ui/Status";
import { TextLink } from "@/components/ui/TextLink";
import { station } from "@/content/home";
import styles from "./StationNetwork.module.css";

/** Retail energy concept. Clearly marked In development: it must not read as an existing network. */
export function StationNetwork() {
  return (
    <section className="section section--inverse" aria-labelledby="station-title">
      <div className={`container ${styles.split}`}>
        <div className={styles.copy}>
          <CapabilityStatus status="in-development" tone="inverse" />
          <p className={`overline ${styles.muted}`}>Retail energy</p>
          <h2 id="station-title" className="heading-1">{station.title}</h2>
          <p className={`body-lg ${styles.muted}`}>{station.body}</p>
          <ul className={styles.chips} aria-label="Planned services">
            {station.services.map((s) => (
              <li key={s.label} className={styles.chip}>
                <Icon name={s.icon} size={16} className={styles.chipIcon} />
                {s.label}
              </li>
            ))}
          </ul>
          <div className={styles.actions}>
            <Button href="/partners?interest=station" variant="accent" size="lg" iconRight={<ArrowRight size={20} aria-hidden="true" />}>
              Partner on a station
            </Button>
            <TextLink href="/stations" tone="inverse">Find a location (coming soon)</TextLink>
          </div>
        </div>
        <div className={styles.concept}>
          <Image src={station.image} alt="" fill sizes="(min-width: 1024px) 560px, 100vw" />
          <p className={styles.brief}>Illustrative image. The Sarki Energy station is in development.</p>
        </div>
      </div>
    </section>
  );
}
