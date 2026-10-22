import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";
import { productCategories } from "@/content/home";
import styles from "./EnergyProducts.module.css";

/**
 * ProductCategoryCard ×3. Products are quote-led: every category carries Request a quote (PRD §8).
 * On Home it opens with a section header; the Products page drops it because its hero says the same.
 */
export function EnergyProducts({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <section className="section section--subtle" aria-labelledby={showHeader ? "products-title" : "page-title"}>
      <div className="container">
        {showHeader ? <SectionHeader
          id="products-title"
          eyebrow="Energy products"
          title="Fuel, gas and power equipment, supplied to specification."
          lead="Tell us the product, quantity and delivery point. We confirm price, availability and delivery before you commit."
          action={<TextLink href="/products">All products</TextLink>}
        /> : null}
        <ul className={styles.grid}>
          {productCategories.map((cat) => (
            <li key={cat.href} className={styles.card}>
              <div className={styles.head}>
                <span className={styles.disc}>
                  <Icon name={cat.icon} size={28} />
                </span>
                <div>
                  <h3 className="heading-4">{cat.title}</h3>
                  <p className={styles.muted}>{cat.text}</p>
                </div>
              </div>
              <ul className={styles.rows}>
                {cat.products.map((p) => (
                  <li key={p.name}>
                    <Link href={p.href} className={styles.row}>
                      <span className={styles.rowCopy}>
                        <span className="label">{p.name}</span>
                        <span className={`caption ${styles.mutedSm}`}>{p.text}</span>
                      </span>
                      <CaretRight size={16} className={styles.caret} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className={styles.footer}>
                <Button href={`/quote?category=${encodeURIComponent(cat.href.split("/").pop() ?? "")}`} variant="primary">
                  Request a quote
                </Button>
                <TextLink href={cat.href}>{cat.link}</TextLink>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
