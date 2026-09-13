"use client";

import { motion } from "framer-motion";

export default function HeroGlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Left blue smoke blob */}
      <motion.div
        className="absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full bg-blue-600/20 blur-[110px]"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Right blue smoke blob */}
      <motion.div
        className="absolute -right-24 top-1/3 h-[380px] w-[380px] rounded-full bg-blue-500/20 blur-[100px]"
        animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      {/* Center faint glow behind portrait */}
      <div className="absolute right-[8%] top-1/2 h-[520px] w-[420px] -translate-y-1/2 rounded-full bg-blue-700/15 blur-[130px]" />
      
      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#000000_85%)]" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
