"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement | null>(null);
  const ring = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let rx = window.innerWidth / 2;
    let ry = window.innerHeight / 2;
    let mx = rx;
    let my = ry;
    let raf = 0;

    function move(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      }
      const target = e.target as HTMLElement | null;
      const isInteractive = target?.closest("a, button, [data-cursor], input, textarea, .cursor-pointer, .kinetic-letter");
      if (ring.current) {
        ring.current.classList.toggle("hovering", !!isInteractive);
      }
    }

    function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener("mousemove", move, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
