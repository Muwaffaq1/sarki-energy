import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CapabilityStatus } from "@/components/ui/Status";
import { TextLink } from "@/components/ui/TextLink";
import type { ProductCategory } from "@/content/products";
import styles from "./ProductGrid.module.css";

/**
 * BusinessTile (Figma 61:446) used as a quote-led product tile: icon media, status, name, one line and
 * Request a quote. Each tile carries the product's id so Home and menu links can jump to it.
 */
export function ProductGrid({ category }: { category: ProductCategory }) {
  return (
    <section className="section" aria-labelledby="products-title">
      <div className="container">
        <SectionHeader id="products-title" eyebrow={`${category.title} products`} title="What we supply." />
        <div className={styles.legend}>
          <CapabilityStatus status="available" />
          <CapabilityStatus status="in-development" />
        </div>
        <ul className={styles.grid}>
          {category.products.map((p) => (
            <li key={p.slug} id={p.slug} className={styles.tile}>
              <div className={styles.media}>
                <Icon name={p.icon} size={40} className={styles.icon} />
              </div>
              <div className={styles.body}>
                <CapabilityStatus status={p.status} />
                <h3 className="heading-4">{p.name}</h3>
                <p className={styles.text}>{p.text}</p>
                <TextLink href={`/quote?product=${p.slug}`}>
                  {p.status === "available" ? "Request a quote" : "Register interest"}
                </TextLink>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
