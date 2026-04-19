function Stars({ rating }) {
  if (!rating) return <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>No reviews</span>
  const full = Math.round(rating)
  return (
    <span className="rating">
      {'★'.repeat(full)}{'☆'.repeat(5 - full)} {rating.toFixed(1)}
    </span>
  )
}

export default function ListingCard({ listing, onBid, onChat }) {
  const handleReport = () => {
    alert('🚩 Report submitted. Our team will review this listing. Thank you.')
  }

  return (
    <div className={`listing-card ${listing.featured ? 'is-featured' : ''}`}>
      <div className="card-top">
        <span className="game-dot">{listing.game}</span>
        <span className={`type-badge ${listing.type}`}>{listing.type}</span>
      </div>

      <div>
        <div className="card-title">{listing.title}</div>
        <div className="card-desc" style={{ marginTop: 6 }}>{listing.description}</div>
      </div>

      {(listing.verified || listing.pro || listing.featured) && (
        <div className="badges">
          {listing.verified && <span className="badge badge-verified">✓ Verified</span>}
          {listing.pro && <span className="badge badge-pro">⚡ Pro</span>}
          {listing.featured && <span className="badge badge-featured">★ Featured</span>}
        </div>
      )}

      <div className="card-meta">
        <span className="seller-name">👤 {listing.seller}</span>
        <Stars rating={listing.rating} />
        <span className="eta-badge">⏱ {listing.eta}</span>
      </div>

      <div className="card-price">
        ${listing.price}<span> budget</span>
      </div>

      <div className="card-actions">
        <button className="btn-primary" onClick={() => onBid(listing)}>💰 Bid</button>
        <button className="btn-secondary" onClick={() => onChat(listing)}>💬 Chat</button>
        <div className="card-actions-right">
          <button className="btn-danger" onClick={handleReport}>🚩 Report</button>
        </div>
      </div>
    </div>
  )
}
