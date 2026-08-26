import { useEffect, useRef } from "react"

// Interactive neuron constellation. Nodes drift slowly; the cursor attracts and
// lights up nearby nodes, drawing live "synapse" connections.
// Features theme-aware dynamic color syncing and click shockwave impulses.
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

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        inView = entry.isIntersecting
        if (inView && !raf && !hidden) loop()
      })
    }, { threshold: 0 })
    observer.observe(canvas)

    // pause animation when tab is hidden
    function onVisibility() {
      hidden = document.hidden
      if (!hidden && inView && !raf) loop()
    }
    document.addEventListener("visibilitychange", onVisibility)

    const mouse = { x: -9999, y: -9999 }
    const LINK = 135          // connection distance between nodes
    const MOUSE_R = 200       // cursor influence radius
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // Dynamic accent color parser
    let currentAccent = [59, 130, 246]
    const warm = [215, 225, 240]

    function updateAccentFromCSS() {
      const computed = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()
      if (computed.startsWith('#')) {
        const hex = computed.replace('#', '')
        if (hex.length === 6) {
          currentAccent = [
            parseInt(hex.substring(0, 2), 16),
            parseInt(hex.substring(2, 4), 16),
            parseInt(hex.substring(4, 6), 16)
          ]
        }
      }
    }

    function build() {
      w = canvas.clientWidth
      h = canvas.clientHeight
      const mobile = w < 768
      dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      
      const density = mobile ? 32000 : 12000
      const count = Math.min(mobile ? 45 : 170, Math.floor((w * h) / density))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.5 + 0.8,
        glow: 0,
      }))
    }

    function step() {
      ctx.clearRect(0, 0, w, h)
      updateAccentFromCSS()

      // Update and render shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s]
        sw.r += sw.speed
        sw.opacity *= 0.94

        if (sw.opacity < 0.02 || sw.r > sw.maxR) {
          shockwaves.splice(s, 1)
          continue
        }

        ctx.save()
        ctx.beginPath()
        ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${currentAccent[0]}, ${currentAccent[1]}, ${currentAccent[2]}, ${sw.opacity * 0.6})`
        ctx.lineWidth = 2 * sw.opacity
        ctx.stroke()
        ctx.restore()

        // Push nearby nodes and light them up
        for (const n of nodes) {
          const d = Math.hypot(n.x - sw.x, n.y - sw.y)
          if (Math.abs(d - sw.r) < 35) {
            n.glow = Math.min(1.5, n.glow + 0.35)
            const angle = Math.atan2(n.y - sw.y, n.x - sw.x)
            n.vx += Math.cos(angle) * 0.3
            n.vy += Math.sin(angle) * 0.3
          }
        }
      }

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        n.vx *= 0.99
        n.vy *= 0.99
        if (Math.abs(n.vx) < 0.1) n.vx += (Math.random() - 0.5) * 0.05
        if (Math.abs(n.vy) < 0.1) n.vy += (Math.random() - 0.5) * 0.05

        if (n.x < 0) { n.x = 0; n.vx *= -1 }
        if (n.x > w) { n.x = w; n.vx *= -1 }
        if (n.y < 0) { n.y = 0; n.vy *= -1 }
        if (n.y > h) { n.y = h; n.vy *= -1 }

        // Cursor attraction + glow
        const dx = mouse.x - n.x
        const dy = mouse.y - n.y
        const d = Math.hypot(dx, dy)
        if (d < MOUSE_R) {
          const f = (1 - d / MOUSE_R) * 0.7
          n.x += (dx / (d || 1)) * f
          n.y += (dy / (d || 1)) * f
          n.glow = Math.min(1, n.glow + 0.1)
          
          // Synapse from cursor to node
          ctx.strokeStyle = `rgba(${currentAccent[0]},${currentAccent[1]},${currentAccent[2]},${(1 - d / MOUSE_R) * 0.75})`
          ctx.lineWidth = 0.9
          ctx.beginPath()
          ctx.moveTo(mouse.x, mouse.y)
          ctx.lineTo(n.x, n.y)
          ctx.stroke()
        } else {
          n.glow *= 0.93
        }
      }

      // Node-to-node links
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < LINK * LINK) {
            const t = 1 - Math.sqrt(d2) / LINK
            const lit = Math.max(a.glow, b.glow)
            const c = lit > 0.05 ? currentAccent : warm
            ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${t * (0.18 + lit * 0.6)})`
            ctx.lineWidth = 0.6 + lit * 0.8
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // Render nodes
      for (const n of nodes) {
        const glowVal = Math.min(1, n.glow)
        const c = glowVal > 0.05
          ? [
              warm[0] + (currentAccent[0] - warm[0]) * glowVal,
              warm[1] + (currentAccent[1] - warm[1]) * glowVal,
              warm[2] + (currentAccent[2] - warm[2]) * glowVal,
            ]
          : warm
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r + glowVal * 1.8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${c[0]|0},${c[1]|0},${c[2]|0},${0.6 + glowVal * 0.4})`
        ctx.fill()
        
        if (glowVal > 0.12) {
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r + 9 * glowVal, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${currentAccent[0]},${currentAccent[1]},${currentAccent[2]},${glowVal * 0.22})`
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
        maxR: 280,
        speed: 8,
        opacity: 0.9
      })
    }

    build()
    if (!reduce) loop()
    else step()

    window.addEventListener("resize", build)
    window.addEventListener("mousemove", onMove)
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
      className="fixed inset-0 -z-10 h-full w-full"
      style={{ background: "radial-gradient(120% 120% at 50% 0%, #08101e 0%, #000000 65%)" }}
      aria-hidden="true"
    />
  )
}
