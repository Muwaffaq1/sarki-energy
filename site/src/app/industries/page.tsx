import type { Metadata } from "next";
import { CTABand } from "@/components/layout/CTABand";
import { PageShell } from "@/components/layout/PageShell";
import { LinkTile } from "@/components/ui/LinkTile";
import { PageHero } from "@/components/ui/PageHero";
import { audiences, industries, industryGroups } from "@/content/industries";
import styles from "@/components/segments/SegmentPage.module.css";

export const metadata: Metadata = {
  title: "Industries",
  description: "Energy for homes, businesses, factories, hospitals, schools, fleets and public infrastructure across Nigeria.",
  alternates: { canonical: "/industries" },
};

// Figma Templates → 04 Who we serve (24:1829), plus the "I am a…" pathways.
export default function IndustriesPage() {
  const bands = [
    ...industryGroups.map((g) => ({ ...g, items: g.slugs.map((s) => industries.find((i) => i.slug === s)!).map((i) => ({ ...i, href: `/industries/${i.slug}` })) })),
    { title: "Or start with who you are", lead: "Pick the closest fit and we’ll show what matters to you.", items: audiences.map((a) => ({ ...a, href: `/for/${a.slug}` })) },
  ];
  return (
    <PageShell>
      <PageHero
        eyebrow="Who we serve"
        title="Every sector draws power differently."
        lead="A hospital can’t lose its cold chain. A mill runs heavy motors through one shift. A home needs quiet evenings. We size for the load in front of us."
      />
      {bands.map((band, i) => (
        <section key={band.title} className={`section ${i % 2 === 1 ? "section--subtle" : ""}`} aria-labelledby={`band-${i}`}>
          <div className="container">
            <h2 id={`band-${i}`} className="heading-2">{band.title}</h2>
            <p className="body" style={{ color: "var(--ink-muted)", margin: "var(--space-8) 0 var(--space-32)" }}>{band.lead}</p>
            <ul className={`${styles.grid} ${styles.three}`}>
              {band.items.map((item) => (
                <li key={item.href}>
                  <LinkTile href={item.href} title={item.title} text={item.text} icon={item.icon} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
      <CTABand title="Tell us the sector. We will size the system." text="Every sector has a different load shape. We measure yours before recommending anything." />
    </PageShell>
  );
}
