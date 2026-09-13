"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

function parseValue(raw: string): { prefix: string; num: number; suffix: string } {
  const m = raw.match(/^([^\d]*)([0-9,]+)(.*)$/);
  if (!m) return { prefix: "", num: 0, suffix: raw };
  return {
    prefix: m[1] ?? "",
    num: parseInt(m[2].replace(/,/g, ""), 10),
    suffix: m[3] ?? "",
  };
}

function formatNum(n: number): string {
  return n >= 1000 ? n.toLocaleString() : String(n);
}

export default function CountUp({
  value,
  duration = 1400,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [displayed, setDisplayed] = useState("0");
  const { prefix, num, suffix } = parseValue(value);

  useEffect(() => {
    if (!inView || num === 0) {
      setDisplayed(formatNum(num));
      return;
    }
    let start: number | null = null;
    let raf: number;

    function step(ts: number) {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(eased * num);
      setDisplayed(formatNum(current));
      if (progress < 1) raf = requestAnimationFrame(step);
    }

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, num, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{displayed}{suffix}
    </span>
  );
}
