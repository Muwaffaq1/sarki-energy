import { ArrowRight, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { contact } from "@/content/home";
import styles from "./CTABand.module.css";

type Action = { label: string; href: string };

/** Closing band before the footer. One per page; the title states the next step in the customer’s words. */
export function CTABand({
  title,
  text,
  primary = { label: "Request a quote", href: "/quote" },
  secondary = { label: "Talk to us", href: contact.whatsappHref },
}: {
  title: string;
  text: string;
  primary?: Action;
  secondary?: Action;
}) {
  return (
    <section className={styles.band} aria-labelledby="cta-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <h2 id="cta-title" className={styles.title}>{title}</h2>
          <p className={`body-lg ${styles.text}`}>{text}</p>
        </div>
        <div className={styles.actions}>
          <Button href={primary.href} variant="accent" size="lg" iconRight={<ArrowRight size={20} aria-hidden="true" />}>
            {primary.label}
          </Button>
          <Button href={secondary.href} variant="on-inverse" size="lg" iconLeft={<WhatsappLogo size={20} aria-hidden="true" />}>
            {secondary.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
