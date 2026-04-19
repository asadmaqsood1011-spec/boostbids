import ListingCard from './ListingCard'

export default function FeaturedSection({ listings, onBid, onChat }) {
  if (!listings.length) return null
  return (
    <section className="featured-section" id="featured">
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div className="section-header">
          <h2 className="section-title">⭐ <span>Featured</span> Listings</h2>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
            Sponsored — <a href="#monetize">Get featured →</a>
          </span>
        </div>
      </div>
      <div className="featured-grid">
        {listings.map(l => (
          <ListingCard key={l._id} listing={l} onBid={onBid} onChat={onChat} />
        ))}
      </div>
    </section>
  )
}
