import { useEffect, useState } from "react"
import { profile, skills, education, experience, achievements, certifications, projects } from "./data"
import NeuralField from "./components/NeuralField"
import Cursor from "./components/Cursor"
import SentimentAnalyzer from "./components/SentimentAnalyzer"
import Terminal from "./components/Terminal"

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

function Socials({ className = "" }) {
  const { socials, email } = profile
  const links = [
    socials.github && ["GitHub", socials.github],
    socials.linkedin && ["LinkedIn", socials.linkedin],
    socials.kaggle && ["Kaggle", socials.kaggle],
    socials.twitter && ["Twitter", socials.twitter],
    email && ["Email", `mailto:${email}`],
  ].filter(Boolean)
  return (
    <div className={`flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-widest ${className}`}>
      {links.map(([label, href]) => (
        <a key={label} href={href} target="_blank" rel="noreferrer"
          className="link-sweep text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
          {label} ↗
        </a>
      ))}
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
  
  const allSkills = skills.flatMap((s) => s.items)
  const projectTags = ["All", ...new Set(projects.flatMap((p) => p.tags))]
  const filteredProjects = activeTag === "All" ? projects : projects.filter((p) => p.tags.includes(activeTag))

  const handleThemeChange = (name) => {
    const idx = themes.findIndex((t) => t.name === name)
    if (idx !== -1) setThemeIdx(idx)
  }

  useEffect(() => {
    const t = themes[themeIdx]
    document.documentElement.style.setProperty('--accent', t.accent)
    document.documentElement.style.setProperty('--accent-soft', t.soft)
  }, [themeIdx])

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

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
      
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-[var(--accent)] z-50 transition-all duration-100" 
        style={{ width: `${scrollProgress}%`, boxShadow: "0 0 10px var(--accent)" }} 
      />

      {/* header */}
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          scrolled
            ? "h-16 bg-[var(--bg)]/70 backdrop-blur-xl border-b border-[var(--line)] shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
            : "h-20 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-10 h-full flex items-center justify-between">
          <a href="#top" className="serif-name text-2xl text-[var(--fg)]">
            {firstName}<span className="text-[var(--accent)]">.</span>
          </a>
          <div className="hidden lg:flex items-center gap-4 xl:gap-6 mx-6 font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
            {nav.map(([h, l], i) => (
              <a key={h} href={`#${h}`} className="link-sweep hover:text-[var(--fg)] transition-colors whitespace-nowrap">
                <span className="text-[var(--accent)] mr-1">0{i + 1}</span> {l}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-5">
            <span className="hidden xl:flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--muted)] whitespace-nowrap">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-60 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
              </span>
              Open to work
            </span>
            <button 
              onClick={() => setThemeIdx((prev) => (prev + 1) % themes.length)}
              className="w-8 h-8 rounded-full border border-[var(--line)] flex items-center justify-center hover:border-[var(--accent)]/50 transition-all cursor-none bg-[var(--bg2)]/60 shadow-sm"
              title="Cycle Accent Color Theme"
            >
              <span className="w-3 h-3 rounded-full transition-colors duration-300" style={{ backgroundColor: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }} />
            </button>
            <a href={`${profile.resumeUrl}?v=2`} target="_blank" rel="noreferrer"
              className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] border border-[var(--accent)]/40 rounded-full px-4 py-1.5 hover:bg-[var(--accent)]/10 transition-colors whitespace-nowrap">
              Résumé ↗
            </a>
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
        {/* Dedicated Close Button */}
        <button 
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-6 right-6 w-10 h-10 rounded-full border border-[var(--line)] flex items-center justify-center hover:border-[var(--accent)]/50 bg-[var(--bg2)]/80 text-[var(--fg)] active:scale-95 transition-all shadow-md"
          title="Close Mobile Menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <nav className="flex flex-col items-center gap-8 font-mono text-lg uppercase tracking-widest text-[var(--muted)]">
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
        </nav>
      </div>

      <main id="top" className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10">
        {/* HERO */}
        <section className="min-h-screen flex flex-col justify-center pt-28 pb-16">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-7">
            {profile.headline}
          </p>
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

          <a href="#highlights"
            className="group mt-14 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[var(--muted)] hover:text-[var(--fg)] transition-colors">
            <span className="h-10 w-10 rounded-full border border-[var(--line)] grid place-items-center group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] transition-colors">↓</span>
            Scroll to explore
          </a>
        </section>

        {/* HIGHLIGHTS */}
        <section id="highlights" className="py-16 sm:py-24">
          <SectionHead n="01" title="Highlights" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((a, i) => (
              <div key={a.title + a.year} data-reveal
                className="group border border-[var(--line)] rounded-xl p-6 bg-[var(--bg2)]/40 hover:border-[var(--accent)]/40 hover:bg-[var(--bg2)] transition-colors">
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
                {/* gentle fade into the page background at the bottom edge only */}
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
                  { label: "💼 FlyRank AI", href: "https://flyrank.ai/" },
                ].map((chip) =>
                  chip.href ? (
                    <a key={chip.label} href={chip.href} target="_blank" rel="noreferrer"
                      className="font-mono text-xs text-[var(--muted)] border border-[var(--line)] rounded-full px-3 py-1.5 hover:border-[var(--accent)]/50 hover:text-[var(--accent)] transition-colors">
                      {chip.label} ↗
                    </a>
                  ) : (
                    <span key={chip.label} className="font-mono text-xs text-[var(--muted)] border border-[var(--line)] rounded-full px-3 py-1.5">{chip.label}</span>
                  )
                )}
              </div>
              <Socials className="mt-auto pt-7" />
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
                    className="border border-[var(--line)] rounded-xl p-6 bg-[var(--bg2)]/40 hover:border-[var(--accent)]/40 transition-colors">
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

        {/* PROJECTS (renders when you add repos to data.js) */}
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
                      : "text-[var(--muted)] border-[var(--line)] hover:text-[var(--fg)] hover:border-[var(--accent)]/50"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {filteredProjects.map((p) => (
                <a key={p.title} href={p.demo || p.repo || "#"} target="_blank" rel="noreferrer"
                  className="group border border-[var(--line)] rounded-xl p-6 bg-[var(--bg2)]/40 hover:border-[var(--accent)]/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <h3 className="display text-xl text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">{p.title}</h3>
                    <span className="text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all">↗</span>
                  </div>
                  <p className="text-[15px] text-[var(--muted)] mt-2 leading-relaxed">{p.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {p.tags.map((t) => (
                      <span key={t} className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted)] border border-[var(--line)] rounded px-2 py-0.5">{t}</span>
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
                <span key={i} className="display text-2xl sm:text-3xl text-[var(--fg)]/60 mx-5">
                  {s}<span className="text-[var(--accent)] mx-5">/</span>
                </span>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" data-reveal>
            {skills.map((s) => (
              <div key={s.group} className="border border-[var(--line)] rounded-xl p-6 bg-[var(--bg2)]/40 hover:border-[var(--accent)]/40 transition-colors">
                <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-4">{s.group}</h4>
                <ul className="space-y-2">
                  {s.items.map((it) => (
                    <li key={it} className="text-[15px] text-[var(--muted)] hover:text-[var(--fg)] transition-colors">{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section id="certs" className="py-16 sm:py-24">
          <SectionHead n="06" title="Certifications" />
          <div className="grid sm:grid-cols-2 gap-4" data-reveal>
            {certifications.map((c) => (
              <div key={c.title} className="border border-[var(--line)] rounded-xl p-6 bg-[var(--bg2)]/40 flex items-start justify-between gap-4 hover:border-[var(--accent)]/40 transition-colors">
                <div>
                  <h4 className="text-base text-[var(--fg)] leading-snug">{c.title}</h4>
                  <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mt-2">{c.org}</p>
                </div>
                <span className="font-mono text-sm text-[var(--muted)] shrink-0">{c.year}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-20 sm:py-28 text-center" data-reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-6">( Let's talk )</p>
          <p className="max-w-xl mx-auto text-lg leading-relaxed text-[var(--muted)] mb-6">
            I'm open to AI/ML &amp; Data roles and collaborations. The fastest way to reach me is email.
          </p>
          <a href={`mailto:${profile.email}`}
            className="serif-name italic text-[clamp(2.5rem,8vw,5.5rem)] text-[var(--fg)] hover:text-[var(--accent)] transition-colors">
            Say hello
          </a>
          <p className="font-mono text-sm text-[var(--muted)] mt-6">{profile.email}</p>
          <Socials className="justify-center mt-9" />
        </section>
      </main>

      <footer className="relative z-10 border-t border-[var(--line)]">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-8 flex flex-col sm:flex-row gap-3 justify-between font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>Built with React + Canvas</span>
        </div>
      </footer>
      <Terminal onThemeChange={handleThemeChange} />
    </div>
  )
}
