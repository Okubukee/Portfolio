import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { projects } from '../../data/projects'
import ProjectCard from './ProjectCard'

const FILTERS = [
  { key: 'all',    labelKey: 'filter-all' },
  { key: 'web',    labelKey: 'filter-web' },
  { key: 'game',   labelKey: 'filter-game' },
  { key: 'ai',     labelKey: 'filter-ai' },
  { key: 'app',    labelKey: 'filter-app' },
]

export default function Projects() {
  const { t } = useApp()
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter)
  const sorted   = [...filtered.filter(p => p.featured), ...filtered.filter(p => !p.featured)]

  return (
    <div className="section">
      <div className="section-header">{t['projects-header']}</div>
      <h2 className="section-title">{t['projects-title']}</h2>
      <div className="project-filters">
        {FILTERS.map(f => (
          <button
            key={f.key}
            type="button"
            className={`filter-btn${filter === f.key ? ' active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {t[f.labelKey]}
          </button>
        ))}
      </div>
      <div className="projects-grid">
        {sorted.map(p => <ProjectCard key={p.titleKey} project={p} />)}
      </div>
    </div>
  )
}
