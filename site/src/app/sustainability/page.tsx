import type { Metadata } from "next";
import { CTABand } from "@/components/layout/CTABand";
import { PageShell } from "@/components/layout/PageShell";
import { BenefitGrid } from "@/components/ui/BenefitGrid";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Statements } from "@/components/ui/Statements";
import { sustainability } from "@/content/home";

export const metadata: Metadata = {
  title: "Sustainability",
  description: "Our impact comes from the work itself: cleaner fuels, solar instead of generators, and less energy wasted.",
  alternates: { canonical: "/sustainability" },
};

// Composed from the design system. No impact figures until they are measured and verified (PRD: real figures only).
export default function SustainabilityPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Sustainability"
        title="Measured by what we install, not what we promise."
        lead="Our impact comes from the work itself: cleaner cooking fuel, gas for transport, solar before generators, and audits that cut waste before anyone buys new equipment."
        image={{ src: "/photos/hero-solar-array.jpg", alt: "Rows of solar panels on a green field" }}
      />
      <section className="section section--subtle" aria-labelledby="how-title">
        <div className="container">
          <SectionHeader id="how-title" eyebrow="Where it comes from" title="Four ways the work cuts emissions." />
          <BenefitGrid items={sustainability} />
        </div>
      </section>
      <Statements
        label="How we report it"
        items={[
          { label: "What we’ll measure", text: "Diesel hours displaced by solar, LPG supplied in place of firewood and kerosene, and energy saved after audits." },
          { label: "When we’ll publish", text: "Once monitoring data is verified, project by project. No estimates dressed up as results. [confirm]" },
        ]}
      />
      <CTABand title="Start with an audit." text="It shows what is worth doing before you spend, and what it saves." primary={{ label: "Book an energy audit", href: "/quote?service=audit" }} />
    </PageShell>
  );
}
