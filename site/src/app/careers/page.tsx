import type { Metadata } from "next";
import { Briefcase } from "@phosphor-icons/react/dist/ssr";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { AsideCard, FormLayout, formLayoutStyles as s } from "@/components/forms/FormLayout";
import { PageShell } from "@/components/layout/PageShell";
import { BenefitGrid } from "@/components/ui/BenefitGrid";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { values } from "@/content/about";
import styles from "./careers.module.css";

export const metadata: Metadata = {
  title: "Careers",
  description: "Engineering, field, supply and operations roles at Sarki Energy.",
  alternates: { canonical: "/careers" },
};

// Vacancies will come from the CMS. Until then there are none to list, so the page says so and takes
// general applications. Composed from the design system (no Figma template).
const vacancies: { title: string; location: string; type: string; href: string }[] = [];

export default function CareersPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Careers" title="Build energy infrastructure with us." lead="Engineers, installers, supply and operations people who like work they can stand behind." />
      <section className="section section--subtle" aria-labelledby="values-title">
        <div className="container">
          <SectionHeader id="values-title" eyebrow="How we work" title="What we expect of each other." />
          <BenefitGrid items={values} />
        </div>
      </section>
      <section className="section" aria-labelledby="roles-title">
        <div className="container">
          <SectionHeader id="roles-title" eyebrow="Open roles" title="Current vacancies." />
          {vacancies.length === 0 ? (
            <div className={styles.empty}>
              <Briefcase size={32} aria-hidden="true" />
              <p className="heading-5">No open roles right now.</p>
              <p className={s.muted}>Send a general application below and we’ll contact you when a matching role opens.</p>
            </div>
          ) : null}
        </div>
      </section>
      <FormLayout
        label="General application"
        form={
          <div>
            <h2 className="heading-2" style={{ marginBottom: "var(--space-32)" }}>Send a general application.</h2>
            <EnquiryForm kind="career" />
          </div>
        }
        aside={
          <AsideCard title="How we hire" tone="subtle">
            <p className={s.muted}>We review applications against open and upcoming roles. If there’s a fit, we invite you to a conversation, then a practical assessment for technical roles. [confirm]</p>
          </AsideCard>
        }
      />
    </PageShell>
  );
}
