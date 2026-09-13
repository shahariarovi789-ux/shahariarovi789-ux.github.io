"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SITE } from "@/data/site";
import FooterMeshCanvas from "@/components/background/FooterMeshCanvas";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { ArrowUp, Copy, FileText } from "lucide-react";

export default function Footer() {
  const [dhakaTime, setDhakaTime] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Dhaka",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setDhakaTime(timeStr);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(SITE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10 bg-black/90 pt-20 pb-16 overflow-hidden">
      <FooterMeshCanvas />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        {/* Top Telemetry Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between pb-12 border-b border-white/10">
          <div>
            <Link href="/" className="font-heading text-2xl font-bold text-white flex items-center gap-2">
              {SITE.name}
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            </Link>
            <p className="mt-1 text-xs uppercase tracking-widest text-muted font-mono">
              Backend AI Systems · Model Context Protocol (MCP) · Competitive Programming
            </p>
          </div>

          {/* Telemetry Pill */}
          <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono text-xs backdrop-blur-md">
            <div className="relative flex h-3 w-3 items-center justify-center">
              <div className="absolute h-full w-full rounded-full border border-blue-400/80 radar-sweep" />
              <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            </div>
            <span className="text-white font-semibold">Dhaka, BD (UTC+6):</span>
            <span className="text-blue-400 font-medium">{dhakaTime || "Live"}</span>
            <span className="text-white/20">|</span>
            <span className="text-emerald-400 font-medium">● Open to Work</span>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 md:grid-cols-3 border-b border-white/10 font-mono text-xs">
          {/* Column 1: Sitemaps */}
          <div>
            <h4 className="text-blue-400 uppercase tracking-widest font-semibold mb-4 flex items-center gap-2">
              <span>Directory Index</span>
              <span className="text-[10px] opacity-60">[01-06]</span>
            </h4>
            <ul className="space-y-2.5 uppercase tracking-wider text-muted">
              {[
                ["Home", "/"],
                ["Experience", "/experience"],
                ["Projects", "/projects"],
                ["FlyRank Case Study", "/projects/flyrank-backend-internship"],
                ["Certificates", "/certificates"],
                ["Contact", "/contact"],
              ].map(([label, href], idx) => (
                <li key={label}>
                  <Link href={href} className="link-sweep hover:text-white transition-colors flex items-center justify-between group">
                    <span>0{idx + 1} // {label}</span>
                    <span className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Direct Connect */}
          <div>
            <h4 className="text-blue-400 uppercase tracking-widest font-semibold mb-4">
              Direct Connect
            </h4>
            <ul className="space-y-2.5 uppercase tracking-wider text-muted">
              <li>
                <a href={SITE.githubUrl} target="_blank" rel="noreferrer" className="link-sweep hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <GithubIcon className="h-3.5 w-3.5" /> GitHub Profile
                  </span>
                  <span className="text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                </a>
              </li>
              <li>
                <a href={SITE.linkedinUrl} target="_blank" rel="noreferrer" className="link-sweep hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <LinkedinIcon className="h-3.5 w-3.5" /> LinkedIn Network
                  </span>
                  <span className="text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                </a>
              </li>
              <li>
                <button onClick={copyEmail} className="link-sweep hover:text-white transition-colors flex items-center justify-between w-full text-left cursor-pointer group">
                  <span className="flex items-center gap-2">
                    <Copy className="h-3.5 w-3.5" /> Direct Email ({copied ? "Copied! ✓" : "Copy"})
                  </span>
                  <span className="text-blue-400">{copied ? "✓" : "📋"}</span>
                </button>
              </li>
              <li>
                <a href={SITE.resumeUrl} target="_blank" rel="noreferrer" className="link-sweep hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5" /> PDF Résumé
                  </span>
                  <span className="text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Tech Stack & System Status */}
          <div>
            <h4 className="text-blue-400 uppercase tracking-widest font-semibold mb-4">
              Core Engineering Focus
            </h4>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3 backdrop-blur-md">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-muted">Primary Stack:</span>
                <span className="text-white font-medium">FastAPI · Python · C++</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-muted">AI Systems:</span>
                <span className="text-blue-400 font-medium">MCP · PEFT/LoRA · LLMs</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-muted">Competitive Coding:</span>
                <span className="text-emerald-400 font-medium">2× ICPC Regionalist</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-muted">Databases:</span>
                <span className="text-white font-medium">PostgreSQL · MySQL · SQLite</span>
              </div>
            </div>
          </div>
        </div>

        {/* Large Kinetic Glowing Signature (Single Line Display) */}
        <div className="pt-14 pb-6 select-none w-full flex justify-center text-center">
          <div className="inline-flex flex-nowrap items-center justify-center gap-4 sm:gap-7 md:gap-10 whitespace-nowrap px-2">
            {["SHAHARIAR", "ASFAQ", "OVI"].map((word, wIdx) => (
              <div key={wIdx} className="inline-flex items-center flex-nowrap shrink-0">
                {word.split("").map((char, cIdx) => (
                  <span
                    key={cIdx}
                    className="kinetic-letter text-[clamp(1.35rem,4.4vw,4.25rem)] cursor-pointer"
                  >
                    {char}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-8 font-mono text-xs uppercase tracking-widest text-muted">
          <div>
            © {new Date().getFullYear()} {SITE.name} · {SITE.location}
          </div>

          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-foreground transition-all hover:border-blue-500/50 hover:bg-blue-500/10 active:scale-95"
          >
            <span>Back to Top</span>
            <ArrowUp className="h-3.5 w-3.5 text-blue-400 transition-transform group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  );
}
