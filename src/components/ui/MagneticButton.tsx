"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useRef } from "react";

export default function MagneticButton({
  children,
  className,
  as = "button",
  href,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  as?: any;
  href?: string;
  onClick?: () => void;
  [x: string]: any;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-30, 30], [5, -5]);
  const rotateY = useTransform(x, [-30, 30], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Magnetic pull distance
    x.set((e.clientX - centerX) * 0.4);
    y.set((e.clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = as;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: 0, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{ x, y, rotateX, rotateY }}
      className="inline-block relative z-10 perspective-1000"
    >
      <Component href={href} onClick={onClick} className={className} {...props}>
        {children}
      </Component>
    </motion.div>
  );
}
