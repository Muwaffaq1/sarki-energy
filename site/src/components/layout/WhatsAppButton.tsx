import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { contact } from "@/content/home";
import styles from "./WhatsAppButton.module.css";

/** Floating WhatsApp chat. Fades and rises 8px once after the page settles; no pulse, no bounce. */
export function WhatsAppButton() {
  return (
    <a className={styles.button} href={contact.whatsappHref} aria-label="Chat with us on WhatsApp">
      <WhatsappLogo size={24} aria-hidden="true" />
    </a>
  );
}
