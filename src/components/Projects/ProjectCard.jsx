import { useRef, useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import { makeWebPreview, makeDefaultPreview } from '../../canvas/previews'
import { projectAnimators } from '../../utils/rafManager'

export default function ProjectCard({ project }) {
  const { t } = useApp()
  const canvasRef = useRef(null)
  const cw = project.featured ? 500 : 300
  const ch = project.featured ? 150 : 130

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const fn  = project.category === 'web'
      ? makeWebPreview(ctx, cw, ch)
      : makeDefaultPreview(ctx, cw, ch)
    projectAnimators.set(canvas, fn)
    return () => projectAnimators.delete(canvas)
  }, [project.category, cw, ch])

  return (
    <div className={`project-card${project.featured ? ' featured' : ''}`}>
      {project.featured && <div className="project-badge">{t['proj-featured']}</div>}
      <div className="project-canvas-wrap">
        <canvas ref={canvasRef} className="proj-canvas" data-category={project.category} width={cw} height={ch} />
      </div>
      <div className="project-icon">{project.icon}</div>
      <h3 className="project-title">{t[project.titleKey]}</h3>
      {project.status && (
        <span className={`project-status project-status--${project.status}`}>
          {t[`proj-status-${project.status}`]}
        </span>
      )}
      <p className="project-description">{t[project.descKey]}</p>
      <div className="project-tech">
        {project.tech.map(tag => <span key={tag} className="tech-tag">{tag}</span>)}
      </div>
      {project.github && <a className="project-github" href={project.github} target="_blank" rel="noopener noreferrer">⌥ github</a>}
    </div>
  )
}
