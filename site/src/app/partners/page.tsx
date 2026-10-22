import type { Metadata } from "next";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { AsideCard, FormLayout, formLayoutStyles as s } from "@/components/forms/FormLayout";
import { PageShell } from "@/components/layout/PageShell";
import { BenefitGrid } from "@/components/ui/BenefitGrid";
import { PageHero } from "@/components/ui/PageHero";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Partners",
  description: "Partner with Sarki Energy on stations, supply, projects and investment.",
  alternates: { canonical: "/partners" },
};

const kinds = [
  { title: "Stations and sites", text: "Landowners and operators: partner on a Sarki Energy station. The network is in development.", icon: "gas-pump" },
  { title: "Supply and OEMs", text: "Manufacturers and distributors of fuel, gas and power equipment.", icon: "factory" },
  { title: "Projects and EPC", text: "Developers and contractors who need engineering and installation capacity.", icon: "hard-hat" },
  { title: "Finance and investment", text: "Financing for systems, stations and infrastructure.", icon: "receipt" },
  { title: "Government and development", text: "Energy access, public infrastructure and programmes.", icon: "road-horizon" },
  { title: "Technology", text: "Metering, monitoring and payments partners for SEnergy.", icon: "chart-line-up" },
] as const;

const steps = [
  { kicker: "Enquire", title: "Tell us your idea", text: "The site, product, project or investment you have in mind." },
  { kicker: "Talk", title: "A first conversation", text: "We set up a call or meeting with the right people." },
  { kicker: "Assess", title: "Numbers and fit", text: "We look at the site, the market and the terms together." },
  { kicker: "Agree", title: "A written agreement", text: "Roles, responsibilities and timelines on paper." },
];

// Composed from the design system (no Figma template). Partner logos only once real partners agree to be listed.
export default function PartnersPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Partners" title="Build the energy network with us." lead="We work with landowners, suppliers, developers, financiers and public bodies. Some partnerships support what runs today; others help build what’s in development." />
      <section className="section section--subtle" aria-labelledby="kinds-title">
        <div className="container">
          <SectionHeader id="kinds-title" eyebrow="Who we partner with" title="Six ways to work together." />
          <BenefitGrid items={[...kinds]} columns={3} />
        </div>
      </section>
      <section className="section" aria-labelledby="how-title">
        <div className="container">
          <SectionHeader id="how-title" eyebrow="How it works" title="From first message to agreement." />
          <ProcessSteps steps={steps} />
        </div>
      </section>
      <FormLayout
        label="Partnership enquiry"
        form={
          <div>
            <h2 className="heading-2" style={{ marginBottom: "var(--space-32)" }}>Start a conversation.</h2>
            <EnquiryForm kind="partner" />
          </div>
        }
        aside={
          <AsideCard title="What happens next" tone="subtle">
            <p className={s.muted}>Our partnerships team reads every enquiry and replies to set up a conversation [confirm: within 3 working days].</p>
          </AsideCard>
        }
      />
    </PageShell>
  );
}
