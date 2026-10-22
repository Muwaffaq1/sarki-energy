import type { Metadata } from "next";
import { EnvelopeSimple, Phone } from "@phosphor-icons/react/dist/ssr";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { PageHero } from "@/components/ui/PageHero";
import { contact } from "@/content/home";
import { prefillFromParams } from "@/content/quote";
import { formLayoutStyles as styles } from "@/components/forms/FormLayout";

export const metadata: Metadata = {
  title: "Request a quote",
  description: "Fuel, gas, power or engineering: tell us what you need and an engineer replies with a price, availability and a delivery date.",
  alternates: { canonical: "/quote" },
};

const next = [
  { title: "We read your request", text: "An engineer reads it, not a call centre." },
  { title: "We confirm price and delivery", text: "[confirm: within 1 working day]" },
  { title: "You decide", text: "No obligation until you accept the quote." },
];

// Figma Templates → 25 Request a quote (form 97:9048, review 97:11554).
export default async function QuotePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const prefill = prefillFromParams(await searchParams);
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          eyebrow="Request a quote"
          title="Tell us what you need."
          lead="Fuel, gas, power or engineering: pick what you need, add the details, and an engineer comes back with a price, availability and a delivery date."
        />
        <section className={styles.section} aria-label="Quote request">
          <div className={`container ${styles.split}`}>
            <QuoteForm initialService={prefill.service} initialDetails={prefill.details} />
            <aside className={styles.aside}>
              <div className={styles.next}>
                <h2 className="heading-5">What happens next</h2>
                <ol>
                  {next.map((s, i) => (
                    <li key={s.title}>
                      <span className={styles.num}>{i + 1}</span>
                      <div>
                        <p className={styles.nextTitle}>{s.title}</p>
                        <p className={styles.muted}>{s.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <div className={styles.talk}>
                <h2 className="heading-5">Prefer to talk?</h2>
                <a href={contact.phoneHref}><Phone size={16} aria-hidden="true" />{contact.phone}</a>
                <a href={`mailto:${contact.email}`}><EnvelopeSimple size={16} aria-hidden="true" />{contact.email}</a>
                <p className={styles.small}>Prefer to send it yourself? WhatsApp or email us the same details and we’ll reply the same way.</p>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
