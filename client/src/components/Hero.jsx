export default function Hero({ onPostRequest, onPostOffer }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-eyebrow">🎮 Gaming Boost Marketplace</div>
        <h1>Find Your Boost.<br />Win Your Game.</h1>
        <p>
          Connect with pro boosters or post your own request.
          Browse verified offers across the top games — no middleman, just results.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={onPostOffer} style={{ padding: '12px 28px', fontSize: '1rem' }}>
            🚀 Post an Offer
          </button>
          <button className="btn-secondary" onClick={onPostRequest} style={{ padding: '12px 28px', fontSize: '1rem' }}>
            💬 Post a Request
          </button>
        </div>
        <div className="hero-stats">
          <div className="hero-stat"><div className="num">500+</div><div className="lbl">Active Listings</div></div>
          <div className="hero-stat"><div className="num">1.2k+</div><div className="lbl">Pro Boosters</div></div>
          <div className="hero-stat"><div className="num">8</div><div className="lbl">Games</div></div>
          <div className="hero-stat"><div className="num">4.9★</div><div className="lbl">Avg Rating</div></div>
        </div>
      </div>
    </section>
  )
}
