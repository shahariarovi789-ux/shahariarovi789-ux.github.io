import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ShieldCheck, Zap, Server, Cpu, Database } from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";
import {
  FLYRANK_INTERNSHIP,
  CAPSTONE_PROJECT,
} from "@/data/flyrank-internship";
import AssignmentTimeline from "@/components/projects/AssignmentTimeline";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { SITE } from "@/data/site";

export const metadata = {
  title: `FlyRank AI Backend Engineering Case Study | ${SITE.name}`,
  description: `Deep-dive case study of Shahariar Asfaq Ovi's backend AI engineering work at FlyRank AI — distributed rate limiting, Redis Lua token buckets, and Model Context Protocol (MCP) servers.`,
};

export const dynamic = "force-static";

export default function FlyRankCaseStudyPage() {
  return (
    <main className="min-h-screen px-6 pt-36 pb-28 md:px-12 lg:px-20 max-w-4xl mx-auto">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted transition-colors hover:text-blue-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Projects
      </Link>

      {/* 01 — Overview */}
      <RevealOnScroll delay={0.05}>
        <div className="mt-10">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-blue-400">
            01 — Internship Case Study
          </span>
          <p className="mt-3 text-xs font-mono font-semibold uppercase tracking-[0.2em] text-muted">
            {FLYRANK_INTERNSHIP.company}
          </p>
          <h1 className="mt-2 font-heading text-4xl font-bold leading-tight sm:text-5xl text-white">
            {FLYRANK_INTERNSHIP.role}
          </h1>

          <div className="mt-5 flex flex-wrap gap-3 text-xs font-mono">
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-muted">
              {FLYRANK_INTERNSHIP.duration}
            </span>
            <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-blue-400 font-semibold">
              {FLYRANK_INTERNSHIP.track}
            </span>
          </div>

          <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted">
            {FLYRANK_INTERNSHIP.summary}
          </p>

          <h2 className="mt-10 font-heading text-xl font-bold text-white">Engineered Tech Stack</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {FLYRANK_INTERNSHIP.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-blue-500/30 bg-blue-950/30 px-4 py-1.5 text-xs font-mono text-blue-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </RevealOnScroll>

      {/* Architectural Highlights Grid */}
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="rounded-2xl border border-white/10 bg-surface/80 p-5">
          <Server className="h-6 w-6 text-blue-400 mb-3" />
          <p className="text-2xl font-bold font-heading text-white">99.9%</p>
          <p className="text-xs font-mono text-muted mt-1">Production API Availability</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-surface/80 p-5">
          <Zap className="h-6 w-6 text-amber-400 mb-3" />
          <p className="text-2xl font-bold font-heading text-white">&lt;85ms</p>
          <p className="text-xs font-mono text-muted mt-1">p95 Latency SLA</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-surface/80 p-5">
          <Database className="h-6 w-6 text-emerald-400 mb-3" />
          <p className="text-2xl font-bold font-heading text-white">10k+/min</p>
          <p className="text-xs font-mono text-muted mt-1">Rate Limiter Throughput</p>
        </div>
      </div>

      {/* 02 — Milestones */}
      <RevealOnScroll delay={0.1}>
        <div className="mt-20">
          <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-blue-400">
            02 — Key Engineering Milestones
          </p>
          <h2 className="mt-3 font-heading text-2xl font-bold sm:text-3xl text-white">
            Architecture, Sprints &amp; Deliverables
          </h2>
        </div>
      </RevealOnScroll>

      <AssignmentTimeline />

      {/* 03 — Capstone Project */}
      <RevealOnScroll delay={0.1}>
        <div className="mt-20">
          <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-blue-400">
            03 — Capstone Infrastructure
          </p>

          <div className="mt-5 rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-950/30 via-surface to-black p-7 sm:p-10 shadow-2xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 px-3.5 py-1 text-xs font-bold text-blue-400 font-mono">
                ⚡ Capstone Project
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-mono text-emerald-400">
                ● {CAPSTONE_PROJECT.status}
              </span>
            </div>

            <h2 className="mt-5 font-heading text-2xl font-bold text-white sm:text-3xl">
              {CAPSTONE_PROJECT.title}
            </h2>
            <p className="mt-2 text-sm font-mono text-blue-400">
              {CAPSTONE_PROJECT.tagline}
            </p>

            <p className="mt-5 text-sm sm:text-base leading-relaxed text-muted">
              {CAPSTONE_PROJECT.description}
            </p>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-xs font-mono font-bold uppercase text-white mb-3">
                Core Technologies &amp; Tooling
              </p>
              <div className="flex flex-wrap gap-2">
                {CAPSTONE_PROJECT.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-mono text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </main>
  );
}
