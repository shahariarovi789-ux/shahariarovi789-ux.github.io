import { SKILLS } from "@/data/skills";

export default function SkillsMarquee() {
  const row1 = SKILLS.slice(0, Math.ceil(SKILLS.length / 2));
  const row2 = SKILLS.slice(Math.ceil(SKILLS.length / 2));

  return (
    <section className="py-20 overflow-hidden border-b border-white/10 bg-transparent">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20 mb-8 text-center">
        <span className="text-xs uppercase tracking-widest font-mono text-blue-400">
          Core Technical Capabilities
        </span>
        <h3 className="font-heading text-2xl font-bold text-white mt-1">
          Technologies &amp; Protocols Shipped to Production
        </h3>
      </div>

      <div className="space-y-4">
        {/* Track 1 */}
        <div className="flex overflow-hidden whitespace-nowrap mask-gradient">
          <div className="marquee-track flex gap-4 pr-4">
            {[...row1, ...row1, ...row1].map((skill, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white/90 backdrop-blur-md transition-colors hover:border-blue-500/50 hover:bg-blue-500/10"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Track 2 */}
        <div className="flex overflow-hidden whitespace-nowrap mask-gradient">
          <div
            className="marquee-track flex gap-4 pr-4"
            style={{ animationDirection: "reverse", animationDuration: "35s" }}
          >
            {[...row2, ...row2, ...row2].map((skill, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white/90 backdrop-blur-md transition-colors hover:border-blue-500/50 hover:bg-blue-500/10"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
