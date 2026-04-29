const ITEMS = [
  'git commit -m "always building"',
  'npm run passion --level=∞',
  'python3 train.py --creativity=max',
  'unity3d --scene=PixelAdventure',
  'docker push okubuke/portfolio:latest',
  'figma --export=ui_masterpiece',
  './ship_it.sh --quality=pixel-perfect',
  'godot --build=puzzle_game',
  'curl -X POST okubuke.dev/ideas',
]

function TickerContent() {
  return (
    <span className="ticker-content">
      {ITEMS.map((item, i) => (
        <span key={i}>
          <span className="tick-cmd">&gt;</span> {item}
          <span className="tick-sep">|</span>
        </span>
      ))}
    </span>
  )
}

export default function Ticker() {
  return (
    <div className="ticker-strip" aria-hidden="true">
      <div className="ticker-track">
        <TickerContent />
        <TickerContent />
      </div>
    </div>
  )
}
