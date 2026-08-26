import { useEffect, useState } from "react"
import { profile, skills, education, experience, achievements, certifications, projects } from "./data"
import NeuralField from "./components/NeuralField"
import Cursor from "./components/Cursor"
import SentimentAnalyzer from "./components/SentimentAnalyzer"
import Terminal from "./components/Terminal"
import FooterMeshCanvas from "./components/FooterMeshCanvas"

const firstName = profile.name.split(" ")[0]
const lastName = profile.name.split(" ").slice(1).join(" ")

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]")
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.1 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function Socials({ className = "", onCopyEmail }) {
  const { socials, email } = profile
  return (
    <div className={`flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-widest ${className}`}>
      {socials.github && (
        <a href={socials.github} target="_blank" rel="noreferrer" className="link-sweep text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
          GitHub ↗
        </a>
      )}
      {socials.linkedin && (
        <a href={socials.linkedin} target="_blank" rel="noreferrer" className="link-sweep text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
          LinkedIn ↗
        </a>
      )}
      {email && (
        <button onClick={onCopyEmail} className="link-sweep text-[var(--muted)] hover:text-[var(--accent)] transition-colors cursor-none">
          Email (Copy) ↗
        </button>
      )}
    </div>
  )
}

function SectionHead({ n, title }) {
  return (
    <div className="flex items-baseline gap-4 mb-10" data-reveal>
      <span className="font-mono text-sm text-[var(--accent)]">({n})</span>
      <h2 className="display text-3xl sm:text-4xl text-[var(--fg)]">{title}</h2>
      <span className="flex-1 h-px bg-[var(--line)] translate-y-[-5px]" />
    </div>
  )
}

const themes = [
  { name: "blue", label: "🔵 Blue", accent: "#3b82f6", soft: "#2563eb" },
  { name: "green", label: "🟢 Green", accent: "#10b981", soft: "#059669" },
  { name: "red", label: "🔴 Red", accent: "#ef4444", soft: "#dc2626" },
]

