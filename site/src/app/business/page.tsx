import type { Metadata } from "next";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { BusinessLineList } from "@/components/business/BusinessLineList";
import { CTABand } from "@/components/layout/CTABand";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { businessHero } from "@/content/business";

export const metadata: Metadata = {
  title: "Our business",
  description:
    "Sarki Energy's seven business lines: supply and trading, gas, power and renewables, engineering and EPC, infrastructure, logistics and technology. Each is marked available now or in development.",
  alternates: { canonical: "/business" },
};

// Section order follows Figma Templates → 21 Our business (86:9492).
export default function BusinessPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          {...businessHero}
          actions={
            <Button href="/quote" variant="accent" size="lg" iconRight={<ArrowRight size={20} aria-hidden="true" />}>
              Request a quote
            </Button>
          }
        />
        <BusinessLineList />
        <CTABand
          title="Not sure which business you need?"
          text="Tell us the site and what it needs to run. An engineer replies with next steps."
        />
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}
