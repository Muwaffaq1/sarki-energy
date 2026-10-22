import type { Metadata } from "next";
import { AboutHero, Leadership, Lifecycle, MissionVision, Values } from "@/components/about/AboutSections";
import { CTABand } from "@/components/layout/CTABand";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { contact } from "@/content/home";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sarki Energy designs, builds and runs energy systems as infrastructure: fuel and gas supply, solar and storage, and the engineering that connects them.",
  alternates: { canonical: "/about" },
};

// Section order follows Figma Templates → 09 About (25:2921).
export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <AboutHero />
        <MissionVision />
        <Values />
        <Lifecycle />
        <Leadership />
        <CTABand
          title="Energy is infrastructure. Infrastructure is progress."
          text="Tell us what you are building and where."
          primary={{ label: "Start a project", href: "/quote" }}
          secondary={{ label: "Chat on WhatsApp", href: contact.whatsappHref }}
        />
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}
