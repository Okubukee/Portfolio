import { AppProvider } from './context/AppContext'
import CursorTrail     from './components/CursorTrail'
import MatrixCanvas    from './components/MatrixCanvas'
import ParticlesCanvas from './components/ParticlesCanvas'
import Controls        from './components/Controls'
import Header          from './components/Header/Header'
import Ticker          from './components/Ticker/Ticker'
import About           from './components/About/About'
import Skills          from './components/Skills/Skills'
import Projects        from './components/Projects/Projects'
import Terminal        from './components/Terminal/Terminal'
import Contact         from './components/Contact/Contact'
import Footer          from './components/Footer/Footer'

function Portfolio() {
  return (
    <>
      <CursorTrail />
      <MatrixCanvas />
      <ParticlesCanvas />
      <Controls />

      <div className="container">
        <Header />
      </div>

      <Ticker />

      <div className="container">
        <About />
        <Skills />
        <Projects />
        <Terminal />
        <Contact />
      </div>

      <Footer />
    </>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Portfolio />
    </AppProvider>
  )
}
