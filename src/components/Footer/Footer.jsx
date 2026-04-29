import { useApp } from '../../context/AppContext'
import { useState, useEffect, useRef } from 'react'

const BAR_LEN = 22

export default function Footer() {
  const { t } = useApp()
  const [progress, setProgress] = useState(0)
  const [done,     setDone]     = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      let p = 0
      const id = setInterval(() => {
        p += 1
        setProgress(p)
        if (p >= 100) { clearInterval(id); setDone(true) }
      }, 18)
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const filled = Math.round((progress / 100) * BAR_LEN)
  const bar    = '█'.repeat(filled) + '░'.repeat(BAR_LEN - filled)

  return (
    <footer>
      <pre ref={ref} className="footer-tree">{
`  ┌──────────────────────────────────┐
  │  >_ okubuke@dev ~ portfolio      │
  │                                  │
  │  [${bar}] ${String(progress).padStart(3)}%   │
  │                                  │
  │  status:  ${done ? 'all systems online  ✓' : 'loading...           '}  │
  └──────────────────────────────────┘`
      }</pre>
      <div className="footer-line">{t['footer-line']}</div>
      <div><span>{t['footer-echo']}</span> <span className="footer-cursor">█</span></div>
    </footer>
  )
}
