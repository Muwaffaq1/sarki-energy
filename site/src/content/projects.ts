// Projects index and case studies (Figma Templates → 05 Projects, 06 Project case study).
// Every figure and story here is a draft for Sarki to confirm; the copy deck notes the Kano numbers are a
// layout example. Photos are placeholders until Sarki supplies its own (see public/photos/CREDITS.md).
import type { IconName } from "@/components/ui/Icon";
import { projects as cards } from "./home";

export type CaseStudy = {
  slug: string;
  title: string;
  location: string;
  status: "delivered" | "ongoing";
  year: string;
  line: string;
  text: string;
  image: string;
  headline: string;
  stats: { label: string; value: string; unit?: string; note: string; icon: IconName }[];
  story: { title: string; text: string }[];
};

const details: Record<string, Omit<CaseStudy, "slug" | "title" | "location" | "status" | "text" | "image">> = {
  "home-solar-systems": {
    year: "2026",
    line: "Power & renewables",
    headline: "Home solar systems that carry the evening without the generator.",
    stats: [
      { label: "Homes", value: "[confirm]", note: "Systems installed in Abuja", icon: "house" },
      { label: "Typical system", value: "[confirm]", unit: "kVA", note: "Inverter size per home", icon: "solar-panel" },
      { label: "Storage", value: "[confirm]", unit: "kWh", note: "Lithium, sized for the evening", icon: "battery-charging" },
      { label: "Install time", value: "[confirm]", unit: "days", note: "On site per home", icon: "wrench" },
    ],
    story: [
      { title: "The problem", text: "[confirm] Households running generators most evenings, with fuel and servicing costs rising and outages unpredictable." },
      { title: "What we built", text: "Inverter, battery and rooftop PV for each home, from board and inverter mounting to commissioning, sized on a logged day of each household’s load." },
      { title: "The result", text: "[confirm: measured generator hours and fuel saved after three months of monitoring]" },
    ],
  },
  "commercial-rooftop-pv": {
    year: "2026",
    line: "Power & renewables",
    headline: "A rooftop array that runs a site through the evening shift.",
    stats: [
      { label: "Array", value: "[confirm]", unit: "kWp", note: "Commissioned [confirm]", icon: "solar-panel" },
      { label: "Storage", value: "[confirm]", unit: "kWh", note: "Lithium, evening load", icon: "battery-charging" },
      { label: "Diesel saved", value: "[confirm]", unit: "%", note: "vs the 3 months before", icon: "gas-pump" },
      { label: "Build time", value: "[confirm]", unit: "weeks", note: "Survey to handover", icon: "wrench" },
    ],
    story: [
      { title: "The problem", text: "[confirm] A site in Kano running long hours on diesel, with outages interrupting production." },
      { title: "What we built", text: "Multi-array rooftop PV with parallel inverter walls and lithium storage, designed around the site’s measured load." },
      { title: "The result", text: "[confirm: measured output and savings after three months of monitoring]" },
    ],
  },
  "cng-infrastructure": {
    year: "2026",
    line: "Engineering & EPC",
    headline: "Civil and pipeline works for compressed natural gas.",
    stats: [
      { label: "Scope", value: "Civil", note: "Trenching, pipe laying, station build-out", icon: "hard-hat" },
      { label: "Pipeline", value: "[confirm]", unit: "m", note: "Laid to date", icon: "road-horizon" },
      { label: "Location", value: "Kaduna", note: "Ongoing", icon: "map-pin" },
      { label: "Status", value: "Ongoing", note: "[confirm: expected completion]", icon: "gauge" },
    ],
    story: [
      { title: "The brief", text: "[confirm] Civil and pipeline works to bring compressed natural gas to a new station site." },
      { title: "What we’re building", text: "Trenching, HDPE pipe laying, reinforcement and station build-out, delivered by our engineering team." },
      { title: "Where it stands", text: "Work is ongoing. We’ll publish results when the project is complete and the client is happy for us to." },
    ],
  },
};

const images: Record<string, string> = {
  "home-solar-systems": "/photos/project-home-solar.jpg",
  "commercial-rooftop-pv": "/photos/project-commercial-rooftop.jpg",
  "cng-infrastructure": "/photos/project-cng.jpg",
};

export const caseStudies: CaseStudy[] = cards.map((c) => {
  const slug = c.href.split("/").pop()!;
  return { slug, title: c.title, location: c.location, status: c.status, text: c.text, image: images[slug], ...details[slug] };
});

export function getCaseStudy(slug: string) {
  return caseStudies.find((p) => p.slug === slug);
}
