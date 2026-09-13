"use client";

import { Briefcase, Trophy, Users, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { EXPERIENCE, ExperienceType } from "@/data/experience";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";

const ICONS: Record<ExperienceType, typeof Briefcase> = {
  work: Briefcase,
  achievement: Trophy,
  leadership: Users,
  education: GraduationCap,
};

const TYPE_LABEL: Record<ExperienceType, string> = {
  work: "Engineering Role",
  achievement: "Competitive Programming",
  leadership: "Team Leadership",
  education: "Academic Foundation",
};

export default function ExperienceTimeline() {
  return (
    <div className="relative mx-auto mt-16 max-w-4xl">
      {/* Vertical line */}
      <div className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-blue-500/60 via-white/10 to-transparent" />

      <div className="flex flex-col gap-10">
        {EXPERIENCE.map((item, index) => {
          const Icon = ICONS[item.type];
          return (
            <RevealOnScroll key={item.id} delay={index * 0.08} className="relative pl-[68px]">
              {/* Icon node */}
              <div
                className={cn(
                  "absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-2xl border backdrop-blur-md transition-colors",
                  item.current
                    ? "border-blue-500/50 bg-blue-950/40 shadow-lg shadow-blue-950/50 text-blue-400"
                    : "border-white/10 bg-surface text-muted"
                )}
              >
                <Icon className={cn("h-6 w-6", item.current ? "text-blue-400" : "text-muted")} />
              </div>

              {/* Card */}
              <div className="group rounded-2xl border border-white/10 bg-surface/80 p-6 sm:p-8 transition-all duration-300 hover:border-blue-500/40 hover:bg-surface hover:shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(59,130,246,0.12)]">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
                    {TYPE_LABEL[item.type]}
                  </span>
                  {item.current && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 px-3 py-0.5 text-xs font-semibold text-blue-400 font-mono">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />
                      Active Role
                    </span>
                  )}
                </div>

                <h3 className="mt-3 font-heading text-xl font-bold text-white sm:text-2xl">
                  {item.role}
                </h3>
                <p className="mt-1 text-sm font-semibold text-blue-400 font-mono">
                  {item.organization} · <span className="text-muted font-normal">{item.period}</span>
                </p>

                <ul className="mt-5 space-y-2.5">
                  {item.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/80" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-mono text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {item.caseStudyUrl && (
                    <Link
                      href={item.caseStudyUrl}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Read Case Study <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            </RevealOnScroll>
          );
        })}
      </div>
    </div>
  );
}
