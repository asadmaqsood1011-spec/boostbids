const GAMES = [
  'All',
  'Call of Duty',
  'World of Warcraft',
  'Lost Ark',
  'Warframe',
  'Final Fantasy XIV',
  'Escape from Tarkov',
  'VALORANT',
  'Rocket League',
]

export default function GameFilter({ selected, onChange }) {
  return (
    <div className="game-filter">
      {GAMES.map(game => (
        <button
          key={game}
          className={`filter-btn ${selected === game ? 'active' : ''}`}
          onClick={() => onChange(game)}
        >
          {game}
        </button>
      ))}
    </div>
  )
}
