import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SegmentPage } from "@/components/segments/SegmentPage";
import { industries } from "@/content/industries";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const segment = industries.find((i) => i.slug === slug);
  return segment ? { title: segment.title, description: segment.hero.lead, alternates: { canonical: `/industries/${segment.slug}` } } : {};
}

export default async function IndustryPage({ params }: Params) {
  const { slug } = await params;
  const segment = industries.find((i) => i.slug === slug);
  if (!segment) notFound();
  return <SegmentPage segment={segment} parent={{ label: "Industries", href: "/industries" }} />;
}
