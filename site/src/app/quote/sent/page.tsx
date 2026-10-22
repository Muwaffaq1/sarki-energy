import type { Metadata } from "next";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/Button";
import styles from "./sent.module.css";

export const metadata: Metadata = { title: "Quote request sent", robots: { index: false } };

// Figma Templates → 25 Request a quote (sent 97:11814).
export default async function QuoteSentPage({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const { ref } = await searchParams;
  const reference = ref && /^SE-\d{4}-\d{4}$/.test(ref) ? ref : null;
  const steps = [
    { n: "✓", title: "Request received", text: "Just now" },
    { n: "2", title: "We confirm price and delivery", text: "[confirm: within 1 working day]" },
    { n: "3", title: "You decide", text: "No obligation until you accept the quote." },
  ];
  return (
    <>
      <SiteHeader />
      <main id="main" className={styles.main}>
        <div className={styles.card}>
          <CheckCircle size={48} className={styles.check} aria-hidden="true" />
          {reference ? <p className="overline" style={{ color: "var(--ink-muted)" }}>Request {reference}</p> : null}
          <h1 className={styles.title}>Quote request sent.</h1>
          <p className={`body-lg ${styles.muted}`}>
            An engineer will reply with price, availability and a delivery date by WhatsApp or email [confirm: within 1 working day].
          </p>
          <ol className={styles.steps}>
            {steps.map((s, i) => (
              <li key={s.title}>
                <span className={`${styles.num} ${i === 0 ? styles.done : ""}`}>{s.n}</span>
                <div>
                  <p className={styles.stepTitle}>{s.title}</p>
                  <p className={styles.muted}>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className={styles.actions}>
            <Button href="/" variant="primary" size="lg">Back to home</Button>
            <Button href="/products" variant="secondary" size="lg">Explore products</Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
