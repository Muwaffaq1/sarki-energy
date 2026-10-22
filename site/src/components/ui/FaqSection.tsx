import { Plus, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { contact } from "@/content/home";
import styles from "./FaqSection.module.css";

/**
 * Questions band (Figma: Service detail → Questions). AccordionItem ×n on the left, section header and a
 * WhatsApp link on the right. Native <details>, so it works without JavaScript; the first answer starts open.
 */
export function FaqSection({
  title,
  faqs,
  tone = "subtle",
  eyebrow = "Questions",
  id = "faq-title",
}: {
  title: string;
  faqs: { q: string; a: string }[];
  tone?: "subtle" | "default";
  eyebrow?: string;
  id?: string;
}) {
  return (
    <section className={`section ${tone === "subtle" ? "section--subtle" : ""}`} aria-labelledby={id}>
      <div className={`container ${styles.split}`}>
        <div className={styles.head}>
          <p className="overline" style={{ color: "var(--ink-muted)" }}>{eyebrow}</p>
          <h2 id={id} className={`heading-1 ${styles.title}`}>{title}</h2>
          <p className={`body-lg ${styles.muted}`}>Anything else? Ask an engineer directly.</p>
          <a href={contact.whatsappHref} className={styles.link}>
            Ask an engineer on WhatsApp
            <WhatsappLogo size={16} aria-hidden="true" />
          </a>
        </div>
        <div className={styles.list}>
          {faqs.map((f, i) => (
            <details key={f.q} className={styles.item} open={i === 0}>
              <summary className={styles.question}>
                {f.q}
                <Plus size={20} className={styles.icon} aria-hidden="true" />
              </summary>
              <p className={styles.answer}>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
