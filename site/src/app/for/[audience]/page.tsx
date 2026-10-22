import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SegmentPage } from "@/components/segments/SegmentPage";
import { audiences } from "@/content/industries";

type Params = { params: Promise<{ audience: string }> };

export function generateStaticParams() {
  return audiences.map((a) => ({ audience: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { audience } = await params;
  const segment = audiences.find((a) => a.slug === audience);
  return segment ? { title: `For ${segment.title.toLowerCase()}s`, description: segment.hero.lead, alternates: { canonical: `/for/${segment.slug}` } } : {};
}

export default async function AudiencePage({ params }: Params) {
  const { audience } = await params;
  const segment = audiences.find((a) => a.slug === audience);
  if (!segment) notFound();
  return <SegmentPage segment={segment} parent={{ label: "Industries", href: "/industries" }} />;
}
