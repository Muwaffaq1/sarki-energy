import type { Metadata } from "next";
import { CTABand } from "@/components/layout/CTABand";
import { PageShell } from "@/components/layout/PageShell";
import { FaqSection } from "@/components/ui/FaqSection";
import { PageHero } from "@/components/ui/PageHero";
import { faqGroups } from "@/content/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Quotes, delivery, installation and who we are: the questions we’re asked most, answered plainly.",
  alternates: { canonical: "/faq" },
};

// Figma Templates → 18 FAQ (30:5172), one questions band per topic.
export default function FaqPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqGroups.flatMap((g) => g.faqs).filter((f) => !f.a.includes("[confirm")).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <PageShell>
      <PageHero eyebrow="FAQ" title="Questions, answered." lead="Quotes, delivery, installation and who we are. If yours isn’t here, ask an engineer directly." />
      {faqGroups.map((g, i) => (
        <FaqSection key={g.topic} id={`faq-${i}`} eyebrow={g.topic} title={g.title} faqs={g.faqs} tone={i % 2 === 0 ? "subtle" : "default"} />
      ))}
      <CTABand title="Still have a question?" text="Ask an engineer directly. We reply with arithmetic, not adjectives." />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </PageShell>
  );
}
