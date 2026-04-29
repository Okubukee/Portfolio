import { createContext, useContext, useState } from 'react'
import { translations, langs } from '../data/i18n'

const AppContext = createContext(null)

function detectLang() {
  const detected = ((navigator.language || 'es').split('-')[0]).toLowerCase()
  return langs.includes(detected) ? detected : 'es'
}

export function AppProvider({ children }) {
  const [lang,  setLangState] = useState(detectLang)
  const [theme, setTheme]     = useState('green')

  function setLanguage(l) {
    setLangState(l)
    document.documentElement.lang = l
  }

  function cycleLang() {
    setLanguage(langs[(langs.indexOf(lang) + 1) % langs.length])
  }

  function toggleTheme() {
    setTheme(prev => {
      const next = prev === 'green' ? 'mono' : 'green'
      if (next === 'mono') document.documentElement.setAttribute('data-theme', 'mono')
      else                 document.documentElement.removeAttribute('data-theme')
      return next
    })
  }

  return (
    <AppContext.Provider value={{ lang, t: translations[lang], cycleLang, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
