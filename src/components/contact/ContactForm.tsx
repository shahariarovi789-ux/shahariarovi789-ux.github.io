"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Copy, Check } from "lucide-react";
import { SITE } from "@/data/site";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Backend / AI Opportunity from ${name || "Recruiter"}`);
    const body = encodeURIComponent(
      `${message}\n\n—\nSender: ${name}\nContact Email: ${email}`
    );
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  }

  function handleCopy() {
    navigator.clipboard.writeText(SITE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-surface/80 p-6 sm:p-8 backdrop-blur-md">
        <div>
          <label className="mb-2 block text-xs font-mono font-semibold uppercase tracking-wider text-muted">
            Your Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-blue-500 focus:bg-white/[0.05]"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-mono font-semibold uppercase tracking-wider text-muted">
            Your Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@company.com"
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-blue-500 focus:bg-white/[0.05]"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-mono font-semibold uppercase tracking-wider text-muted">
            Message
          </label>
          <textarea
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell me about your project, team, or backend role..."
            className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-blue-500 focus:bg-white/[0.05]"
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-colors hover:bg-blue-500"
        >
          <span>Send Message via Email</span>
          <Send className="h-4 w-4" />
        </motion.button>
      </form>

      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 text-xs font-mono">
        <span className="text-muted">Direct Email: <strong className="text-white">{SITE.email}</strong></span>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-blue-400 hover:bg-white/20 transition-colors"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
