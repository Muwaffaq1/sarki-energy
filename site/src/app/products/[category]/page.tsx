import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { CTABand } from "@/components/layout/CTABand";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/Button";
import { FaqSection } from "@/components/ui/FaqSection";
import { PageHero } from "@/components/ui/PageHero";
import { contact } from "@/content/home";
import { getProductCategory, productCategoryPages } from "@/content/products";

type Params = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return productCategoryPages.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const category = getProductCategory((await params).category);
  if (!category) return {};
  return { title: category.title, description: category.hero.lead, alternates: { canonical: `/products/${category.slug}` } };
}

// Section order follows Figma Templates → 24 Product category (93:9370).
export default async function ProductCategoryPage({ params }: Params) {
  const category = getProductCategory((await params).category);
  if (!category) notFound();

  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
          ]}
          current={category.title}
          eyebrow={category.title}
          title={category.hero.title}
          lead={category.hero.lead}
          image={category.image}
          actions={
            <>
              <Button href={`/quote?category=${category.slug}`} variant="accent" size="lg" iconRight={<ArrowRight size={20} aria-hidden="true" />}>
                Request a quote
              </Button>
              <Button href={contact.whatsappHref} variant="secondary" size="lg">Talk to us</Button>
            </>
          }
        />
        <ProductGrid category={category} />
        <FaqSection title="Good to know." faqs={category.faqs} />
        <CTABand title={category.cta.title} text={category.cta.text} primary={{ label: "Request a quote", href: `/quote?category=${category.slug}` }} />
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}
