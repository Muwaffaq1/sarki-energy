import { BenefitGrid } from "@/components/ui/BenefitGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";
import { sustainability } from "@/content/home";

export function Sustainability() {
  return (
    <section className="section section--subtle" aria-labelledby="sustainability-title">
      <div className="container">
        <SectionHeader
          id="sustainability-title"
          eyebrow="Sustainability"
          title="Measured by what we install, not what we promise."
          lead="Our impact comes from the work itself: cleaner fuels, solar instead of generators, and less energy wasted."
          action={<TextLink href="/sustainability">Our sustainability approach</TextLink>}
        />
        <BenefitGrid items={sustainability} />
      </div>
    </section>
  );
}
