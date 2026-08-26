import { useEffect, useRef } from "react"

// Interactive Quantum Wave Grid for the Footer.
// Renders flowing perspective terrain with mouse interactivity and theme accent sync.
export default function FooterMeshCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    let w = 0, h = 0, dpr = 1
    let raf = 0
    let time = 0
    let inView = false
    let hidden = false

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        if (inView && !raf && !hidden) loop()
      },
      { threshold: 0.05 }
    )
    observer.observe(canvas)

    function onVisibility() {
      hidden = document.hidden
      if (!hidden && inView && !raf) loop()
    }
    document.addEventListener("visibilitychange", onVisibility)

    const mouse = { x: -9999, y: -9999, targetX: -9999, targetY: -9999 }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let accentRGB = [59, 130, 246]

    function updateAccent() {
      const computed = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()
      if (computed.startsWith('#')) {
        const hex = computed.replace('#', '')
        if (hex.length === 6) {
          accentRGB = [
            parseInt(hex.substring(0, 2), 16),
            parseInt(hex.substring(2, 4), 16),
            parseInt(hex.substring(4, 6), 16)
          ]
        }
      }
    }

    function resize() {
      w = canvas.clientWidth
      h = canvas.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const LINES = 14
    const POINTS = 36

    function render() {
      ctx.clearRect(0, 0, w, h)
      updateAccent()
      time += 0.015

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.1
      mouse.y += (mouse.targetY - mouse.y) * 0.1

      const [r, g, b] = accentRGB
      const baseAlpha = 0.12

      for (let i = 0; i < LINES; i++) {
        const lineProgress = i / (LINES - 1)
        const baseY = h * 0.25 + lineProgress * (h * 0.7)
        const alpha = baseAlpha * (0.3 + lineProgress * 0.7)

        ctx.beginPath()
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
        ctx.lineWidth = 0.75 + lineProgress * 0.8

        for (let j = 0; j <= POINTS; j++) {
          const x = (j / POINTS) * w
          
          // Wave equation combining 3 harmonics
          const wave1 = Math.sin(j * 0.25 + time * 1.5 + i * 0.4) * (14 + lineProgress * 18)
          const wave2 = Math.cos(j * 0.12 - time * 0.8 + i * 0.3) * (8 + lineProgress * 10)
          
          // Mouse interaction (repulsion & crest elevation)
          const distToMouse = Math.hypot(x - mouse.x, baseY - mouse.y)
          let mouseFactor = 0
          if (distToMouse < 220) {
            mouseFactor = (1 - distToMouse / 220) * 35
          }

          const y = baseY + wave1 + wave2 - mouseFactor

          if (j === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }

          // Draw small glowing nodes at intersections
          if (j % 4 === 0 && lineProgress > 0.3) {
            ctx.save()
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * (1.2 + (mouseFactor > 0 ? 2 : 0))})`
            ctx.beginPath()
            ctx.arc(x, y, 1.2 + (mouseFactor > 0 ? 1.5 : 0), 0, Math.PI * 2)
            ctx.fill()
            ctx.restore()
          }
        }
        ctx.stroke()
      }
    }

    function loop() {
      if (hidden || !inView) { raf = 0; return }
      if (reduce) return
      render()
      raf = requestAnimationFrame(loop)
    }

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect()
      mouse.targetX = e.clientX - rect.left
      mouse.targetY = e.clientY - rect.top
    }

    function onMouseLeave() {
      mouse.targetX = -9999
      mouse.targetY = -9999
    }

    resize()
    if (!reduce) loop()
    else render()

    window.addEventListener("resize", resize)
    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mouseleave", onMouseLeave)

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener("resize", resize)
      if (canvas) {
        canvas.removeEventListener("mousemove", onMouseMove)
        canvas.removeEventListener("mouseleave", onMouseLeave)
      }
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto opacity-70 transition-opacity duration-500 hover:opacity-100"
      style={{
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 100%)"
      }}
      aria-hidden="true"
    />
  )
}
