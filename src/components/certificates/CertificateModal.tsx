"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, BadgeCheck, Download, Calendar, Building, Award } from "lucide-react";
import { Certificate } from "@/data/certificates";

export default function CertificateModal({
  certificate,
  onClose,
}: {
  certificate: Certificate | null;
  onClose: () => void;
}) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = certificate ? "hidden" : "auto";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "auto";
    };
  }, [certificate, onClose]);

  return (
    <AnimatePresence>
      {certificate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-black/95 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 px-3 py-1 text-xs font-semibold text-blue-400 font-mono">
                  <BadgeCheck className="h-3.5 w-3.5" /> Verified Credential
                </span>
                <span className="text-xs font-mono text-muted">{certificate.category}</span>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-muted transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Certificate Preview */}
            <div className="relative flex-1 overflow-y-auto p-6">
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl border border-white/10 bg-black/50 shadow-inner flex items-center justify-center">
                {certificate.thumbnail ? (
                  <Image
                    src={certificate.thumbnail}
                    alt={certificate.title}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 100vw, 750px"
                    priority
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <Award className="h-16 w-16 text-blue-400 mb-3 opacity-90" />
                    <p className="font-heading text-xl font-bold text-white">{certificate.title}</p>
                    <p className="text-sm font-mono text-muted mt-1">{certificate.issuer}</p>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <h3 className="font-heading text-2xl font-bold text-white">
                  {certificate.title}
                </h3>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-muted">
                  <span className="flex items-center gap-1.5 text-blue-400 font-semibold">
                    <Building className="h-3.5 w-3.5" /> {certificate.issuer}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" /> {certificate.date}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {certificate.description}
                </p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-surface/80 px-6 py-4">
              {certificate.file ? (
                <a
                  href={certificate.file}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-white/10"
                >
                  <Download className="h-3.5 w-3.5" /> Download Full PDF
                </a>
              ) : (
                <span className="text-xs font-mono text-muted">Verified Online Course</span>
              )}

              {certificate.verifyUrl && (
                <a
                  href={certificate.verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all hover:bg-blue-500"
                >
                  Verify at {certificate.issuer.split(" ")[0]} <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
