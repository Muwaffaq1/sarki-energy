import { BusinessLines } from "@/components/home/BusinessLines";
import { EnergyProducts } from "@/components/home/EnergyProducts";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Hero } from "@/components/home/Hero";
import { Insights } from "@/components/home/Insights";
import { AudiencePicker, Industries } from "@/components/home/Pathways";
import { SEnergy } from "@/components/home/SEnergy";
import { StationNetwork } from "@/components/home/StationNetwork";
import { Sustainability } from "@/components/home/Sustainability";
import { WhoWeAre } from "@/components/home/WhoWeAre";
import { CTABand } from "@/components/layout/CTABand";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { contact } from "@/content/home";
import { site } from "@/content/site";

// Structured data so search engines can show the company's name, logo and contact details.
const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  email: contact.email,
  telephone: "+234 814 736 3336",
  address: {
    "@type": "PostalAddress",
    streetAddress: "9, Zaria Street",
    addressLocality: "Abuja",
    postalCode: "900247",
    addressCountry: "NG",
  },
};

// Section order follows docs/site-plan.md §2 and Figma Home (22:4).
export default function HomePage() {
  return (
    <>
      <SiteHeader variant="overlay" />
      <main id="main">
        <Hero />
        <AudiencePicker />
        <WhoWeAre />
        <BusinessLines />
        <EnergyProducts />
        <Industries />
        <FeaturedProjects />
        <StationNetwork />
        <SEnergy />
        <Sustainability />
        <Insights />
        <CTABand
          title="Tell us what you need. We’ll come back with numbers."
          text="Fuel, gas, solar or engineering: send the site and quantities, and an engineer replies with a quote."
        />
      </main>
      <SiteFooter />
      <WhatsAppButton />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
    </>
  );
}
