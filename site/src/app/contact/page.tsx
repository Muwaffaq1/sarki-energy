import type { Metadata } from "next";
import { EnvelopeSimple, MapPin, Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { AsideCard, FormLayout, formLayoutStyles as s } from "@/components/forms/FormLayout";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { TextLink } from "@/components/ui/TextLink";
import { contact } from "@/content/home";

export const metadata: Metadata = {
  title: "Contact",
  description: "Call, WhatsApp, email or visit Sarki Energy in Abuja.",
  alternates: { canonical: "/contact" },
};

// Composed from the design system (no Figma template): PageHero, the shared form layout, contact cards.
export default function ContactPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Contact" title="Talk to us." lead="Call, WhatsApp or email, or send a message below. For prices, Request a quote is the quickest way to get numbers." />
      <FormLayout
        label="Contact form"
        form={<EnquiryForm kind="contact" />}
        aside={
          <>
            <AsideCard title="Reach us directly">
              <a href={contact.phoneHref}><Phone size={16} aria-hidden="true" />{contact.phone}</a>
              <a href={contact.whatsappHref}><WhatsappLogo size={16} aria-hidden="true" />WhatsApp</a>
              <a href={`mailto:${contact.email}`}><EnvelopeSimple size={16} aria-hidden="true" />{contact.email}</a>
              <p className={s.small}>[confirm: department emails and phone lines for sales, projects and support]</p>
            </AsideCard>
            <AsideCard title="Visit" tone="subtle">
              <p style={{ display: "flex", gap: "var(--space-8)" }}><MapPin size={20} aria-hidden="true" style={{ flex: "none", marginTop: 2 }} />{contact.address}</p>
              <p className={s.muted}>[confirm: opening hours]</p>
              <TextLink href="https://maps.google.com/?q=9+Zaria+Street+Abuja">Open in Maps</TextLink>
            </AsideCard>
            <AsideCard title="Need a price?">
              <p className={s.small}>Request a quote asks the right questions for fuel, gas, power or engineering.</p>
              <TextLink href="/quote">Request a quote</TextLink>
            </AsideCard>
          </>
        }
      />
    </PageShell>
  );
}
