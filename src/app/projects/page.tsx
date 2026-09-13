import ProjectCard from "@/components/projects/ProjectCard";
import FeaturedCaseStudyCard from "@/components/projects/FeaturedCaseStudyCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { PROJECTS } from "@/data/projects";
import { FLYRANK_INTERNSHIP, ASSIGNMENTS } from "@/data/flyrank-internship";
import { SITE } from "@/data/site";

export const metadata = {
  title: `Projects & Systems | ${SITE.name}`,
  description: `Production distributed systems, Model Context Protocol (MCP) servers, rate-limiting microservices, and competitive programming solutions by ${SITE.name}.`,
};

export const dynamic = "force-static";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen px-6 pt-36 pb-28 md:px-12 lg:px-20 max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="Architected & Deployed"
        title={<>Systems &amp; <span className="text-gradient">Projects</span></>}
        description="Production backend microservices, distributed rate-limiting engines, Model Context Protocol (MCP) agents, and competitive programming algorithms."
      />

      {/* Featured FlyRank AI Case Study Card */}
      <div className="mt-14">
        <FeaturedCaseStudyCard
          company={FLYRANK_INTERNSHIP.company}
          role={FLYRANK_INTERNSHIP.role}
          summary={FLYRANK_INTERNSHIP.summary}
          duration={FLYRANK_INTERNSHIP.duration}
          track={FLYRANK_INTERNSHIP.track}
          items={ASSIGNMENTS}
          caseStudyUrl="/projects/flyrank-backend-internship"
          githubUrl={FLYRANK_INTERNSHIP.githubUrl}
          extraTag={{ emoji: "⚡", label: "Capstone Quota Microservice" }}
        />
      </div>

      {/* Project Cards Grid */}
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.id} project={project} delay={(index % 2) * 0.1} />
        ))}
      </div>
    </main>
  );
}
