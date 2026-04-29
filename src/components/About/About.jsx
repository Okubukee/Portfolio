import { useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import { projects } from '../../data/projects'

function countUp(el) {
  const raw = el.dataset.target || el.textContent.trim()
  const num = parseInt(raw)
  if (isNaN(num)) return
  const suffix = raw.replace(/^\d+/, '')
  let cur = 0
  const step = Math.max(1, Math.ceil(num / 28))
  const timer = setInterval(() => {
    cur = Math.min(cur + step, num)
    el.textContent = cur + suffix
    if (cur >= num) clearInterval(timer)
  }, 40)
}

export default function About() {
  const { t } = useApp()

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        e.target.style.opacity = '1'
        if (!e.target.dataset.counted) {
          e.target.dataset.counted = '1'
          const numEl = e.target.querySelector('[data-target]')
          if (numEl) countUp(numEl)
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.stat-box').forEach(el => {
      el.style.opacity = '0'
      el.style.transition = 'opacity 0.5s ease'
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="section" id="about-section">
      <div className="section-header">{t['about-header']}</div>
      <h2 className="section-title">{t['about-title']}</h2>
      <div className="about-content">
        <p className="about-text">{t['about-text-1']}</p>
        <p className="about-text">{t['about-text-2']}</p>
        <div className="stats-row">
          <div className="stat-box"><div className="stat-num" data-target="2+">2+</div><div className="stat-label">{t['stat-years']}</div></div>
          <div className="stat-box"><div className="stat-num" data-target={`${projects.length}+`}>{projects.length}+</div><div className="stat-label">{t['stat-projects']}</div></div>
          <div className="stat-box"><div className="stat-num" data-target="3">3</div><div className="stat-label">{t['stat-domains']}</div></div>
          <div className="stat-box"><div className="stat-num">∞</div><div className="stat-label">{t['stat-curiosity']}</div></div>
        </div>
      </div>
    </div>
  )
}
