import { useState, useEffect } from "react"

// Simple lexicon-based sentiment analysis engine for browser speed & 0 deps
const LEXICON = {
  // Positive words
  love: 4, amazing: 4, fantastic: 4, excellent: 4, great: 3, good: 2, happy: 3, 
  best: 3, smart: 2, clean: 2, cool: 3, awesome: 4, beautiful: 3, perfect: 4,
  nice: 2, friendly: 2, expert: 3, advanced: 2, success: 3, dynamic: 2, premium: 3,
  fun: 2, glad: 2, positive: 2, strong: 2, champion: 3, win: 3, genius: 4,
  // Negative words
  hate: -4, bad: -2, terrible: -4, awful: -4, worst: -4, sad: -2, angry: -3,
  broken: -2, fail: -3, failure: -3, useless: -3, poor: -2, weak: -2, slow: -2,
  silly: -1, dump: -2, stupid: -3, negative: -2, mistake: -2, error: -1, bug: -2,
  toxic: -3, ugly: -3, complex: -1, hard: -1, difficult: -1, pain: -2
}

export default function SentimentAnalyzer() {
  const [text, setText] = useState("")
  const [score, setScore] = useState(0) // -1 to 1
  const [sentiment, setSentiment] = useState("Neutral") // Positive, Negative, Neutral

  useEffect(() => {
    if (!text.trim()) {
      setScore(0)
      setSentiment("Neutral")
      return
    }

    const words = text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(/\s+/)
    let totalScore = 0
    let matchCount = 0

    for (const word of words) {
      if (LEXICON[word] !== undefined) {
        totalScore += LEXICON[word]
        matchCount++
      }
    }

    // Normalize score to -1 to 1
    const finalScore = matchCount > 0 ? Math.max(-1, Math.min(1, totalScore / (matchCount * 4))) : 0
    setScore(finalScore)

    if (finalScore > 0.15) {
      setSentiment("Positive")
    } else if (finalScore < -0.15) {
      setSentiment("Negative")
    } else {
      setSentiment("Neutral")
    }
  }, [text])

  // Get color/emoji based on sentiment
  const getTheme = () => {
    if (sentiment === "Positive") return { color: "#10b981", emoji: "😄", bg: "rgba(16, 185, 129, 0.1)" }
    if (sentiment === "Negative") return { color: "#ef4444", emoji: "😢", bg: "rgba(239, 68, 68, 0.1)" }
    return { color: "#3b82f6", emoji: "😐", bg: "rgba(59, 130, 246, 0.1)" }
  };

  const theme = getTheme()

  return (
    <div className="border border-[var(--line)] rounded-xl p-6 bg-[var(--bg2)]/40 backdrop-blur-md relative overflow-hidden transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
          In-Browser NLP Model Demo
        </h4>
        <span className="font-mono text-[10px] text-[var(--muted)] border border-[var(--line)] rounded-full px-2 py-0.5">
          Lexicon Engine
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Left Column: Input */}
        <div>
          <h3 className="display text-xl text-[var(--fg)] mb-2">Real-time Sentiment Predictor</h3>
          <p className="text-sm text-[var(--muted)] mb-4">
            Type something positive or negative to see the local Lexicon analyzer adjust the sentiment scores dynamically.
          </p>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type here (e.g., 'This is a great and fantastic AI system!')"
            rows="4"
            className="w-full bg-[var(--bg)]/90 border border-[var(--line)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] rounded-lg p-3 text-sm text-[var(--fg)] outline-none transition-all placeholder:text-[var(--muted)]/50 resize-none cursor-none"
          />
        </div>

        {/* Right Column: Visualization & Results */}
        <div className="flex flex-col h-full justify-center bg-[var(--bg)]/40 border border-[var(--line)] rounded-xl p-6">
          <h4 className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted)] mb-4">
            Analysis Results
          </h4>
          
          <div className="flex items-center gap-4 mb-6">
            <div 
              className="h-14 w-14 rounded-2xl flex items-center justify-center text-3xl transition-all duration-300"
              style={{ background: theme.bg, color: theme.color, border: `1px solid ${theme.color}33`, boxShadow: `0 0 15px ${theme.color}22` }}
            >
              {theme.emoji}
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted)]">Classification</div>
              <div className="font-bold text-lg transition-colors duration-300" style={{ color: theme.color }}>
                {sentiment} ({(score * 100).toFixed(0)}%)
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[10px] text-[var(--muted)]">
              <span>Negative (-100%)</span>
              <span>Neutral (0%)</span>
              <span>Positive (+100%)</span>
            </div>
            
            {/* Gauge bar */}
            <div className="relative h-3 w-full bg-[var(--bg)] border border-[var(--line)] rounded-full overflow-hidden">
              {/* Neutral center mark */}
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[var(--line)]" />
              
              {/* Score fill */}
              <div 
                className="absolute top-0 bottom-0 transition-all duration-300 rounded-full"
                style={{
                  left: score >= 0 ? "50%" : `calc(50% - ${Math.abs(score) * 50}%)`,
                  width: `${Math.abs(score) * 50}%`,
                  background: theme.color,
                  boxShadow: `0 0 10px ${theme.color}`
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
