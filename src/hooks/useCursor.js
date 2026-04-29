import { useEffect } from 'react'
import { addDraw } from '../utils/rafManager'

const TRAIL = 14

export function useCursor(canvasRef, dotRef) {
  useEffect(() => {
    const canvas = canvasRef.current
    const dot    = dotRef.current
    if (!canvas || !dot) return
    const ctx = canvas.getContext('2d')

    function resize() {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const trail = Array.from({ length: TRAIL }, () => ({ x: -500, y: -500 }))
    let mx = -500, my = -500

    function onMove(e)  { mx = e.clientX; my = e.clientY }
    function onOver(e)  {
      const hot = e.target.closest('a, button, .filter-btn, .social-btn, .contact-btn, .form-submit, input, textarea')
      document.body.classList.toggle('cursor-hover', !!hot)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)

    const cleanup = addDraw(function () {
      trail.unshift({ x: mx, y: my })
      trail.pop()
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      trail.forEach((pt, i) => {
        const alpha  = (1 - i / TRAIL) * 0.55
        const radius = 2.8 * (1 - i / TRAIL) + 0.4
        ctx.beginPath()
        ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(72,201,104,${alpha})`
        ctx.fill()
      })
      dot.style.left = mx + 'px'
      dot.style.top  = my + 'px'
    })

    return () => {
      cleanup()
      window.removeEventListener('resize', resize)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
    }
  }, [])
}
