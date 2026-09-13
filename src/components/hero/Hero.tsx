"use client";

import { SITE } from "@/data/site";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowRight, ShieldCheck, Cpu } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import HeroGlow from "./HeroGlow";
import HeroPortraitFX from "./HeroPortraitFX";

const ROLES = [
  "Backend AI Systems",
  "Model Context Protocol (MCP)",
  "Large Language Models",
  "Competitive Programming",
];

const CURRENT_ROLES = [
  "Backend AI Engineer Intern @ FlyRank AI",
  "2× ICPC Dhaka Regionalist (2023, 2024)",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-40, 40], [8, -8]);
  const rotateY = useTransform(mouseX, [-40, 40], [-8, 8]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x / 6);
    mouseY.set(y / 6);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-transparent px-6 pt-32 pb-20 md:px-12 lg:px-20">
      <HeroGlow />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left: Text content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-1.5 text-xs font-medium tracking-wide text-blue-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
            {SITE.availability}
          </span>

          <h1 className="mt-6 font-heading text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl text-white">
            Hi, I&apos;m{" "}
            <span className="text-gradient">Shahariar Asfaq Ovi</span>
          </h1>

          <div className="mt-4 h-11 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={ROLES[roleIndex]}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="font-heading text-2xl font-semibold text-blue-400 sm:text-3xl"
              >
                {ROLES[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            CSE undergrad at ULAB, AI enthusiast &amp; 2× ICPC Dhaka Regionalist — building backend AI systems with Python, FastAPI, LLMs, and Model Context Protocol (MCP).
          </p>

          {/* Current roles banner */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            {CURRENT_ROLES.map((role, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm"
              >
                <Cpu className="h-3.5 w-3.5 text-blue-400" />
                {role}
              </span>
            ))}
          </div>

          {/* CTA Buttons & Socials */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all hover:bg-blue-500 hover:scale-105 active:scale-95"
            >
              Explore Projects
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/projects/flyrank-backend-internship"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-blue-500/50 hover:bg-blue-500/10 active:scale-95"
            >
              FlyRank AI Case Study
            </Link>

            <div className="flex items-center gap-3 pl-2">
              <a
                href={SITE.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/10 bg-white/5 p-2.5 text-muted transition-colors hover:border-white/30 hover:text-white"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href={SITE.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/10 bg-white/5 p-2.5 text-muted transition-colors hover:border-white/30 hover:text-white"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right: 3D Interactive Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="portrait-float">
            <div
              ref={imageRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative"
              style={{ perspective: 1000 }}
            >
              <motion.div
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
                className="relative h-[380px] w-[300px] sm:h-[460px] sm:w-[360px] rounded-[2rem] overflow-hidden border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(59,130,246,0.2)] bg-surface glow-pulse"
              >
                <HeroPortraitFX />

                <Image
                  src="/profile.jpg"
                  alt={SITE.name}
                  fill
                  priority
                  className="object-cover object-top filter contrast-105 transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 640px) 300px, 360px"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Floating Bottom Badge */}
                <div className="absolute bottom-4 inset-x-4 rounded-xl border border-white/15 bg-black/75 p-3.5 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-white flex items-center gap-1.5">
                        <ShieldCheck className="h-4 w-4 text-blue-400" />
                        {SITE.name}
                      </p>
                      <p className="text-[11px] text-muted font-mono">Backend AI Engineer</p>
                    </div>
                    <span className="rounded-full bg-blue-500/20 px-2.5 py-1 text-[10px] font-bold text-blue-400 border border-blue-500/40 font-mono">
                      2× ICPC
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>


      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted text-xs font-mono">
        <span>Scroll to explore</span>
        <ArrowDown className="h-3.5 w-3.5 animate-bounce text-blue-400" />
      </div>
    </section>
  );
}
