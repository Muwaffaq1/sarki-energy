import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";
import { projects } from "@/content/home";

/** ProjectCard ×3 on Home. Photos are placeholders until Sarki supplies photos of its own work. */
export function FeaturedProjects() {
  return (
    <section className="section section--subtle" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeader
          id="projects-title"
          eyebrow="Projects"
          title="Work we can stand behind."
          action={<TextLink href="/projects">View all projects</TextLink>}
        />
        <ProjectGrid projects={projects} />
      </div>
    </section>
  );
}
