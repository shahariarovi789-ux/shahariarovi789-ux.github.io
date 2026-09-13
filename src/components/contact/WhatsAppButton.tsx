"use client";

import { motion } from "framer-motion";
import { MessageSquare, ArrowUpRight } from "lucide-react";
import { SITE } from "@/data/site";

export default function WhatsAppButton() {
  const mailUrl = `mailto:${SITE.email}?subject=${encodeURIComponent("Connecting with Shahariar Asfaq Ovi")}`;

  return (
    <motion.a
      href={mailUrl}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-white/10 bg-surface/70 p-6 transition-colors duration-300 hover:border-blue-500/40 shadow-lg"
    >
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
          <MessageSquare className="h-6 w-6" />
        </span>
        <div>
          <p className="font-heading text-lg font-bold text-white">Direct Message</p>
          <p className="text-xs font-mono text-muted">{SITE.email}</p>
        </div>
      </div>
      <ArrowUpRight className="h-5 w-5 text-muted group-hover:text-blue-400 transition-colors" />
    </motion.a>
  );
}
