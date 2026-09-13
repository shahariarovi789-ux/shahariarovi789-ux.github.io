import Link from "next/link";
import { ArrowRight, ArrowUpRight, Code2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { PROJECTS } from "@/data/projects";

export default function ProjectsPreview() {
  const featured = PROJECTS.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="px-6 py-20 md:px-12 lg:px-20 border-b border-white/10 bg-surface/30">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Selected Engineering Work"
            title={<>Featured <span className="text-gradient">Projects &amp; Systems</span></>}
            description="Distributed rate limiters, Model Context Protocol (MCP) agents, and web scraping architectures."
          />
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition-colors hover:text-blue-300"
          >
            All Projects ({PROJECTS.length}) <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {featured.map((project, i) => (
            <RevealOnScroll key={project.id} delay={i * 0.1}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-surface/90 p-7 transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(59,130,246,0.15)]">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 text-[10px] font-mono text-blue-400 uppercase tracking-wide">
                      <Code2 className="h-3 w-3" /> Featured
                    </span>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted hover:text-blue-400 transition-colors"
                      aria-label="GitHub Repository"
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </a>
                  </div>

                  <h3 className="mt-4 font-heading text-xl font-bold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[10px] font-mono text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {project.caseStudyUrl ? (
                    <Link
                      href={project.caseStudyUrl}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Read Case Study <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  ) : (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-white transition-colors"
                    >
                      View Source Code <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
