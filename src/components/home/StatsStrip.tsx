"use client";

import RevealOnScroll from "@/components/ui/RevealOnScroll";
import CountUp from "@/components/ui/CountUp";
import { STATS } from "@/data/stats";

export default function StatsStrip() {
  return (
    <section className="border-y border-white/10 bg-surface/30 px-6 py-10 md:px-12 lg:px-20 backdrop-blur-sm">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 sm:grid-cols-4">
        {STATS.map((s, i) => (
          <RevealOnScroll key={s.label} delay={i * 0.08} className="text-center">
            <p className="font-heading text-3xl font-bold text-gradient sm:text-4xl">
              <CountUp value={s.value} duration={1600} />
            </p>
            <p className="mt-1.5 text-xs uppercase tracking-wider text-white font-medium sm:text-sm">
              {s.label}
            </p>
            {s.subtext && (
              <p className="mt-1 text-[11px] text-muted font-mono">
                {s.subtext}
              </p>
            )}
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
