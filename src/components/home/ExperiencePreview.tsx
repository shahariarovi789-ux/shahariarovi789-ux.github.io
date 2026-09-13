import Link from "next/link";
import { ArrowRight, Cpu, Trophy, Building } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { EXPERIENCE } from "@/data/experience";

export default function ExperiencePreview() {
  const items = EXPERIENCE.slice(0, 3);

  return (
    <section className="px-6 py-20 md:px-12 lg:px-20 border-b border-white/10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Career & Achievements"
            title={<>Engineering Journey &amp; <span className="text-gradient">Experience</span></>}
            description="Recent backend engineering roles, competitive programming milestones, and academic background."
          />
          <Link
            href="/experience"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition-colors hover:text-blue-300"
          >
            Full Journey Timeline <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <RevealOnScroll key={item.id} delay={i * 0.1}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-surface/80 p-7 transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(59,130,246,0.15)]">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 px-3 py-1 text-[11px] font-semibold text-blue-400 font-mono">
                      {item.current ? "● Active Role" : item.period}
                    </span>
                    {item.type === "work" ? (
                      <Building className="h-4 w-4 text-muted" />
                    ) : item.type === "achievement" ? (
                      <Trophy className="h-4 w-4 text-amber-400" />
                    ) : (
                      <Cpu className="h-4 w-4 text-muted" />
                    )}
                  </div>

                  <h3 className="mt-4 font-heading text-xl font-bold text-white">
                    {item.role}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-blue-400 font-mono">
                    {item.organization}
                  </p>
                  <p className="mt-3.5 line-clamp-3 text-sm leading-relaxed text-muted">
                    {item.bullets[0]}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[10px] font-mono text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
