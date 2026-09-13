"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Expand, BadgeCheck, FileText, Download, Filter } from "lucide-react";
import { CERTIFICATES, Certificate } from "@/data/certificates";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import CertificateModal from "./CertificateModal";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "AI & Agents", "Systems & Backend", "Professional"];

export default function CertificateGrid() {
  const [selected, setSelected] = useState<Certificate | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCerts =
    activeCategory === "All"
      ? CERTIFICATES
      : CERTIFICATES.filter((c) => c.category === activeCategory);

  return (
    <>
      {/* Filter Tabs */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
        {CATEGORIES.map((cat) => {
          const count =
            cat === "All"
              ? CERTIFICATES.length
              : CERTIFICATES.filter((c) => c.category === cat).length;
          const isActive = activeCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-mono font-semibold uppercase tracking-wider transition-all",
                isActive
                  ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                  : "border border-white/10 bg-white/5 text-muted hover:border-white/20 hover:text-white"
              )}
            >
              <span>{cat}</span>
              <span className={cn("text-[10px] opacity-60", isActive && "opacity-90")}>({count})</span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCerts.map((cert, index) => (
          <RevealOnScroll key={cert.id} delay={(index % 3) * 0.06}>
            <motion.button
              onClick={() => setSelected(cert)}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface/70 text-left shadow-lg shadow-black/30 transition-all duration-300 hover:border-blue-500/40 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(59,130,246,0.15)]"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/60">
                <Image
                  src={cert.thumbnail}
                  alt={cert.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading={index < 6 ? "eager" : "lazy"}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-90" />

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/40 backdrop-blur-xs">
                  <span className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-lg">
                    <Expand className="h-3.5 w-3.5" /> View Certificate
                  </span>
                </div>

                {/* Top Badges */}
                <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-blue-600/90 border border-blue-400/40 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md font-mono">
                  <BadgeCheck className="h-3 w-3" /> Verified
                </span>

                <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/60 border border-white/15 px-2.5 py-1 text-[10px] font-mono text-white/80 backdrop-blur-md">
                  <FileText className="h-3 w-3" /> PDF
                </span>
              </div>

              {/* Card Meta */}
              <div className="flex flex-1 flex-col p-5">
                <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-blue-400">
                  {cert.issuer} · {cert.date}
                </p>
                <h3 className="mt-1.5 font-heading text-lg font-bold leading-snug text-white group-hover:text-blue-300 transition-colors">
                  {cert.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted">
                  {cert.description}
                </p>
              </div>
            </motion.button>
          </RevealOnScroll>
        ))}
      </div>

      <CertificateModal certificate={selected} onClose={() => setSelected(null)} />
    </>
  );
}
