import { useEffect } from 'react'

const CHARS = '01アイウエオカキクケコサシスセソタチツテト'

export function useMatrix(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let drops = []

    function init() {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      drops = Array.from({ length: Math.floor(canvas.width / 16) }, () => Math.random() * -100)
    }

    function draw() {
      ctx.fillStyle = 'rgba(10,26,12,0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#2ea043'
      ctx.font = '13px JetBrains Mono, monospace'
      drops.forEach((y, i) => {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]
        ctx.fillText(char, i * 16, y * 16)
        if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i] += 0.4
      })
    }

    init()
    const interval = setInterval(draw, 55)
    window.addEventListener('resize', init)
    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', init)
    }
  }, [])
}
