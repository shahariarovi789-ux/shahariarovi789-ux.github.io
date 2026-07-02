import { useState, useEffect, useRef } from "react"
import { profile, projects } from "../data"

const COMMANDS_INFO = {
  help: "Show all available terminal commands.",
  about: "Display Shahariar's B.Sc. CSE background and bio.",
  projects: "List detailed project summaries and repository URLs.",
  theme: "Change accent theme. Usage: theme <blue | green | red>",
  clear: "Clear the terminal logs."
}

export default function Terminal({ onThemeChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [history, setHistory] = useState([
    { type: "welcome" },
    { text: "Welcome to Omega Shell! Type 'help' to start.", type: "system" }
  ])
  const terminalEndRef = useRef(null)

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [history])

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cleanInput = input.trim();
    if (!cleanInput) return;

    const [cmd, ...args] = cleanInput.toLowerCase().split(/\s+/);
    const newLog = [{ text: `omega-shell$ ${cleanInput}`, type: "input" }];

    switch (cmd) {
      case "help":
        newLog.push({ text: "Available commands:", type: "output" });
        Object.entries(COMMANDS_INFO).forEach(([name, desc]) => {
          newLog.push({ text: `  ${name.padEnd(10)} - ${desc}`, type: "output" });
        });
        break;

      case "about":
        newLog.push({ 
          text: `Shahariar Asfaq Ovi\n------------------\nEducation: ${profile.about}\nLocation: ${profile.location}\nEmail: ${profile.email}\nStatus: ${profile.socials.github}`, 
          type: "output" 
        });
        break;

      case "projects":
        newLog.push({ text: "Featured Projects:", type: "output" });
        projects.forEach((p, idx) => {
          newLog.push({ text: `[0${idx + 1}] ${p.title} (${p.tags.join(", ")})\n     Repo: ${p.repo}`, type: "output" });
        });
        break;

      case "theme":
        const targetTheme = args[0];
        if (targetTheme === "blue" || targetTheme === "green" || targetTheme === "red") {
          onThemeChange(targetTheme);
          newLog.push({ text: `Accent theme updated to ${targetTheme.toUpperCase()}!`, type: "success" });
        } else {
          newLog.push({ text: "Error: Invalid theme. Usage: theme <blue | green | red>", type: "error" });
        }
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        newLog.push({ text: `Command not found: '${cmd}'. Type 'help' for options.`, type: "error" });
        break;
    }

    setHistory((prev) => [...prev, ...newLog]);
    setInput("");
  }

  return (
    <div 
      className={`fixed bottom-0 right-6 sm:right-10 z-40 bg-[var(--bg2)]/95 backdrop-blur-xl border rounded-t-xl transition-all duration-300 ${
        isOpen ? "h-[320px] w-[350px] sm:w-[500px]" : "h-10 w-44"
      }`}
      style={{
        borderColor: isOpen ? "var(--accent)" : "var(--line)",
        boxShadow: isOpen ? "0 0 25px var(--accent), 0 -8px 30px rgba(0,0,0,0.65)" : "none"
      }}
    >
      {/* Terminal Title Bar */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-4 py-2 border-b cursor-none select-none h-10 bg-[var(--bg)]/80 rounded-t-xl"
        style={{ borderBottomColor: isOpen ? "var(--accent)" : "var(--line)" }}
      >
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
          <span className="font-mono text-xs text-[var(--muted)] ml-2">omega-shell.sh</span>
        </div>
        <span className="font-mono text-xs text-[var(--accent)] hover:text-[var(--fg)]">
          {isOpen ? "Collapse [-]" : "Interactive Shell [^]"}
        </span>
      </div>

      {/* Terminal logs & Input */}
      {isOpen && (
        <div className="flex flex-col h-[280px] p-4 font-mono text-xs">
          {/* logs container */}
          <div className="flex-1 overflow-y-auto mb-2 space-y-1.5 scrollbar-thin">
            {history.map((log, index) => {
              if (log.type === "welcome") {
                return (
                  <div key={index} className="flex gap-5 items-center py-2 border-b border-[var(--line)]/50 mb-3 select-none">
                    {/* ASCII Logo */}
                    <pre className="text-[var(--accent)] font-bold text-[10px] leading-tight filter drop-shadow-[0_0_8px_var(--accent)] shrink-0">
{`   /\\
  /  \\
 /    \\
/______\\`}
                    </pre>
                    {/* Specs */}
                    <div className="font-mono text-[10px] space-y-0.5">
                      <div><span className="text-[var(--accent)] font-semibold">ovi</span><span className="text-[var(--muted)]">@</span><span className="text-[var(--accent)] font-semibold">omega-shell</span></div>
                      <div className="h-px bg-[var(--line)] my-1" />
                      <div><span className="text-[var(--fg)] font-semibold">OS:</span> <span className="text-[var(--muted)]">React + Vite Runtime</span></div>
                      <div><span className="text-[var(--fg)] font-semibold">Canvas:</span> <span className="text-[var(--muted)]">NeuralField Graphics</span></div>
                      <div><span className="text-[var(--fg)] font-semibold">Shell:</span> <span className="text-[var(--accent)] font-semibold">Omega Shell v1.2.0</span></div>
                      <div><span className="text-[var(--fg)] font-semibold">Status:</span> <span className="text-[var(--muted)]">Dhaka Regional Finalist</span></div>
                      <div><span className="text-[var(--fg)] font-semibold">Active:</span> <span className="text-[var(--muted)]">Intern @ FlyRank AI</span></div>
                    </div>
                  </div>
                )
              }
              return (
                <div 
                  key={index} 
                  className="whitespace-pre-wrap leading-relaxed"
                  style={{
                    color: 
                      log.type === "error" ? "#ef4444" : 
                      log.type === "success" ? "#10b981" : 
                      log.type === "input" ? "var(--fg)" : 
                      log.type === "system" ? "var(--accent)" : 
                      "var(--muted)"
                  }}
                >
                  {log.text}
                </div>
              )
            })}
            <div ref={terminalEndRef} />
          </div>

          {/* Form input */}
          <form onSubmit={handleCommandSubmit} className="flex items-center border-t border-[var(--line)] pt-2 mt-auto">
            <span className="text-[var(--accent)] mr-2 select-none">omega-shell$</span>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[var(--fg)] border-none font-mono cursor-none"
              placeholder="type commands..."
              autoFocus
            />
          </form>
        </div>
      )}
    </div>
  )
}
