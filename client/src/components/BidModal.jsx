import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

export default function BidModal({ api, listing, onClose }) {
  const { user, token } = useAuth()
  const [bids, setBids] = useState([])
  const [form, setForm] = useState({ amount: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [reviewBid, setReviewBid] = useState(null)
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' })
  const [reviewDone, setReviewDone] = useState(false)

  const isOwner = user && listing.sellerId && user.id === listing.sellerId

  const fetchBids = async () => {
    try {
      const res = await fetch(`${api}/api/bids/${listing._id}`)
      setBids(await res.json())
    } catch (err) { console.error(err) }
  }

  useEffect(() => { fetchBids() }, [listing._id])

  const handleSubmit = async () => {
    if (!form.amount) { setError('Enter a bid amount.'); return }
    if (!user) { setError('Please login to place a bid.'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch(`${api}/api/bids`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId: listing._id, bidder: user.username, bidderId: user.id, amount: Number(form.amount), message: form.message }),
      })
      if (!res.ok) throw new Error('Failed to place bid')
      setForm({ amount: '', message: '' })
      fetchBids()
    } catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  const handleAccept = async (bid) => {
    await fetch(`${api}/api/bids/${bid._id}/accept`, { method: 'PUT', headers: { Authorization: `Bearer ${token}` } })
    fetchBids()
  }

  const handleReject = async (bid) => {
    await fetch(`${api}/api/bids/${bid._id}/reject`, { method: 'PUT', headers: { Authorization: `Bearer ${token}` } })
    fetchBids()
  }

  const handleReview = async () => {
    if (!reviewBid) return
    await fetch(`${api}/api/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ revieweeId: reviewBid.bidderId, listingId: listing._id, rating: reviewForm.rating, comment: reviewForm.comment })
    })
    setReviewDone(true)
    setReviewBid(null)
  }

  const statusBadge = (status) => {
    if (status === 'accepted') return <span style={{ color: '#4ade80', fontSize: 12 }}>✅ Accepted</span>
    if (status === 'rejected') return <span style={{ color: '#ff6b6b', fontSize: 12 }}>❌ Rejected</span>
    return <span style={{ color: '#facc15', fontSize: 12 }}>⏳ Pending</span>
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-wide" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>💰 Bids</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div style={{ padding: '10px 14px', background: 'var(--bg)', borderRadius: 8, border: '1px solid var(--border)', marginBottom: 16 }}>
            <div style={{ fontWeight: 700 }}>{listing.title}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{listing.game} · {listing.seller} · ${listing.price}</div>
          </div>

          {reviewDone && <p style={{ color: '#4ade80' }}>✅ Review submitted!</p>}

          {reviewBid && (
            <div style={{ background: '#1a1a2e', borderRadius: 12, padding: 16, marginBottom: 16 }}>
              <h3 style={{ marginBottom: 12 }}>⭐ Leave a Review for {reviewBid.bidder}</h3>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                {[1,2,3,4,5].map(n => (
                  <button key={n} onClick={() => setReviewForm(f => ({ ...f, rating: n }))}
                    style={{ background: n <= reviewForm.rating ? '#facc15' : '#333', border: 'none', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', color: '#fff' }}>
                    {'★'.repeat(n)}
                  </button>
                ))}
              </div>
              <input className="form-input" placeholder="Comment (optional)" value={reviewForm.comment}
                onChange={e => setReviewForm(f => ({ ...f, comment: e.target.value }))} style={{ marginBottom: 12 }} />
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn-primary" onClick={handleReview}>Submit Review</button>
                <button className="btn-secondary" onClick={() => setReviewBid(null)}>Cancel</button>
              </div>
            </div>
          )}

          <div style={{ fontSize: '0.88rem', fontWeight: 600, marginBottom: 10 }}>Current Bids ({bids.length})</div>
          {bids.length === 0 ? (
            <p className="empty-state">No bids yet. Be the first!</p>
          ) : (
            <div className="bids-list">
              {bids.map(b => (
                <div key={b._id} className="bid-item">
                  <div className="bid-top">
                    <span className="bid-bidder">👤 {b.bidder}</span>
                    <span className="bid-amount">${b.amount}</span>
                    {statusBadge(b.status)}
                  </div>
                  {b.message && <div className="bid-msg">"{b.message}"</div>}
                  {isOwner && b.status === 'pending' && (
                    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                      <button onClick={() => handleAccept(b)} style={{ background: '#4ade80', border: 'none', color: '#000', padding: '4px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>✅ Accept</button>
                      <button onClick={() => handleReject(b)} style={{ background: '#ff6b6b', border: 'none', color: '#fff', padding: '4px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>❌ Reject</button>
                    </div>
                  )}
                  {isOwner && b.status === 'accepted' && b.bidderId && !reviewDone && (
                    <button onClick={() => setReviewBid(b)} style={{ marginTop: 8, background: '#facc15', border: 'none', color: '#000', padding: '4px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>⭐ Leave Review</button>
                  )}
                </div>
              ))}
            </div>
          )}

          {!isOwner && (
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, marginTop: 16 }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 600, marginBottom: 12 }}>Submit Your Bid</div>
              <div className="form-row">
                <div className="form-group">
                  <label>Bid Amount ($)</label>
                  <input type="number" placeholder="e.g. 45" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} />
                </div>
              </div>
              <div className="form-group">
                <label>Message (optional)</label>
                <input placeholder="Why should they pick you?" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
              </div>
              {error && <p style={{ color: 'var(--red)', fontSize: '0.85rem', marginTop: 8 }}>{error}</p>}
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Close</button>
          {!isOwner && (
            <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Placing…' : '💰 Place Bid'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