export default function App() {
  useReveal()
  const [scrolled, setScrolled] = useState(false)
  const [themeIdx, setThemeIdx] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeTag, setActiveTag] = useState("All")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)
  const [dhakaTime, setDhakaTime] = useState("")
  const [emailCopied, setEmailCopied] = useState(false)

  const allSkills = skills.flatMap((s) => s.items)
  const projectTags = ["All", ...new Set(projects.flatMap((p) => p.tags))]
  const filteredProjects = activeTag === "All" ? projects : projects.filter((p) => p.tags.includes(activeTag))

  const handleThemeChange = (name) => {
    const idx = themes.findIndex((t) => t.name === name)
    if (idx !== -1) setThemeIdx(idx)
  }

  // Live Dhaka Time Clock (UTC+6)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Dhaka",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      })
      setDhakaTime(timeStr)
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Dynamic Theme Colors
  useEffect(() => {
    const t = themes[themeIdx]
    document.documentElement.style.setProperty('--accent', t.accent)
    document.documentElement.style.setProperty('--accent-soft', t.soft)
  }, [themeIdx])

  // Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Header background on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Keyboard Shortcuts (T for terminal, 1-6 for sections, Esc to close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) {
        if (e.key === "Escape") document.activeElement.blur()
        return
      }

      if (e.key.toLowerCase() === "t" || e.key === "`") {
        e.preventDefault()
        setTerminalOpen((prev) => !prev)
      } else if (e.key === "Escape") {
        setMobileMenuOpen(false)
        setTerminalOpen(false)
      } else if (e.key >= "1" && e.key <= "9") {
        const idx = parseInt(e.key) - 1
        if (nav[idx]) {
          const targetId = nav[idx][0]
          const el = document.getElementById(targetId)
          if (el) el.scrollIntoView({ behavior: "smooth" })
        }
      } else if (e.key === "0") {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const copyEmailToClipboard = (e) => {
    if (e) e.preventDefault()
    navigator.clipboard.writeText(profile.email)
    setEmailCopied(true)
    setToastMessage(`✓ Copied to clipboard: ${profile.email}`)
    setTimeout(() => {
      setEmailCopied(false)
      setToastMessage(null)
    }, 3200)
  }

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`)
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const nav = [
    ["highlights", "Highlights"],
    ["about", "About"],
    ...(projects.length ? [["projects", "Projects"]] : []),
    ["sandbox", "AI Demo"],
    ["skills", "Stack"],
    ["certs", "Certs"],
    ["contact", "Contact"],
  ]

  return (
    <div className="relative min-h-screen">
      <NeuralField />
      <Cursor />
      <div className="grain" />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 toast-popup bg-[var(--bg2)]/95 backdrop-blur-xl border border-[var(--accent)] text-[var(--fg)] px-5 py-2.5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_var(--accent)] font-mono text-xs flex items-center gap-2 pointer-events-none">
          <span className="text-[var(--accent)]">●</span>
          <span>{toastMessage}</span>
        </div>
      )}
      
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-[var(--accent)] z-50 transition-all duration-100" 
        style={{ width: `${scrollProgress}%`, boxShadow: "0 0 12px var(--accent)" }} 
      />

      {/* Header */}
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          scrolled
            ? "h-16 bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--line)] shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
            : "h-20 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-10 h-full flex items-center justify-between">
          <a href="#top" className="serif-name text-2xl text-[var(--fg)] group">
            {firstName}<span className="text-[var(--accent)] group-hover:animate-ping inline-block">.</span>
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6 mx-6 font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
            {nav.map(([h, l], i) => (
              <a key={h} href={`#${h}`} className="link-sweep hover:text-[var(--fg)] transition-colors whitespace-nowrap">
                <span className="text-[var(--accent)] mr-1">0{i + 1}</span> {l}
              </a>
            ))}
          </div>

          {/* Right Header Badges & Actions */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Live Clock & Open to work beacon */}
            <div className="hidden xl:flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-[var(--muted)] bg-[var(--bg2)]/60 border border-[var(--line)] rounded-full px-3.5 py-1">
              <span className="pulse-beacon">
                <span />
                <span />
              </span>
              <span className="text-[var(--fg)] text-[11px]">Dhaka {dhakaTime ? dhakaTime.slice(0, 5) : "21:50"}</span>
              <span className="text-[var(--accent)] text-[10px]">● OPEN</span>
            </div>

            {/* Accent Theme Switcher */}
            <button 
              onClick={() => setThemeIdx((prev) => (prev + 1) % themes.length)}
              className="w-8 h-8 rounded-full border border-[var(--line)] flex items-center justify-center hover:border-[var(--accent)]/60 transition-all cursor-none bg-[var(--bg2)]/60 shadow-sm active:scale-95"
              title="Cycle Accent Color Theme"
            >
              <span className="w-3 h-3 rounded-full transition-colors duration-300" style={{ backgroundColor: "var(--accent)", boxShadow: "0 0 10px var(--accent)" }} />
            </button>

            {/* Résumé Link */}
            <a href={`${profile.resumeUrl}?v=3`} target="_blank" rel="noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] border border-[var(--accent)]/40 rounded-full px-4 py-1.5 hover:bg-[var(--accent)]/10 hover:border-[var(--accent)] transition-all whitespace-nowrap shadow-sm">
              Résumé ↗
            </a>

            {/* Mobile Menu Trigger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-8 h-8 rounded-full border border-[var(--line)] flex items-center justify-center hover:border-[var(--accent)]/50 transition-all cursor-none bg-[var(--bg2)]/60 shadow-sm z-50 relative"
              title="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-4 h-4 text-[var(--fg)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-[var(--fg)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <div
        className={`lg:hidden fixed inset-0 bg-[var(--bg)]/95 backdrop-blur-2xl z-40 flex items-center justify-center transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <button 
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-6 right-6 w-10 h-10 rounded-full border border-[var(--line)] flex items-center justify-center hover:border-[var(--accent)]/50 bg-[var(--bg2)]/80 text-[var(--fg)] active:scale-95 transition-all shadow-md"
          title="Close Mobile Menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <nav className="flex flex-col items-center gap-7 font-mono text-lg uppercase tracking-widest text-[var(--muted)]">
          {nav.map(([h, l], i) => (
            <a
              key={h}
              href={`#${h}`}
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[var(--fg)] transition-colors flex flex-col items-center gap-1"
            >
              <span className="text-[var(--accent)] text-xs font-semibold">0{i + 1}</span> 
              <span className="text-[var(--fg)] text-xl font-bold tracking-wider">{l}</span>
            </a>
          ))}
          <div className="pt-4 flex gap-4">
            <button onClick={copyEmailToClipboard} className="text-xs font-mono text-[var(--accent)] border border-[var(--line)] rounded-full px-4 py-2 bg-[var(--bg2)]">
              Copy Email
            </button>
            <button onClick={() => { setMobileMenuOpen(false); setTerminalOpen(true); }} className="text-xs font-mono text-[var(--fg)] border border-[var(--accent)] rounded-full px-4 py-2 bg-[var(--accent)]/10">
              Open Shell
            </button>
          </div>
        </nav>
      </div>

      <main id="top" className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10">
        {/* HERO */}
        <section className="min-h-screen flex flex-col justify-center pt-28 pb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="pulse-beacon">
              <span />
              <span />
            </span>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
              {profile.headline}
            </p>
          </div>

          <h1 className="serif-name text-[clamp(2.75rem,10.5vw,8.5rem)] text-[var(--fg)]">
            {firstName}
            <br />
            <span className="italic text-[var(--accent)]">{lastName || ""}</span>
          </h1>

          <div className="mt-12 grid gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <p className="max-w-lg text-lg sm:text-xl leading-relaxed text-[var(--muted)]">
              {profile.heroIntro}
            </p>
            <ul className="md:text-right font-mono text-xs uppercase tracking-widest text-[var(--muted)] space-y-1.5">
              {profile.roles.map((r) => (
                <li key={r}><span className="text-[var(--accent)] mr-2">/</span>{r}</li>
              ))}
            </ul>
          </div>

          <div className="mt-14 flex items-center gap-6">
            <a href="#highlights"
              className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[var(--muted)] hover:text-[var(--fg)] transition-colors">
              <span className="h-10 w-10 rounded-full border border-[var(--line)] grid place-items-center group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] transition-colors">↓</span>
              Scroll to explore
            </a>
            <button 
              onClick={() => setTerminalOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--accent)] border border-[var(--line)] hover:border-[var(--accent)]/50 rounded-full px-4 py-2.5 bg-[var(--bg2)]/60 transition-all cursor-none"
            >
              <span>Launch Terminal</span>
              <kbd className="kbd-badge">T</kbd>
            </button>
          </div>
        </section>

        {/* HIGHLIGHTS */}
        <section id="highlights" className="py-16 sm:py-24">
          <SectionHead n="01" title="Highlights" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((a, i) => (
              <div key={a.title + a.year} data-reveal
                onMouseMove={handleCardMouseMove}
                className="spotlight-card rounded-xl p-6 bg-[var(--bg2)]/40 hover:bg-[var(--bg2)] transition-all">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[var(--accent)]">0{i + 1}</span>
                  <span className="font-mono text-xs text-[var(--muted)]">{a.year}</span>
                </div>
                <h3 className="display text-xl text-[var(--fg)] mt-4 leading-snug group-hover:text-[var(--accent)] transition-colors">
                  {a.title}
                </h3>
                <p className="mt-2 text-[15px] text-[var(--muted)]">{a.org}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-16 sm:py-24">
          <SectionHead n="02" title="About" />
          {/* row 1 — portrait + bio */}
          <div className="grid md:grid-cols-12 gap-5 items-stretch" data-reveal>
            {/* portrait */}
            <div className="md:col-span-4">
              <div className="group relative h-full min-h-72 rounded-xl overflow-hidden border border-[var(--line)] bg-[var(--bg2)]">
                <img
                  src="/profile.jpg"
                  alt="Shahariar Asfaq Ovi"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-[center_top] transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/80 via-transparent to-transparent" />
                <div className="absolute inset-0 ring-1 ring-inset ring-[var(--accent)]/0 group-hover:ring-[var(--accent)]/40 transition duration-500 rounded-xl" />
              </div>
            </div>
            {/* bio */}
            <div className="md:col-span-8 border border-[var(--line)] rounded-xl p-7 bg-[var(--bg2)]/40 flex flex-col">
              <p className="text-lg sm:text-xl leading-relaxed text-[var(--fg)]/90">{profile.about}</p>
              <div className="flex flex-wrap gap-2 mt-6">
                {[
                  { label: `📍 ${profile.location}` },
                  { label: "🏆 2× ICPC Dhaka Regionalist" },
                  { label: "🤖 AI Data Trainer · GenMorphics" },
                  { label: "⚡ Model Context Protocol (MCP)" },
                ].map((chip) => (
                  <span key={chip.label} className="font-mono text-xs text-[var(--muted)] border border-[var(--line)] rounded-full px-3 py-1.5 bg-[var(--bg)]/40">
                    {chip.label}
                  </span>
                ))}
              </div>
              <Socials className="mt-auto pt-7" onCopyEmail={copyEmailToClipboard} />
            </div>
          </div>

          {/* row 2 — education + experience */}
          <div className="grid md:grid-cols-12 gap-5 mt-5" data-reveal>
            <div className="md:col-span-4 border border-[var(--line)] rounded-xl p-7 bg-[var(--bg2)]/40">
              <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-5">Education</h4>
              {education.map((e) => (
                <div key={e.school}>
                  <p className="display text-xl text-[var(--fg)] leading-snug">{e.degree}</p>
                  <p className="text-[15px] text-[var(--muted)] mt-1">{e.school}</p>
                  <p className="font-mono text-xs text-[var(--muted)] mt-2">{e.period}</p>
                  {e.detail && <p className="text-[15px] text-[var(--muted)] mt-3 leading-relaxed">{e.detail}</p>}
                </div>
              ))}
            </div>
            {experience.length > 0 && (
              <div className="md:col-span-8 grid sm:grid-cols-2 gap-4 content-start">
                {experience.map((x) => (
                  <div key={x.role + x.org}
                    onMouseMove={handleCardMouseMove}
                    className="spotlight-card rounded-xl p-6 bg-[var(--bg2)]/40 hover:bg-[var(--bg2)] transition-all">
                    <p className="display text-lg text-[var(--fg)] leading-snug">{x.role}</p>
                    {x.url ? (
                      <a href={x.url} target="_blank" rel="noreferrer" className="text-[15px] text-[var(--accent)] mt-1 inline-block hover:underline">{x.org} ↗</a>
                    ) : (
                      <p className="text-[15px] text-[var(--accent)] mt-1">{x.org}</p>
                    )}
                    <p className="font-mono text-xs text-[var(--muted)] mt-2">{x.period}</p>
                    <p className="text-[15px] text-[var(--muted)] mt-3 leading-relaxed">{x.detail}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* PROJECTS */}
        {projects.length > 0 && (
          <section id="projects" className="py-16 sm:py-24">
            <SectionHead n="03" title="Projects" />
            
            {/* Project Filter Chips */}
            <div className="flex flex-wrap gap-2 mb-8" data-reveal>
              {projectTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`font-mono text-xs uppercase tracking-wider px-4 py-1.5 rounded-full border transition-all cursor-none ${
                    activeTag === tag
                      ? "bg-[var(--accent)] text-[#0b1220] border-[var(--accent)] font-semibold shadow-[0_0_12px_var(--accent)]"
                      : "text-[var(--muted)] border-[var(--line)] hover:text-[var(--fg)] hover:border-[var(--accent)]/50 bg-[var(--bg2)]/30"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {filteredProjects.map((p) => (
                <a key={p.title} href={p.demo || p.repo || "#"} target="_blank" rel="noreferrer"
                  onMouseMove={handleCardMouseMove}
                  className="spotlight-card rounded-xl p-6 bg-[var(--bg2)]/40 hover:bg-[var(--bg2)] transition-all">
                  <div className="flex items-center justify-between">
                    <h3 className="display text-xl text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">{p.title}</h3>
                    <span className="text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all">↗</span>
                  </div>
                  <p className="text-[15px] text-[var(--muted)] mt-2 leading-relaxed">{p.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {p.tags.map((t) => (
                      <span key={t} className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted)] border border-[var(--line)] rounded px-2 py-0.5 bg-[var(--bg)]/60">{t}</span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* AI SANDBOX */}
        <section id="sandbox" className="py-16 sm:py-24">
          <SectionHead n="04" title="AI Sandbox" />
          <div data-reveal>
            <SentimentAnalyzer />
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="py-16 sm:py-24">
          <SectionHead n="05" title="Stack & Tools" />
          <div className="marquee overflow-hidden border-y border-[var(--line)] py-5 mb-10" data-reveal>
            <div className="marquee-track">
              {[...allSkills, ...allSkills].map((s, i) => (
                <span key={i} className="display text-2xl sm:text-3xl text-[var(--fg)]/60 mx-5 hover:text-[var(--accent)] transition-colors cursor-none">
                  {s}<span className="text-[var(--accent)] mx-5">/</span>
                </span>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4" data-reveal>
            {skills.map((s) => (
              <div key={s.group} 
                onMouseMove={handleCardMouseMove}
                className="spotlight-card rounded-xl p-5 bg-[var(--bg2)]/40 hover:bg-[var(--bg2)] transition-all">
                <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-4">{s.group}</h4>
                <ul className="space-y-2">
                  {s.items.map((it) => (
                    <li key={it} className="text-[14px] text-[var(--muted)] hover:text-[var(--fg)] transition-colors">{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section id="certs" className="py-16 sm:py-24">
          <SectionHead n="06" title="Certifications" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" data-reveal>
            {certifications.map((c) => {
              const inner = (
                <>
                  <div className="flex-1">
                    <h4 className="text-base text-[var(--fg)] leading-snug group-hover:text-[var(--accent)] transition-colors flex items-center justify-between gap-2">
                      <span>{c.title}</span>
                      {c.url && <span className="font-mono text-xs text-[var(--accent)] shrink-0">↗</span>}
                    </h4>
                    <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mt-2">{c.org}</p>
                  </div>
                  <span className="font-mono text-xs text-[var(--muted)] shrink-0 self-start ml-2">{c.year}</span>
                </>
              );

              return c.url ? (
                <a
                  key={c.title}
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  onMouseMove={handleCardMouseMove}
                  className="spotlight-card rounded-xl p-5 bg-[var(--bg2)]/40 flex items-start justify-between gap-3 hover:bg-[var(--bg2)] transition-all group"
                  title="View Certificate PDF"
                >
                  {inner}
                </a>
              ) : (
                <div
                  key={c.title}
                  onMouseMove={handleCardMouseMove}
                  className="spotlight-card rounded-xl p-5 bg-[var(--bg2)]/40 flex items-start justify-between gap-3 transition-all"
                >
                  {inner}
                </div>
              );
            })}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-20 sm:py-28 text-center" data-reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-6">( Let's talk )</p>
          <p className="max-w-xl mx-auto text-lg leading-relaxed text-[var(--muted)] mb-6">
            I'm open to Backend AI, ML Engineering &amp; Distributed Systems roles. The fastest way to reach me is email.
          </p>
          <a 
            href={`mailto:${profile.email}`}
            className="serif-name italic text-[clamp(2.5rem,8vw,5.5rem)] text-[var(--fg)] hover:text-[var(--accent)] transition-colors inline-block"
          >
            Say hello
          </a>
          <div className="mt-6 flex items-center justify-center gap-4">
            <button 
              onClick={copyEmailToClipboard}
              className="font-mono text-sm text-[var(--accent)] border border-[var(--accent)]/30 hover:border-[var(--accent)] rounded-full px-4 py-1.5 bg-[var(--accent)]/5 hover:bg-[var(--accent)]/15 transition-all cursor-none shadow-sm flex items-center gap-2"
            >
              <span>{profile.email}</span>
              <span className="text-xs opacity-75">{emailCopied ? "✓ Copied" : "📋 Click to Copy"}</span>
            </button>
          </div>
          <Socials className="justify-center mt-9" onCopyEmail={copyEmailToClipboard} />
        </section>
      </main>

      {/* RICH INTERACTIVE FOOTER WITH ANIMATIONS */}
      <footer className="footer-container relative z-10 border-t border-[var(--line)] bg-[var(--bg)]/90 backdrop-blur-2xl pt-20 pb-12 overflow-hidden">
        {/* Animated Top Border Light Beam */}
        <div className="footer-beam" />

        {/* Interactive Quantum Wave Mesh Canvas */}
        <FooterMeshCanvas />

        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10">
          {/* Top Row: Brand & Live Radar Telemetry */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-12 border-b border-[var(--line)]">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="serif-name text-3xl sm:text-4xl text-[var(--fg)]">
                  {profile.name}
                </h3>
                <span className="pulse-beacon">
                  <span />
                  <span />
                </span>
              </div>
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] mt-2">
                Backend AI Systems · Distributed Quotas · Model Context Protocol (MCP)
              </p>
            </div>

            {/* Live Radar Telemetry Card */}
            <div className="flex flex-wrap items-center gap-3.5 bg-[var(--bg2)]/90 backdrop-blur-md border border-[var(--line)] hover:border-[var(--accent)]/50 rounded-2xl p-3 sm:px-5 font-mono text-xs transition-colors shadow-lg shadow-[var(--bg)]/50">
              <div className="flex items-center gap-2.5">
                {/* Animated Radar Spinner */}
                <div className="relative flex items-center justify-center h-4 w-4">
                  <div className="absolute inset-0 rounded-full border border-emerald-500/30" />
                  <div className="absolute inset-0.5 rounded-full border border-dashed border-emerald-400/60 radar-sweep" />
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <span className="text-[var(--fg)] font-semibold">Dhaka, BD (UTC+6):</span>
                <span className="text-[var(--accent)] font-medium">{dhakaTime || "Live"}</span>
              </div>
              <span className="text-[var(--line)] hidden sm:inline">|</span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[var(--muted)]">24ms</span>
                <span className="text-emerald-400 font-medium">● Open to Work</span>
              </div>
            </div>
          </div>

          {/* Middle Row: Sitemap, Connect & System Navigation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 py-12 border-b border-[var(--line)] font-mono text-xs">
            {/* Column 1: Navigation Index */}
            <div>
              <h4 className="text-[var(--accent)] uppercase tracking-widest font-semibold mb-4 flex items-center gap-2">
                <span>Directory Index</span>
                <span className="text-[10px] opacity-60">[01-07]</span>
              </h4>
              <ul className="space-y-2.5 uppercase tracking-wider text-[var(--muted)]">
                {nav.map(([h, l], idx) => (
                  <li key={h}>
                    <a href={`#${h}`} className="link-sweep hover:text-[var(--fg)] transition-colors flex items-center justify-between group">
                      <span>0{idx + 1} // {l}</span>
                      <span className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Direct Connect */}
            <div>
              <h4 className="text-[var(--accent)] uppercase tracking-widest font-semibold mb-4">
                Direct Connect
              </h4>
              <ul className="space-y-2.5 uppercase tracking-wider text-[var(--muted)]">
                <li>
                  <a href={profile.socials.github} target="_blank" rel="noreferrer" className="link-sweep hover:text-[var(--fg)] transition-colors flex items-center justify-between group">
                    <span>GitHub Profile</span>
                    <span className="text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                  </a>
                </li>
                <li>
                  <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="link-sweep hover:text-[var(--fg)] transition-colors flex items-center justify-between group">
                    <span>LinkedIn Network</span>
                    <span className="text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                  </a>
                </li>
                <li>
                  <button onClick={copyEmailToClipboard} className="link-sweep hover:text-[var(--fg)] transition-colors flex items-center justify-between w-full text-left cursor-none group">
                    <span>Direct Email ({emailCopied ? "Copied! ✓" : "Copy"})</span>
                    <span className="text-[var(--accent)] group-hover:scale-110 transition-transform">📋</span>
                  </button>
                </li>
                <li>
                  <a href={`${profile.resumeUrl}?v=3`} target="_blank" rel="noreferrer" className="link-sweep hover:text-[var(--fg)] transition-colors flex items-center justify-between group">
                    <span>PDF Résumé (1-Page ATS)</span>
                    <span className="text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Telemetry & Terminal Command */}
            <div>
              <h4 className="text-[var(--accent)] uppercase tracking-widest font-semibold mb-4">
                System Controls &amp; Shell
              </h4>
              <div className="bg-[var(--bg2)]/80 backdrop-blur-md border border-[var(--line)] hover:border-[var(--accent)]/40 rounded-xl p-4 space-y-3 transition-colors shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--muted)]">Interactive Shell</span>
                  <button 
                    onClick={() => setTerminalOpen(true)}
                    className="text-[var(--accent)] hover:text-[var(--fg)] border border-[var(--accent)]/40 hover:border-[var(--accent)] rounded px-2.5 py-1 bg-[var(--accent)]/10 hover:bg-[var(--accent)]/20 transition-all cursor-none flex items-center gap-1.5"
                  >
                    <span>Launch [^]</span>
                    <kbd className="kbd-badge text-[9px]">T</kbd>
                  </button>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[var(--muted)]">Section Jump</span>
                  <span className="text-[var(--muted)]">Keys <kbd className="kbd-badge text-[9px]">1</kbd>–<kbd className="kbd-badge text-[9px]">7</kbd></span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[var(--muted)]">Accent Palette</span>
                  <button 
                    onClick={() => setThemeIdx((prev) => (prev + 1) % themes.length)}
                    className="text-[var(--accent)] hover:underline cursor-none flex items-center gap-1"
                  >
                    <span>{themes[themeIdx].label}</span>
                    <span className="text-[10px]">⇄</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Letter-by-Letter Neon Glow Signature */}
          <div className="pt-10 pb-2 overflow-hidden select-none text-center">
            <div className="inline-flex flex-wrap justify-center items-center gap-x-5 sm:gap-x-8 gap-y-1">
              {["SHAHARIAR", "ASFAQ", "OVI"].map((word, wIdx) => (
                <div key={wIdx} className="inline-flex items-center">
                  {word.split("").map((char, cIdx) => (
                    <span
                      key={cIdx}
                      className="kinetic-letter text-[clamp(2.4rem,8.2vw,7rem)] cursor-none"
                    >
                      {char}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row: Copyright & Back-to-Top Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-8 font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
            <div className="flex items-center gap-2">
              <span>© {new Date().getFullYear()} {profile.name}</span>
              <span className="opacity-40">·</span>
              <span>Dhaka, Bangladesh</span>
            </div>

            {/* Back to top smooth scroll */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 border border-[var(--line)] hover:border-[var(--accent)]/60 rounded-full px-5 py-2.5 bg-[var(--bg2)] hover:bg-[var(--bg2)] text-[var(--fg)] transition-all cursor-none shadow-sm active:scale-95"
            >
              <span>Back to Top</span>
              <span className="text-[var(--accent)] group-hover:-translate-y-1 transition-transform">↑</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Omega Terminal Shell */}
      <Terminal 
        isOpen={terminalOpen} 
        setIsOpen={setTerminalOpen} 
        onThemeChange={handleThemeChange} 
      />
    </div>
  )
}
