import ListingCard from './ListingCard'
import GameFilter from './GameFilter'
import SearchBar from './SearchBar'

export default function Marketplace({
  listings,
  loading,
  selectedGame,
  setSelectedGame,
  searchQuery,
  setSearchQuery,
  onBid,
  onChat,
  onCreateListing,
}) {
  return (
    <section className="section" id="marketplace">
      <div className="section-header">
        <h2 className="section-title">🎮 <span>Marketplace</span></h2>
        <button className="btn-primary" onClick={onCreateListing}>+ Post Listing</button>
      </div>

      <div className="controls-row">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)', marginLeft: 'auto' }}>
          {listings.length} listing{listings.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div style={{ marginBottom: 24 }}>
        <GameFilter selected={selectedGame} onChange={setSelectedGame} />
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner" />
          <p>Loading listings…</p>
        </div>
      ) : listings.length === 0 ? (
        <div className="loading-state">
          <p style={{ fontSize: '2rem', marginBottom: 12 }}>🔍</p>
          <p>No listings found. Try a different filter or <button className="btn-ghost" onClick={onCreateListing}>post one</button>.</p>
        </div>
      ) : (
        <div className="listings-grid">
          {listings.map(l => (
            <ListingCard key={l._id} listing={l} onBid={onBid} onChat={onChat} />
          ))}
        </div>
      )}
    </section>
  )
}
