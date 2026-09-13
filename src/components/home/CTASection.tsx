import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { SITE } from "@/data/site";

export default function CTASection() {
  return (
    <section className="px-6 py-24 md:px-12 lg:px-20">
      <RevealOnScroll>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-950/30 via-surface to-black/90 p-10 text-center sm:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_30px_rgba(59,130,246,0.15)]">
          <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-blue-600/20 blur-[100px]" />
          <div className="pointer-events-none absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-blue-500/20 blur-[100px]" />

          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase font-mono text-blue-400">
            <Mail className="h-3.5 w-3.5" /> Start a Conversation
          </span>

          <h2 className="relative font-heading text-3xl font-bold text-white sm:text-5xl mt-6 max-w-2xl mx-auto leading-tight">
            Have an open engineering role or distributed problem to solve?
          </h2>

          <p className="relative mx-auto mt-5 max-w-xl text-base text-muted sm:text-lg leading-relaxed">
            Currently available for Backend AI Engineering roles, distributed systems internships, and high-throughput scraping collaborations.
          </p>

          <div className="relative mt-10 flex flex-wrap justify-center items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all hover:bg-blue-500 hover:scale-105 active:scale-95"
            >
              Get In Touch
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10 active:scale-95"
            >
              Direct Email
            </a>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
