"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles, Server, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { Assignment } from "@/data/flyrank-internship";

interface FeaturedCaseStudyCardProps {
  company: string;
  role: string;
  summary: string;
  duration: string;
  track: string;
  items: Assignment[];
  caseStudyUrl: string;
  githubUrl?: string | null;
  extraTag?: { emoji: string; label: string };
}

export default function FeaturedCaseStudyCard({
  company,
  role,
  summary,
  duration,
  track,
  items,
  caseStudyUrl,
  githubUrl,
  extraTag,
}: FeaturedCaseStudyCardProps) {
  return (
    <RevealOnScroll>
      <div className="group relative overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-950/30 via-surface to-black/90 p-7 shadow-2xl shadow-blue-950/40 sm:p-10">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-blue-600/20 blur-[100px]" />
        <div className="pointer-events-none absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-blue-500/15 blur-[90px]" />

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-400 font-mono uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            Featured Internship &amp; Case Study
          </span>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400 font-mono">
            {company}
          </p>
          <h3 className="mt-2 font-heading text-3xl font-bold leading-tight sm:text-4xl text-white">
            {role}
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            {summary}
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {items.map((item) => (
              <div
                key={item.number}
                className="flex min-h-[90px] flex-col items-start justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors group-hover:border-blue-500/30"
              >
                <span className="font-mono text-xs font-bold text-blue-400">Milestone {item.number}</span>
                <span className="text-xs font-medium leading-snug text-white/90">{item.title}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3 text-xs font-mono text-muted">
            <span className="text-white font-medium">{duration}</span>
            <span>·</span>
            <span className="text-blue-400">{track}</span>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={caseStudyUrl}
              className="group/btn inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all hover:bg-blue-500 hover:scale-105 active:scale-95"
            >
              Explore Full Case Study
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>

            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10"
              >
                <GithubIcon className="h-4 w-4" />
                GitHub
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
}
