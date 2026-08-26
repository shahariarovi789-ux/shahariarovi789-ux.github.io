import { useEffect, useRef } from "react"

// Optimized Interactive Neuron Constellation.
// Ultra-smooth 60/120fps with zero layout thrash and mobile-adaptive density.
export default function NeuralField() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    let w = 0, h = 0, dpr = 1
    let nodes = []
    let shockwaves = []
    let raf = 0
    let hidden = false
    let inView = true
    let frameCount = 0

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        inView = entry.isIntersecting
        if (inView && !raf && !hidden) loop()
      })
    }, { threshold: 0 })
    observer.observe(canvas)

    function onVisibility() {
      hidden = document.hidden
      if (!hidden && inView && !raf) loop()
    }
    document.addEventListener("visibilitychange", onVisibility)

    const mouse = { x: -9999, y: -9999 }
    const LINK = 130
    const LINK_SQ = LINK * LINK
    const MOUSE_R = 190
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let currentAccent = [59, 130, 246]
    const warm = [215, 225, 240]

    function parseAccent() {
      const computed = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()
      if (computed.startsWith('#') && computed.length === 7) {
        currentAccent = [
          parseInt(computed.slice(1, 3), 16),
          parseInt(computed.slice(3, 5), 16),
          parseInt(computed.slice(5, 7), 16)
        ]
      }
    }

    function build() {
      w = canvas.clientWidth
      h = canvas.clientHeight
      const mobile = w < 768
      dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.75)
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      
      parseAccent()
      const count = mobile ? 26 : Math.min(80, Math.floor((w * h) / 16000))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * (mobile ? 0.14 : 0.22),
        vy: (Math.random() - 0.5) * (mobile ? 0.14 : 0.22),
        r: Math.random() * 1.3 + 0.7,
        glow: 0,
      }))
    }

    function step() {
      ctx.clearRect(0, 0, w, h)
      
      // Only refresh accent color every 45 frames to eliminate style recalcs
      frameCount++
      if (frameCount % 45 === 0) parseAccent()

      const [r, g, b] = currentAccent

      // Render shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s]
        sw.r += sw.speed
        sw.opacity *= 0.94

        if (sw.opacity < 0.02 || sw.r > sw.maxR) {
          shockwaves.splice(s, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${sw.opacity * 0.5})`
        ctx.lineWidth = 1.8 * sw.opacity
        ctx.stroke()

        for (const n of nodes) {
          const d = Math.hypot(n.x - sw.x, n.y - sw.y)
          if (Math.abs(d - sw.r) < 30) {
            n.glow = Math.min(1.4, n.glow + 0.3)
            const angle = Math.atan2(n.y - sw.y, n.x - sw.x)
            n.vx += Math.cos(angle) * 0.25
            n.vy += Math.sin(angle) * 0.25
          }
        }
      }

      // Update positions & cursor interaction
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        n.vx *= 0.99
        n.vy *= 0.99

        if (n.x < 0) { n.x = 0; n.vx *= -1 }
        if (n.x > w) { n.x = w; n.vx *= -1 }
        if (n.y < 0) { n.y = 0; n.vy *= -1 }
        if (n.y > h) { n.y = h; n.vy *= -1 }

        const dx = mouse.x - n.x
        const dy = mouse.y - n.y
        const d = Math.hypot(dx, dy)
        if (d < MOUSE_R) {
          const f = (1 - d / MOUSE_R) * 0.65
          n.x += (dx / (d || 1)) * f
          n.y += (dy / (d || 1)) * f
          n.glow = Math.min(1, n.glow + 0.08)
          
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${(1 - d / MOUSE_R) * 0.7})`
          ctx.lineWidth = 0.85
          ctx.beginPath()
          ctx.moveTo(mouse.x, mouse.y)
          ctx.lineTo(n.x, n.y)
          ctx.stroke()
        } else {
          n.glow *= 0.94
        }
      }

      // Node connections
      const nLen = nodes.length
      for (let i = 0; i < nLen; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nLen; j++) {
          const bn = nodes[j]
          const dx = a.x - bn.x
          const dy = a.y - bn.y
          const d2 = dx * dx + dy * dy
          if (d2 < LINK_SQ) {
            const t = 1 - Math.sqrt(d2) / LINK
            const lit = Math.max(a.glow, bn.glow)
            const c = lit > 0.05 ? currentAccent : warm
            ctx.strokeStyle = `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${t * (0.16 + lit * 0.55)})`
            ctx.lineWidth = 0.55 + lit * 0.7
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(bn.x, bn.y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const glowVal = Math.min(1, n.glow)
        const c = glowVal > 0.05
          ? [
              warm[0] + (r - warm[0]) * glowVal,
              warm[1] + (g - warm[1]) * glowVal,
              warm[2] + (b - warm[2]) * glowVal,
            ]
          : warm
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r + glowVal * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${c[0]|0}, ${c[1]|0}, ${c[2]|0}, ${0.55 + glowVal * 0.45})`
        ctx.fill()
        
        if (glowVal > 0.15) {
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r + 7 * glowVal, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${glowVal * 0.18})`
          ctx.fill()
        }
      }

      raf = requestAnimationFrame(loop)
    }

    function loop() {
      if (hidden || !inView) { raf = 0; return }
      if (reduce) return
      step()
    }

    function onMove(e) {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    function onLeave() {
      mouse.x = -9999
      mouse.y = -9999
    }
    function onClick(e) {
      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        r: 5,
        maxR: 240,
        speed: 7,
        opacity: 0.85
      })
    }

    build()
    if (!reduce) loop()
    else step()

    window.addEventListener("resize", build)
    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("mouseout", onLeave)
    window.addEventListener("click", onClick)
    
    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener("resize", build)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseout", onLeave)
      window.removeEventListener("click", onClick)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 -z-10 h-full w-full pointer-events-none"
      style={{ background: "radial-gradient(120% 120% at 50% 0%, #08101e 0%, #000000 65%)" }}
      aria-hidden="true"
    />
  )
}
