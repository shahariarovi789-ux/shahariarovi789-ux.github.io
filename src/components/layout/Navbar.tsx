"use client";

import { SITE } from "@/data/site";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Terminal as TerminalIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Certificates", href: "/certificates" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-black/85 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12 lg:px-20">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-heading text-lg font-semibold tracking-tight text-white"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-transform duration-300 group-hover:scale-110">
            S
          </span>
          <span className="flex items-center gap-1.5">
            {SITE.name}
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative px-4 py-2 text-sm font-medium transition-colors hover:text-white",
                  isActive ? "text-white" : "text-muted"
                )}
              >
                <span>{link.label}</span>
                <span
                  className={cn(
                    "absolute inset-x-4 -bottom-0.5 h-[2px] origin-left scale-x-0 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6] transition-transform duration-300 group-hover:scale-x-100",
                    isActive && "scale-x-100"
                  )}
                />
              </Link>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href={SITE.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-blue-400 shadow-sm transition-all hover:border-blue-400 hover:bg-blue-500/20"
          >
            Résumé <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <Link
            href="/contact"
            className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-transform hover:scale-105 hover:bg-blue-500"
          >
            Let&apos;s Connect
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-surface px-4 py-2 text-sm font-medium text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          Menu
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-white/10 bg-black/95 px-6 py-6 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors",
                      isActive
                        ? "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                        : "text-muted hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <span>{link.label}</span>
                    <span className="text-xs opacity-50">→</span>
                  </Link>
                );
              })}
              <div className="mt-2 flex gap-3 pt-3 border-t border-white/10">
                <a
                  href={SITE.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-blue-500/40 bg-blue-500/10 py-3 text-xs font-semibold uppercase tracking-wider text-blue-400"
                >
                  Résumé <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex flex-1 items-center justify-center rounded-full bg-blue-600 py-3 text-xs font-semibold uppercase tracking-wider text-white"
                >
                  Let&apos;s Connect
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
