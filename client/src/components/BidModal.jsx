import { useState, useEffect } from 'react'

export default function BidModal({ api, listing, onClose }) {
  const [bids, setBids] = useState([])
  const [form, setForm] = useState({ bidder: '', amount: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchBids = async () => {
    try {
      const res = await fetch(`${api}/api/bids/${listing._id}`)
      const data = await res.json()
      setBids(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => { fetchBids() }, [listing._id])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async () => {
    if (!form.bidder || !form.amount) {
      setError('Please enter your name and bid amount.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${api}/api/bids`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId: listing._id, bidder: form.bidder, amount: Number(form.amount), message: form.message }),
      })
      if (!res.ok) throw new Error('Failed to place bid')
      setForm({ bidder: '', amount: '', message: '' })
      fetchBids()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-wide" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>💰 Place a Bid</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div style={{ padding: '10px 14px', background: 'var(--bg)', borderRadius: 8, border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: 4 }}>Listing</div>
            <div style={{ fontWeight: 700 }}>{listing.title}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{listing.game} · {listing.seller} · ${listing.price}</div>
          </div>

          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, marginBottom: 10, color: 'var(--text-muted)' }}>
              Current Bids ({bids.length})
            </div>
            {bids.length === 0 ? (
              <p className="empty-state">No bids yet. Be the first!</p>
            ) : (
              <div className="bids-list">
                {bids.map(b => (
                  <div key={b._id} className="bid-item">
                    <div className="bid-top">
                      <span className="bid-bidder">👤 {b.bidder}</span>
                      <span className="bid-amount">${b.amount}</span>
                    </div>
                    {b.message && <div className="bid-msg">"{b.message}"</div>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, marginBottom: 12, color: 'var(--text-muted)' }}>Submit Your Bid</div>
            <div className="form-row">
              <div className="form-group">
                <label>Your Username</label>
                <input placeholder="e.g. BoostKing99" value={form.bidder} onChange={e => set('bidder', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Bid Amount ($)</label>
                <input type="number" placeholder="e.g. 45" value={form.amount} onChange={e => set('amount', e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label>Message (optional)</label>
              <input placeholder="Why should they pick you?" value={form.message} onChange={e => set('message', e.target.value)} />
            </div>
            {error && <p style={{ color: 'var(--red)', fontSize: '0.85rem', marginTop: 8 }}>{error}</p>}
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Placing…' : '💰 Place Bid'}
          </button>
        </div>
      </div>
    </div>
  )
}
