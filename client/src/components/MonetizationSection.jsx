export default function MonetizationSection() {
  return (
    <section className="monetization-section" id="monetize">
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', marginBottom: 28 }}>
        <div className="section-header">
          <h2 className="section-title">💼 <span>Grow</span> Your Business</h2>
        </div>
      </div>
      <div className="mono-grid">
        <div className="mono-card">
          <div className="mono-icon">★</div>
          <h3>Featured Listing</h3>
          <p>Pin your listing to the top of the marketplace and get 10x more visibility.</p>
          <div className="mono-price">$9.99</div>
          <div className="mono-sub">per week</div>
          <button className="btn-primary" onClick={() => alert('📩 Contact us at boost@boostbids.gg to get featured!')}>
            Get Featured
          </button>
        </div>

        <div className="mono-card">
          <div className="mono-icon">⚡</div>
          <h3>Pro Booster Badge</h3>
          <p>Stand out with the ⚡ Pro badge. Shows buyers you're a trusted, serious booster.</p>
          <div className="mono-price">$19.99</div>
          <div className="mono-sub">per month</div>
          <button className="btn-cyan" onClick={() => alert('📩 Contact us at pro@boostbids.gg to get your Pro badge!')}>
            Go Pro
          </button>
        </div>

        <div className="mono-card ad-card">
          <div className="mono-icon">📢</div>
          <h3>Banner Spotlight</h3>
          <p>Advertise your boosting service or brand to thousands of daily visitors.</p>
          <div className="ad-placeholder">
            [ YOUR AD HERE ]<br />
            <span style={{ fontSize: '0.7rem' }}>728 × 90 banner slot — contact us</span>
          </div>
          <div className="mono-sub">Rates from $49/week</div>
          <button className="btn-secondary" onClick={() => alert('📩 Contact us at ads@boostbids.gg to advertise!')}>
            Advertise Here
          </button>
        </div>
      </div>
    </section>
  )
}
