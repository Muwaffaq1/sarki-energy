import Link from "next/link";
import { EnvelopeSimple, MapPin, Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/ui/Logo";
import { contact, footer } from "@/content/home";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <Link href="/" className={styles.wordmark}>
            <Logo tone="inverse" size={32} />
            <span>Sarki Energy</span>
          </Link>
          <div className={styles.brandCopy}>
            <p className="heading-4">{footer.brandLine}</p>
            <p className={styles.muted}>{footer.blurb}</p>
          </div>
          <address className={styles.contact}>
            <span><MapPin size={16} aria-hidden="true" />{contact.address}</span>
            <a href={contact.phoneHref}><Phone size={16} aria-hidden="true" />{contact.phone}</a>
            <a href={`mailto:${contact.email}`}><EnvelopeSimple size={16} aria-hidden="true" />{contact.email}</a>
            <a href={contact.whatsappHref}><WhatsappLogo size={16} aria-hidden="true" />WhatsApp</a>
          </address>
          {/* Placeholders until Sarki confirms its handles: not links yet. */}
          <ul className={styles.social} aria-label="Social media (coming soon)">
            {footer.social.map((s) => (
              <li key={s.name} title={`${s.name} (coming soon)`}>
                <span aria-hidden="true">{s.label}</span>
                <span className="visually-hidden">{s.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.columns}>
          {footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className={styles.column}>
              <h2 className={`overline ${styles.muted}`}>{col.title}</h2>
              <ul>
                {col.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="container">
        <div className={styles.legal}>
          <p>© 2026 Sarki Energy Limited · RC 9603901 · Abuja, Nigeria</p>
          <ul>
            {footer.legal.map(([label, href]) => (
              <li key={href}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
