import { useState, useRef, useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import { projects } from '../../data/projects'

const G  = 'color:var(--green)'
const GB = 'color:var(--green-bright)'
const DM = 'color:rgba(46,160,67,0.45)'

const GITHUB = 'https://github.com/Okubukee'
const EMAIL  = 'cardenasdcg@gmail.com'

function buildCmds(t) {
  return {
    help: () => [
      `<span style="${GB}">${t['term-help-title']}</span>`,
      `  <span style="${G}">whoami</span>       ${t['term-help-whoami']}`,
      `  <span style="${G}">ls</span>           ${t['term-help-ls']}`,
      `  <span style="${G}">skills</span>       ${t['term-help-skills']}`,
      `  <span style="${G}">contact</span>      ${t['term-help-contact']}`,
      `  <span style="${G}">status</span>       ${t['term-help-status']}`,
      `  <span style="${G}">open github</span>  ${t['term-help-github']}`,
      `  <span style="${G}">clear</span>        ${t['term-help-clear']}`,
    ].join('\n'),

    whoami: () => [
      `<span style="${GB}">Daniel Cardenas</span> <span style="${DM}">aka</span> <span style="${GB}">okubuke</span>`,
      `  ${t['subtitle']}`,
      `  2+ ${t['stat-years']}  |  ${projects.length}+ ${t['stat-projects']}`,
      `  <span style="${DM}">github</span>  ${GITHUB}`,
      `  <span style="${DM}">mail</span>   ${EMAIL}`,
    ].join('\n'),

    ls: () => {
      const lines = projects.map(p =>
        `  ${p.featured ? `<span style="${GB}">★</span>` : ' '} <span style="${G}">${(t[p.titleKey] ?? p.titleKey).padEnd(20)}</span><span style="${DM}">[${p.category}]</span>`
      )
      return [`<span style="${DM}">total ${projects.length}</span>`, ...lines].join('\n')
    },

    skills: () => [
      `<span style="${GB}">${t['term-skills-title']}</span>`,
      `  <span style="${G}">${t['term-skill-languages']}</span> → Java★, Go★, JavaScript★, Kotlin, Python, C#`,
      `  <span style="${G}">${t['term-skill-frontend']}</span> → React★, Tailwind CSS, CSS3`,
      `  <span style="${G}">${t['term-skill-backend']}</span> → Spring Boot, Flask, Hibernate, REST API★`,
      `  <span style="${G}">${t['term-skill-databases']}</span> → PostgreSQL, MongoDB, SQLite, Firebase`,
      `  <span style="${G}">${t['term-skill-devops']}</span> → Git★, GitHub, Docker, CI/CD, Linux, Bash, NixOS`,
      `  <span style="${G}">${t['term-skill-gamedev']}</span> → Unity, C#, Lua, Godot`,
      `  <span style="${G}">${t['term-skill-ai']}</span> → LLMs`,
    ].join('\n'),

    contact: () => [
      `<span style="${GB}">${t['term-contact-title']}</span>`,
      `  <span style="${DM}">email</span>  → <span style="${G}">${EMAIL}</span>`,
      `  <span style="${DM}">gh   </span>  → <span style="${G}">${GITHUB}</span>`,
    ].join('\n'),

    status: () => [
      `<span style="${GB}">${t['term-status-badge']}</span>`,
      `  ${t['term-status-avail']}`,
      `  ${t['term-status-focus']}`,
    ].join('\n'),

    'open github': () => {
      window.open(GITHUB, '_blank', 'noopener')
      return `<span style="${DM}">${t['term-github-opening']}</span> ↗`
    },

    clear: () => '__CLEAR__',
  }
}

export default function Terminal() {
  const { t } = useApp()
  const CMDS = buildCmds(t)
  const [lines, setLines]   = useState([{ type: 'dim', html: t['term-welcome'] }])
  const [input, setInput]   = useState('')
  const [history, setHistory] = useState([])
  const [histIdx, setHistIdx] = useState(-1)
  const outputRef = useRef(null)
  const inputRef  = useRef(null)

  useEffect(() => {
    setLines([{ type: 'dim', html: t['term-welcome'] }])
  }, [t])

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight
  }, [lines])

  function addLine(html, type = 'out') {
    setLines(prev => [...prev, { type, html }])
  }

  function run(raw) {
    const cmd = raw.trim().toLowerCase()
    addLine(`<span style="${G}">okubuke@dev:~$</span> ${raw}`, 'cmd')
    if (!cmd) return
    setHistory(prev => [raw, ...prev])
    setHistIdx(-1)

    if (Object.prototype.hasOwnProperty.call(CMDS, cmd)) {
      const out = CMDS[cmd]()
      if (out === '__CLEAR__') { setLines([]); return }
      addLine(out)
    } else {
      addLine(`bash: <span style="color:rgba(255,100,80,0.8)">${cmd}</span>: ${t['term-not-found']}`, 'err')
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      run(input); setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (histIdx < history.length - 1) { const n = histIdx + 1; setHistIdx(n); setInput(history[n]) }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (histIdx > 0) { const n = histIdx - 1; setHistIdx(n); setInput(history[n]) }
      else { setHistIdx(-1); setInput('') }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const match = Object.keys(CMDS).find(k => k.startsWith(input.trim().toLowerCase()))
      if (match) setInput(match)
    }
  }

  return (
    <div className="section">
      <div className="section-header">{t['terminal-header']}</div>
      <h2 className="section-title">{t['terminal-title']}</h2>
      <div className="terminal-window" onClick={() => inputRef.current?.focus()}>
        <div className="terminal-topbar">
          <span className="tdot r" /><span className="tdot y" /><span className="tdot g" />
          <span className="terminal-title-bar">okubuke@dev ~ bash</span>
        </div>
        <div className="terminal-body" ref={outputRef}>
          {lines.map((line, i) => (
            <div key={i} className={`tline ${line.type}`} dangerouslySetInnerHTML={{ __html: line.html }} />
          ))}
        </div>
        <div className="terminal-input-row">
          <span className="term-prompt">okubuke@dev:~$&nbsp;</span>
          <input
            ref={inputRef}
            id="termInput"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck={false}
            placeholder="type a command..."
            aria-label="terminal input"
          />
        </div>
      </div>
    </div>
  )
}
