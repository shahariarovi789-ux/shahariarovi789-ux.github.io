import { useEffect, useRef } from "react"

// Interactive neuron constellation. Nodes drift slowly; the cursor attracts and
// lights up nearby nodes, drawing live "synapse" connections. Pure canvas, no deps.
export default function NeuralField() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext("2d")
    let w = 0, h = 0, dpr = 1
    let nodes = []
    let raf = 0
    const mouse = { x: -9999, y: -9999, vx: 0, vy: 0, px: 0, py: 0 }
    const LINK = 130          // connection distance between nodes
    const MOUSE_R = 190       // cursor influence radius
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const accent = [59, 130, 246]   // electric blue
    const warm = [205, 216, 233]    // cool off-white

    function build() {
      w = canvas.clientWidth
      h = canvas.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const density = w < 640 ? 20000 : 13000
      const count = Math.min(165, Math.floor((w * h) / density))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.5 + 0.7,
        glow: 0,
      }))
    }

    function step() {
      ctx.clearRect(0, 0, w, h)

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1

        // cursor attraction + glow
        const dx = mouse.x - n.x
        const dy = mouse.y - n.y
        const d = Math.hypot(dx, dy)
        if (d < MOUSE_R) {
          const f = (1 - d / MOUSE_R) * 0.6
          n.x += (dx / (d || 1)) * f
          n.y += (dy / (d || 1)) * f
          n.glow = Math.min(1, n.glow + 0.08)
          // synapse from cursor to node
          ctx.strokeStyle = `rgba(${accent[0]},${accent[1]},${accent[2]},${(1 - d / MOUSE_R) * 0.7})`
          ctx.lineWidth = 0.8
          ctx.beginPath()
          ctx.moveTo(mouse.x, mouse.y)
          ctx.lineTo(n.x, n.y)
          ctx.stroke()
        } else {
          n.glow *= 0.92
        }
      }

      // node-to-node links
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
            const c = lit > 0.05 ? accent : warm
            ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${t * (0.16 + lit * 0.55)})`
            ctx.lineWidth = 0.6 + lit * 0.7
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // nodes
      for (const n of nodes) {
        const c = n.glow > 0.05
          ? [
              warm[0] + (accent[0] - warm[0]) * n.glow,
              warm[1] + (accent[1] - warm[1]) * n.glow,
              warm[2] + (accent[2] - warm[2]) * n.glow,
            ]
          : warm
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r + n.glow * 1.6, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${c[0]|0},${c[1]|0},${c[2]|0},${0.5 + n.glow * 0.5})`
        ctx.fill()
        if (n.glow > 0.15) {
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r + 8 * n.glow, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${accent[0]},${accent[1]},${accent[2]},${n.glow * 0.16})`
          ctx.fill()
        }
      }

      raf = requestAnimationFrame(step)
    }

    function onMove(e) {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    function onLeave() {
      mouse.x = -9999
      mouse.y = -9999
    }

    build()
    if (!reduce) raf = requestAnimationFrame(step)
    else step() // draw a single static frame
    window.addEventListener("resize", build)
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseout", onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", build)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseout", onLeave)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 -z-10 h-full w-full"
      style={{ background: "radial-gradient(120% 120% at 50% 0%, #0a1426 0%, #000000 60%)" }}
      aria-hidden="true"
    />
  )
}
