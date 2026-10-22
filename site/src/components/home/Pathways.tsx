import { LinkTile } from "@/components/ui/LinkTile";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";
import { audiences, industries } from "@/content/home";
import styles from "./Pathways.module.css";

/** "I am a…": eight customer pathways, each leading to a tailored page. */
export function AudiencePicker() {
  return (
    <section className="section" aria-labelledby="audiences-title">
      <div className="container">
        <SectionHeader
          id="audiences-title"
          eyebrow="I am a…"
          title="Start with who you are."
          lead="Pick the closest fit and we’ll show the products and services that matter to you."
        />
        <ul className={`${styles.grid} ${styles.four}`}>
          {audiences.map((a) => (
            <li key={a.href}>
              <LinkTile size="lg" {...a} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Industries() {
  return (
    <section className="section" aria-labelledby="industries-title">
      <div className="container">
        <SectionHeader
          id="industries-title"
          eyebrow="Industries we serve"
          title="Every sector draws power differently."
          lead="A hospital can’t lose its cold chain. A mill runs heavy motors through one shift. We size for the load in front of us."
          action={<TextLink href="/industries">All industries</TextLink>}
        />
        <ul className={`${styles.grid} ${styles.three}`}>
          {industries.map((i) => (
            <li key={i.href}>
              <LinkTile {...i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
