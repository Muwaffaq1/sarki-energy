import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { CTABand } from "@/components/layout/CTABand";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { LinkTile } from "@/components/ui/LinkTile";
import { NumberedPoints } from "@/components/ui/NumberedPoints";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { contact } from "@/content/home";
import { offerings, type Segment } from "@/content/industries";
import styles from "./SegmentPage.module.css";

/**
 * Industry and "I am a…" pages: hero, what matters to this customer, what we offer them (linked to business
 * lines and products), and a CTA. Composed from the design system (no Figma template).
 */
export function SegmentPage({ segment, parent }: { segment: Segment; parent: { label: string; href: string } }) {
  return (
    <PageShell>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, parent]}
        current={segment.title}
        eyebrow={segment.title}
        title={segment.hero.title}
        lead={segment.hero.lead}
        actions={
          <>
            <Button href="/quote" variant="accent" size="lg" iconRight={<ArrowRight size={20} aria-hidden="true" />}>
              Request a quote
            </Button>
            <Button href={contact.whatsappHref} variant="secondary" size="lg">Talk to us</Button>
          </>
        }
      />
      <NumberedPoints id="needs-title" eyebrow="What matters" title={`What ${segment.title.toLowerCase()} customers ask us for.`} points={segment.needs} />
      <section className="section" aria-labelledby="offer-title">
        <div className="container">
          <SectionHeader id="offer-title" eyebrow="What we offer" title="Where to start." />
          <ul className={styles.grid}>
            {segment.offer.map((key) => {
              const o = offerings[key];
              return (
                <li key={key}>
                  <LinkTile size="lg" href={o.href} title={o.title} text={o.text} icon={o.icon} />
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <CTABand title="Tell us about your site. We’ll size the system." text="Every site has a different load. We measure yours before recommending anything." />
    </PageShell>
  );
}
