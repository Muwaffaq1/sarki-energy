import type { Metadata } from "next";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { EnergyProducts } from "@/components/home/EnergyProducts";
import { CTABand } from "@/components/layout/CTABand";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { contact } from "@/content/home";
import { orderingSteps, productsHero } from "@/content/products";

export const metadata: Metadata = {
  title: "Products",
  description: productsHero.lead,
  alternates: { canonical: "/products" },
};

// Section order follows Figma Templates → 23 Products (92:8477).
export default function ProductsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          {...productsHero}
          actions={
            <>
              <Button href="/quote" variant="accent" size="lg" iconRight={<ArrowRight size={20} aria-hidden="true" />}>
                Request a quote
              </Button>
              <Button href={contact.whatsappHref} variant="secondary" size="lg">Talk to us</Button>
            </>
          }
        />
        <EnergyProducts showHeader={false} />
        <section className="section" aria-labelledby="ordering-title">
          <div className="container">
            <SectionHeader id="ordering-title" eyebrow="How ordering works" title="From request to delivery note." />
            <ProcessSteps steps={orderingSteps} />
          </div>
        </section>
        <CTABand
          title="Buying for a project?"
          text="Send us your parts list or fuel schedule. We quote bulk and project supply."
        />
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}
