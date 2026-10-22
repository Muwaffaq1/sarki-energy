// About page content, matching Figma (Templates → 09 About, desktop 25:2921). [confirm] marks facts Sarki must check.
import type { IconName } from "@/components/ui/Icon";

export const aboutHero = {
  eyebrow: "About us",
  title: "Building the energy systems behind progress.",
  lead: "We make energy work as infrastructure: designed, built and run as one system, by one accountable team.",
  // Placeholder (Unsplash) until Sarki supplies photos of its own team on site.
  image: { src: "/photos/about-team-on-site.jpg", alt: "Engineers in hard hats and safety vests on a construction site" },
};

// [confirm] wording with Sarki.
export const statements = [
  { label: "Mission", text: "To provide world-class energy services and infrastructure that power progress." },
  { label: "Vision", text: "To become one of the most trusted and innovative energy companies in Africa." },
];

export const values: { title: string; text: string; icon: IconName }[] = [
  { title: "Technical competence", text: "Certified engineers, proper tools, documented work.", icon: "wrench" },
  { title: "Transparency & quality", text: "Clear quotes, real specs, checked installations.", icon: "shield-check" },
  { title: "Client-centred", text: "Sized on your site and budget, not our stock.", icon: "users-three" },
  { title: "Innovation driven", text: "Research that turns into better systems.", icon: "lightbulb" },
];

export const lifecycle = [
  { kicker: "Study", title: "Audits and feasibility", text: "Load studies, site surveys and the business case." },
  { kicker: "Design", title: "Engineering and specification", text: "Drawings, equipment schedules and approvals." },
  { kicker: "Build", title: "Procurement and construction", text: "Sourcing, civil works, installation, commissioning." },
  { kicker: "Operate", title: "Monitoring and maintenance", text: "Remote monitoring, service visits, performance reports." },
];

// [confirm] names, roles and portraits with Sarki. Real portraits only (Figma PersonCard), so these stay as
// briefed placeholders rather than stock faces.
export const leaders: { name: string; role: string; portrait?: string }[] = [
  { name: "Name Surname", role: "Role" },
  { name: "Name Surname", role: "Role" },
  { name: "Name Surname", role: "Role" },
  { name: "Name Surname", role: "Role" },
];
