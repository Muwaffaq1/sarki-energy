import type { Metadata } from "next";
import { StationNetwork } from "@/components/home/StationNetwork";
import { CTABand } from "@/components/layout/CTABand";
import { PageShell } from "@/components/layout/PageShell";
import { FaqSection } from "@/components/ui/FaqSection";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Sarki Energy stations",
  description: "The Sarki Energy station network is in development. Partner on a station or register interest.",
  alternates: { canonical: "/stations" },
};

// Composed from the design system, reusing the Home station section. Clearly in development (PRD §31).
export default function StationsPage() {
  return (
    <PageShell>
      <PageHero
        status="in-development"
        breadcrumbs={[{ label: "Home", href: "/" }]}
        current="Stations"
        eyebrow="Retail energy"
        title="Every fuel under one canopy. In development."
        lead="We’re designing a station network with PMS, AGO, LPG, CNG and EV charging, plus the services that make a stop worth it. No stations are open yet."
      />
      <StationNetwork />
      <FaqSection
        title="Good to know."
        tone="default"
        faqs={[
          { q: "Where are the stations?", a: "None are open yet. Each station will get its own page with products, hours and directions when it opens." },
          { q: "Can I partner on a station?", a: "Yes. Landowners, investors and operators can tell us what they have in mind." },
          { q: "Do you supply independent stations today?", a: "Yes, through Energy supply & trading: PMS, AGO and LPG on a schedule." },
        ]}
      />
      <CTABand title="Have a site or a stake in one?" text="Landowners, investors and operators: tell us what you have in mind." primary={{ label: "Partner on a station", href: "/partners?interest=station" }} />
    </PageShell>
  );
}
