import ExperienceTimeline from "@/components/experience/ExperienceTimeline";
import SectionHeading from "@/components/ui/SectionHeading";
import { SITE } from "@/data/site";

export const metadata = {
  title: `Experience & Career Journey | ${SITE.name}`,
  description: `Professional work experience, 2× ICPC regionalist milestones, and team leadership by ${SITE.name}.`,
};

export const dynamic = "force-static";

export default function ExperiencePage() {
  return (
    <main className="min-h-screen px-6 pt-36 pb-28 md:px-12 lg:px-20 max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="Career Timeline"
        title={<>Experience &amp; <span className="text-gradient">Milestones</span></>}
        description="Backend engineering roles, competitive programming achievements, hackathon leadership, and academic foundations."
      />

      <ExperienceTimeline />
    </main>
  );
}
