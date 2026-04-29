import { useEffect } from 'react'
import { useApp } from '../../context/AppContext'

const SKILLS = [
  { titleKey: 'skill-languages', items: [
    { name: 'Java', expert: true }, { name: 'Go', expert: true }, { name: 'JavaScript', expert: true },
    { name: 'Kotlin' }, { name: 'Python' }, { name: 'C#' },
  ]},
  { title: 'Frontend',     items: [{ name: 'React', expert: true }, { name: 'Tailwind CSS' }, { name: 'CSS3' }] },
  { title: 'Backend',      items: [{ name: 'Spring Boot' }, { name: 'Flask' }, { name: 'Hibernate' }, { name: 'REST API', expert: true }] },
  { titleKey: 'skill-databases', items: [{ name: 'PostgreSQL' }, { name: 'MongoDB' }, { name: 'SQLite' }, { name: 'Firebase' }] },
  { title: 'DevOps',       items: [{ name: 'Git', expert: true }, { name: 'GitHub' }, { name: 'Docker' }, { name: 'CI/CD' }, { name: 'Linux' }, { name: 'Bash' }, { name: 'NixOS' }, { name: 'Windows' }] },
  { titleKey: 'skill-gamedev',  items: [{ name: 'Unity' }, { name: 'C#' }, { name: 'Lua' }, { name: 'Godot' }] },
  { title: 'AI & ML',      items: [{ name: 'LLMs' }] },
]

export default function Skills() {
  const { t } = useApp()

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.style.opacity = '1' })
    }, { threshold: 0.1 })

    document.querySelectorAll('.skill-category').forEach(el => {
      el.style.opacity = '0'
      el.style.transition = 'opacity 0.5s ease'
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="section">
      <div className="section-header">{t['skills-header']}</div>
      <h2 className="section-title">{t['skills-title']}</h2>
      <div className="skills-grid">
        {SKILLS.map((cat, i) => (
          <div className="skill-category" key={i}>
            <div className="skill-title">{cat.titleKey ? t[cat.titleKey] : cat.title}</div>
            <div className="skill-items">
              {cat.items.map(item => (
                <span key={item.name} className={`skill-item${item.expert ? ' expert' : ''}`}>{item.name}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
