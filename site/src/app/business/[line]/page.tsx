import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { CTABand } from "@/components/layout/CTABand";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { BenefitGrid } from "@/components/ui/BenefitGrid";
import { Button } from "@/components/ui/Button";
import { FaqSection } from "@/components/ui/FaqSection";
import { NumberedPoints } from "@/components/ui/NumberedPoints";
import { PageHero } from "@/components/ui/PageHero";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Statements } from "@/components/ui/Statements";
import { businessLinePages, getBusinessLine } from "@/content/business-lines";
import { contact } from "@/content/home";

type Params = { params: Promise<{ line: string }> };

export function generateStaticParams() {
  return businessLinePages.map((l) => ({ line: l.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const line = getBusinessLine((await params).line);
  if (!line) return {};
  return { title: line.title, description: line.hero.lead, alternates: { canonical: `/business/${line.slug}` } };
}

/**
 * Business line page (Figma Templates → 22 Business line). Available lines show services, how we deliver,
 * why it matters and questions; in-development lines swap the middle for "Where it stands" (PRD §31).
 */
export default async function BusinessLinePage({ params }: Params) {
  const line = getBusinessLine((await params).line);
  if (!line) notFound();
  const available = line.status === "available";

  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          tone="inverse"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Our business", href: "/business" },
          ]}
          current={line.title}
          status={line.status}
          eyebrow={line.title}
          title={line.hero.title}
          lead={line.hero.lead}
          actions={
            <>
              <Button href={line.cta.primary.href} variant="accent" size="lg" iconRight={<ArrowRight size={20} aria-hidden="true" />}>
                {line.cta.primary.label}
              </Button>
              <Button href={contact.whatsappHref} variant="on-inverse" size="lg">Talk to us</Button>
            </>
          }
        />

        <section className="section" aria-labelledby="services-title">
          <div className="container">
            <SectionHeader id="services-title" eyebrow={available ? "What we do" : "What we’re building"} title={line.servicesTitle} />
            <BenefitGrid items={line.services} columns={3} />
          </div>
        </section>

        {line.stages ? (
          <section className="section section--subtle" aria-labelledby="stages-title">
            <div className="container">
              <SectionHeader id="stages-title" eyebrow="How we deliver" title={line.stages.title} />
              <ProcessSteps steps={line.stages.steps} />
            </div>
          </section>
        ) : null}

        {line.why ? <NumberedPoints id="why-title" eyebrow="Why it matters" title={line.why.title} points={line.why.points} /> : null}

        {line.today ? (
          <Statements
            label="Where it stands"
            items={[
              { label: "Today", text: line.today.now },
              { label: "Next", text: line.today.next },
            ]}
          />
        ) : null}

        <FaqSection title={available ? "Before you book." : "Good to know."} faqs={line.faqs} tone={available ? "subtle" : "default"} />

        <CTABand
          title={line.cta.title}
          text={line.cta.text}
          primary={line.cta.primary}
          secondary={{ label: "Talk to us", href: contact.whatsappHref }}
        />
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}

