import type { Metadata } from "next";
import { CTABand } from "@/components/layout/CTABand";
import { PageShell } from "@/components/layout/PageShell";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { PageHero } from "@/components/ui/PageHero";
import { projects } from "@/content/home";

export const metadata: Metadata = {
  title: "Projects",
  description: "Installations we have delivered and works in progress: solar, storage, engineering and CNG infrastructure.",
  alternates: { canonical: "/projects" },
};

// Figma Templates → 05 Projects (24:2111).
export default function ProjectsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Projects"
        title="Work we can stand behind."
        lead="Installations we have delivered and works in progress. We publish each project once the client is happy for us to."
      />
      <section className="section" style={{ paddingTop: 0 }} aria-label="All projects">
        <div className="container">
          <ProjectGrid projects={projects} />
        </div>
      </section>
      <CTABand title="Have a site in mind? We’ll come and measure it." text="Tell us the site. We visit, log your load, and give you numbers you can decide with." />
    </PageShell>
  );
}
