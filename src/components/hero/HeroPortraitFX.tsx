"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

export default function HeroPortraitFX() {
  const particles = Array.from({ length: 8 });
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const px = useTransform(smoothX, [-300, 300], [15, -15]);
  const py = useTransform(smoothY, [-300, 300], [15, -15]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  return (
    <div ref={ref} className="pointer-events-none absolute -inset-6 z-0 overflow-visible">
      <div
        className="absolute inset-0 rounded-[2.5rem]"
        style={{
          background: "conic-gradient(from 0deg, transparent, #3b82f6, transparent 30%)",
          animation: "spin-smooth 6s linear infinite",
          willChange: "transform",
        }}
      />
      <div className="absolute inset-[3px] rounded-[2.4rem] bg-black" />

      {particles.map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#3b82f6]"
          style={{
            left: `${10 + (i * 11) % 90}%`,
            bottom: "5%",
            x: px,
            y: py,
            animation: `float-particle ${4.5 + (i % 3)}s ease-out infinite`,
            animationDelay: `${i * 0.5}s`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}
