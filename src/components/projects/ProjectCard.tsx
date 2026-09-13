"use client";

import { motion, Variants } from "framer-motion";
import { ArrowUpRight, Sparkles, Code2 } from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { Project } from "@/data/projects";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Link from "next/link";

const cardVariants: Variants = {
  rest: { y: 0, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" },
  hover: {
    y: -8,
    boxShadow: "0 20px 40px rgba(0,0,0,0.6), 0 0 30px rgba(59,130,246,0.18)",
    transition: { duration: 0.28, ease: "easeOut" },
  },
};

const bulletContainer: Variants = {
  rest: {},
  hover: { transition: { staggerChildren: 0.05 } },
};

const bulletItem: Variants = {
  rest: { x: 0 },
  hover: { x: 4, transition: { duration: 0.2 } },
};



export default function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <RevealOnScroll delay={delay}>
      <motion.div
        variants={cardVariants}
        initial="rest"
        whileHover="hover"
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-surface/80 p-6 sm:p-7 shadow-lg shadow-black/30 transition-colors duration-300 hover:border-blue-500/40"
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-600/0 blur-3xl transition-all duration-500 group-hover:bg-blue-600/20" />

        {/* Shimmer sweep overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/[0.06] to-transparent skew-x-12" />
        </div>

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
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-muted transition-all duration-300 group-hover:border-blue-500 group-hover:text-blue-400 group-hover:rotate-45"
              aria-label="GitHub Source"
            >
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300" />
            </a>
          </div>

          <h3 className="relative mt-5 font-heading text-xl font-bold leading-snug sm:text-2xl text-white">
            {project.title}
          </h3>

          <p className="relative mt-3 text-sm leading-relaxed text-muted">
            {project.description}
          </p>

          <motion.ul variants={bulletContainer} className="relative mt-4 space-y-2">
            {project.bullets.map((bullet, i) => (
              <motion.li key={i} variants={bulletItem} className="flex gap-2.5 text-sm leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/80" />
                {bullet}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <div>
          <div className="relative mt-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <motion.span
                key={t}
                whileHover={{ scale: 1.08, borderColor: "rgba(59,130,246,0.5)" }}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-mono text-muted cursor-default"
              >
                {t}
              </motion.span>
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

