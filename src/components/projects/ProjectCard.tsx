"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Code2 } from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { Project } from "@/data/projects";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Link from "next/link";

export default function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <RevealOnScroll delay={delay}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-surface/80 p-6 sm:p-7 shadow-lg shadow-black/30 transition-colors duration-300 hover:border-blue-500/40 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_25px_rgba(59,130,246,0.15)]"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-600/0 blur-3xl transition-all duration-500 group-hover:bg-blue-600/20" />

        <div>
          <div className="relative flex items-start justify-between gap-4">
            {project.featured ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 px-3 py-1 text-[11px] font-semibold text-blue-400 font-mono">
                <Sparkles className="h-3 w-3" />
                Featured System
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[11px] font-mono text-muted">
                <Code2 className="h-3 w-3" /> Project
              </span>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-muted transition-all duration-300 group-hover:border-blue-500 group-hover:text-blue-400"
              aria-label="GitHub Source"
            >
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
            </a>
          </div>

          <h3 className="relative mt-5 font-heading text-xl font-bold leading-snug sm:text-2xl text-white">
            {project.title}
          </h3>

          <p className="relative mt-3 text-sm leading-relaxed text-muted">
            {project.description}
          </p>

          <ul className="relative mt-4 space-y-2">
            {project.bullets.map((bullet, i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/80" />
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="relative mt-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-mono text-muted transition-colors group-hover:border-blue-500/30"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="relative mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-sm font-medium">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted transition-colors hover:text-white group-hover:text-blue-400"
            >
              <GithubIcon className="h-4 w-4" />
              Source Code
            </a>

            {project.caseStudyUrl && (
              <Link
                href={project.caseStudyUrl}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                Case Study →
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </RevealOnScroll>
  );
}
