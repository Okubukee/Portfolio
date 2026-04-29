const ITEMS = [
  'git commit -m "ship it"',
  'go build -o terranova ./cmd/bot',
  'docker compose up --build',
  'spring boot:run --profile=prod',
  'xilo --encrypt vault.db --algo=AES-256-GCM',
  'flask run --host=0.0.0.0',
  'rm -rf /',
  'npm run build && git push origin main',
  'godot --export linux puzzle.tscn',
  'psql -U admin -d swapify -c "SELECT * FROM listings"',
  'argon2id --hash credentials.key',
  'react-scripts start --port=3000',
  'bash deploy.sh --env=production',
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
