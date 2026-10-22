import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import styles from "./not-found.module.css";

// Figma Templates → 20 Not found (30:5539). Copy from the copy deck: light, then useful.
export default function NotFound() {
  return (
    <PageShell whatsapp={false}>
      <section className={`section ${styles.wrap}`} aria-labelledby="nf-title">
        <div className={`container ${styles.inner}`}>
          <p className="overline" style={{ color: "var(--ink-muted)" }}>404</p>
          <h1 id="nf-title" className={styles.title}>This page isn’t connected.</h1>
          <p className="body-lg" style={{ color: "var(--ink-muted)" }}>
            The link may be old, or the page may not be built yet. Try one of these instead.
          </p>
          <div className={styles.actions}>
            <Button href="/" variant="primary" size="lg">Back to home</Button>
            <Button href="/quote" variant="secondary" size="lg">Request a quote</Button>
          </div>
          <ul className={styles.links}>
            <li><TextLink href="/business">Our business</TextLink></li>
            <li><TextLink href="/products">Products</TextLink></li>
            <li><TextLink href="/projects">Projects</TextLink></li>
            <li><TextLink href="/contact">Contact</TextLink></li>
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
