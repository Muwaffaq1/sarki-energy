import type { Metadata } from "next";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { AsideCard, FormLayout, formLayoutStyles as s } from "@/components/forms/FormLayout";
import { Phone } from "@/components/home/SEnergy";
import { PageShell } from "@/components/layout/PageShell";
import { BenefitGrid } from "@/components/ui/BenefitGrid";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import styles from "./senergy.module.css";

export const metadata: Metadata = {
  title: "SEnergy",
  description: "SEnergy is the app we’re building to order energy, book work, pay bills and track usage. In development.",
  alternates: { canonical: "/senergy" },
};

const features = [
  { title: "Order cooking gas and fuel", text: "Refills and deliveries without a phone call.", icon: "gas-can" },
  { title: "Book work", text: "Solar installation, maintenance or an energy audit.", icon: "wrench" },
  { title: "Pay energy bills", text: "Fuel, gas and service bills in one place.", icon: "receipt" },
  { title: "Monitor usage", text: "See consumption and your energy assets at a glance.", icon: "chart-line-up" },
] as const;

// Composed from the design system. In development (PRD §31): no app store links until it exists.
export default function SEnergyPage() {
  return (
    <PageShell>
      <PageHero
        status="in-development"
        eyebrow="SEnergy"
        title="Energy services, from one app."
        lead="SEnergy is the platform we’re building so you can order energy, book work and keep track of what you use, without a phone call."
      />
      <section className="section section--subtle" aria-labelledby="features-title">
        <div className={`container ${styles.split}`}>
          <div>
            <SectionHeader id="features-title" eyebrow="What it will do" title="Four things, one place." />
            <BenefitGrid items={[...features]} columns={3} />
          </div>
          <div className={styles.stage}><Phone /></div>
        </div>
      </section>
      <div id="early-access" />
      <FormLayout
        label="Early access"
        form={
          <div>
            <h2 className="heading-2" style={{ marginBottom: "var(--space-32)" }}>Get early access.</h2>
            <EnquiryForm kind="senergy" />
          </div>
        }
        aside={
          <AsideCard title="Where it stands" tone="subtle">
            <p className={s.muted}>SEnergy is in development. Solar systems we install already include monitoring at handover [confirm]. Early-access members help shape what the app does first.</p>
          </AsideCard>
        }
      />
    </PageShell>
  );
}
