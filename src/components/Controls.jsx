import { useApp } from '../context/AppContext'

export default function Controls() {
  const { lang, cycleLang, theme, toggleTheme } = useApp()
  return (
    <>
      <button type="button" id="lang-toggle" title="Switch language" onClick={cycleLang}>
        <span className="lang-dot" />
        <span id="lang-label">{lang.toUpperCase()}</span>
      </button>
      <button type="button" id="theme-toggle" title="Toggle theme" onClick={toggleTheme}>
        <span className="toggle-dot" />
        <span id="theme-label">{theme === 'mono' ? 'GREEN' : 'MONO'}</span>
      </button>
    </>
  )
}
