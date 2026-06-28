import { useEffect, useRef } from "react"

// Custom amber cursor: a precise dot + a lagging ring that swells over links.
export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
    let rx = window.innerWidth / 2, ry = window.innerHeight / 2
    let mx = rx, my = ry
    let raf = 0

    function move(e) {
      mx = e.clientX; my = e.clientY
      if (dot.current) dot.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`
      const t = e.target.closest("a, button, [data-cursor]")
      if (ring.current) ring.current.classList.toggle("hovering", !!t)
    }
    function loop() {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener("mousemove", move)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener("mousemove", move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
