"use client";

import { useEffect, useRef } from "react";

export default function FooterMeshCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, dpr = 1;
    let raf = 0;
    let time = 0;
    let inView = false;
    let hidden = false;
    let isMobile = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && !raf && !hidden) loop();
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    function onVisibility() {
      hidden = document.hidden;
      if (!hidden && inView && !raf) loop();
    }
    document.addEventListener("visibilitychange", onVisibility);

    const mouse = { x: -9999, y: -9999, targetX: -9999, targetY: -9999 };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const accentRGB = [59, 130, 246];

    function resize() {
      if (!canvas || !ctx) return;
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      isMobile = w < 768;
      dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.75);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function render() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      time += 0.015;

      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      const [r, g, b] = accentRGB;
      const baseAlpha = 0.12;
      const LINES = isMobile ? 8 : 12;
      const POINTS = isMobile ? 22 : 32;

      for (let i = 0; i < LINES; i++) {
        const lineProgress = i / (LINES - 1);
        const baseY = h * 0.25 + lineProgress * (h * 0.7);
        const alpha = baseAlpha * (0.3 + lineProgress * 0.7);

        ctx.beginPath();
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.lineWidth = 0.75 + lineProgress * 0.8;

        for (let j = 0; j <= POINTS; j++) {
          const x = (j / POINTS) * w;
          const wave1 = Math.sin(j * 0.25 + time * 1.5 + i * 0.4) * (12 + lineProgress * 16);
          const wave2 = Math.cos(j * 0.12 - time * 0.8 + i * 0.3) * (7 + lineProgress * 9);
          
          const distToMouse = Math.hypot(x - mouse.x, baseY - mouse.y);
          let mouseFactor = 0;
          if (distToMouse < 200) {
            mouseFactor = (1 - distToMouse / 200) * 30;
          }

          const y = baseY + wave1 + wave2 - mouseFactor;

          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

          if (j % 4 === 0 && lineProgress > 0.35) {
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * (1.2 + (mouseFactor > 0 ? 2 : 0))})`;
            ctx.fillRect(x - 1, y - 1, 2, 2);
          }
        }
        ctx.stroke();
      }
    }

    function loop() {
      if (hidden || !inView) { raf = 0; return; }
      if (reduce) return;
      render();
      raf = requestAnimationFrame(loop);
    }

    function onMouseMove(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    }

    function onMouseLeave() {
      mouse.targetX = -9999;
      mouse.targetY = -9999;
    }

    resize();
    if (!reduce) loop();
    else render();

    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMouseMove, { passive: true });
    canvas.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      if (canvas) {
        canvas.removeEventListener("mousemove", onMouseMove);
        canvas.removeEventListener("mouseleave", onMouseLeave);
      }
      document.removeEventListener("visibilitychange", onVisibility)
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto opacity-70 transition-opacity duration-500 hover:opacity-100"
      style={{
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 100%)"
      }}
      aria-hidden="true"
    />
  );
}
