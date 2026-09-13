"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Sparkles } from "lucide-react";
import ChatMessage, { Message } from "./ChatMessage";
import { SITE } from "@/data/site";
import { FLYRANK_INTERNSHIP } from "@/data/flyrank-internship";
import { PROJECTS } from "@/data/projects";

const SUGGESTIONS = [
  "What are his core skills?",
  "Tell me about his FlyRank internship",
  "What is his ICPC background?",
  "What projects has he built?",
];

function generateLocalAnswer(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("flyrank") || q.includes("internship") || q.includes("capstone")) {
    return `${SITE.name} is a Backend AI Engineer Intern at ${FLYRANK_INTERNSHIP.company}. He architected an enterprise usage metering and quota enforcement engine using FastAPI & PostgreSQL with exact integer micro-dollar pricing, guaranteed exactly-once Stripe webhook synchronization, and automated LLM ticket triage with Pydantic v2 schemas.`;
  }

  if (q.includes("skill") || q.includes("stack") || q.includes("tech")) {
    return `${SITE.name}'s core engineering stack includes Python, FastAPI, C++, Model Context Protocol (MCP), LLMs, PEFT/LoRA fine-tuning, PostgreSQL, MySQL, SQLite, Docker, and Git/GitHub Actions. He has extensive hands-on experience in backend AI architectures, bounding-box PDF layout annotation, and competitive programming.`;
  }

  if (q.includes("icpc") || q.includes("competitive") || q.includes("algorithm") || q.includes("cp") || q.includes("codeforces") || q.includes("leetcode")) {
    return `${SITE.name} is a 2× ICPC Dhaka Regionalist (2023 & 2024) and has spent years solving algorithmic problems in C++, focusing on Graph Theory, Dynamic Programming, and algorithmic optimization. He also served as the Organizing Secretary of the ULAB Computer Programming Club.`;
  }

  if (q.includes("project") || q.includes("built") || q.includes("work")) {
    const list = PROJECTS.map((p) => p.title).join(", ");
    return `${SITE.name} has built real projects including: ${list}. Check out the /projects page for code repositories and live interactive demonstrations!`;
  }

  if (q.includes("roar") || q.includes("deepseek") || q.includes("tutor")) {
    return `ROAR is Shahariar's final-year university capstone project at ULAB. It is an intelligent prompt engineering tutor powered by a quantized local DeepSeek-7B model fine-tuned with PEFT/LoRA adapters, coupled with a custom SQLite learning state machine and hybrid rule+LLM evaluation loop.`;
  }

  if (q.includes("cert") || q.includes("credential") || q.includes("hugging") || q.includes("nasa") || q.includes("anthropic")) {
    return `${SITE.name} holds 18 certifications including Anthropic Academy (Building with Claude API, Model Context Protocol, Claude Code), NASA Open Science 101, Hugging Face Foundations of Agentic AI, and DeepLearning.AI / Coursera machine learning courses. Verified PDFs and credentials can be inspected on the /certificates page.`;
  }

  if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("reach") || q.includes("phone") || q.includes("whatsapp") || q.includes("linkedin")) {
    return `You can reach ${SITE.name} directly via email at ${SITE.email} or by phone/WhatsApp at ${SITE.phone}. You can also connect on LinkedIn at ${SITE.linkedinUrl} or explore his open-source code on GitHub at ${SITE.githubUrl}.`;
  }

  return `${SITE.name} is a Computer Science & Engineering undergrad at ULAB, 2× ICPC Dhaka Regionalist, and Backend AI Engineer Intern at FlyRank AI specializing in Python, FastAPI, Model Context Protocol (MCP), and LLMs. Feel free to explore his projects or reach out directly at ${SITE.email}!`;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi! I'm ${SITE.shortName}'s portfolio AI assistant. Ask me anything about his backend AI engineering experience, ICPC achievements, FlyRank capstone, or projects.`
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const reply = generateLocalAnswer(text);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      setLoading(false);
    }, 450);
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-20 right-4 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_0_25px_rgba(59,130,246,0.5)] md:bottom-6 md:right-6 cursor-pointer"
        aria-label="Open AI Chatbot"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-36 right-4 z-[90] flex h-[65vh] max-h-[520px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-white/15 bg-black/95 shadow-2xl shadow-black/80 backdrop-blur-xl md:bottom-24"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-blue-950/30 px-5 py-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <p className="font-heading text-sm font-bold text-white flex items-center gap-1.5">
                  AI Recruiter Assistant
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </p>
                <p className="text-[11px] font-mono text-muted">Grounded in verified experience</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
              {messages.map((m, i) => (
                <ChatMessage key={i} message={m} />
              ))}
              {loading && (
                <div className="flex items-center gap-2 pl-11 text-xs font-mono text-muted">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-400" />
                  Generating answer...
                </div>
              )}
            </div>

            {/* Suggestion Chips */}
            {messages.length <= 2 && (
              <div className="flex flex-wrap gap-1.5 px-4 pb-3">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-mono text-muted transition-colors hover:border-blue-500/40 hover:text-blue-300"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-2 border-t border-white/10 bg-surface/80 p-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about skills, ICPC, FlyRank..."
                className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition-opacity hover:bg-blue-500 disabled:opacity-40"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
