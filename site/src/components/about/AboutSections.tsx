import Image from "next/image";
import { User } from "@phosphor-icons/react/dist/ssr";
import { BenefitGrid } from "@/components/ui/BenefitGrid";
import { PageHero } from "@/components/ui/PageHero";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Statements } from "@/components/ui/Statements";
import { aboutHero, leaders, lifecycle, statements, values } from "@/content/about";
import styles from "./AboutSections.module.css";

// Section ids are the anchors the About mega menu links to (content/navigation.ts).

export function AboutHero() {
  return <PageHero id="who-we-are" {...aboutHero} />;
}

export function MissionVision() {
  return <Statements id="vision" label="Mission and vision" items={statements} />;
}

export function Values() {
  return (
    <section id="approach" className="section" aria-labelledby="values-title">
      <div className="container">
        <SectionHeader id="values-title" eyebrow="How we work" title="Four things we don’t compromise on." />
        <BenefitGrid items={values} />
      </div>
    </section>
  );
}

export function Lifecycle() {
  return (
    <section id="lifecycle" className="section section--subtle" aria-labelledby="lifecycle-title">
      <div className="container">
        <SectionHeader id="lifecycle-title" eyebrow="Lifecycle" title="One partner from first study to long-term operation." />
        <ProcessSteps steps={lifecycle} />
      </div>
    </section>
  );
}

/** PersonCard (Figma 21:388). Real portraits only; until they arrive the slot briefs the shot. */
export function Leadership() {
  return (
    <section id="leadership" className="section" aria-labelledby="leadership-title">
      <div className="container">
        <SectionHeader id="leadership-title" eyebrow="Leadership" title="The people accountable for the work." />
        <ul className={styles.people}>
          {leaders.map((person, i) => (
            <li key={i} className={styles.person}>
              <div className={styles.portrait}>
                {person.portrait ? (
                  <Image src={person.portrait} alt={person.name} fill sizes="(min-width: 1024px) 300px, 50vw" />
                ) : (
                  <>
                    <User size={32} aria-hidden="true" />
                    <span className="caption">Portrait, plain background</span>
                  </>
                )}
              </div>
              <h3 className="heading-5">{person.name}</h3>
              <p className={styles.role}>{person.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
