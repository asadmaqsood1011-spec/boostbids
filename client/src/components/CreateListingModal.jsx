import { useState } from 'react'

const GAMES = [
  'Call of Duty',
  'World of Warcraft',
  'Lost Ark',
  'Warframe',
  'Final Fantasy XIV',
  'Escape from Tarkov',
  'VALORANT',
  'Rocket League',
]

export default function CreateListingModal({ api, defaultType, onClose, onCreated }) {
  const [form, setForm] = useState({
    type: defaultType || 'offer',
    game: 'Call of Duty',
    title: '',
    description: '',
    price: '',
    seller: '',
    eta: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async () => {
    if (!form.title || !form.seller || !form.price) {
      setError('Please fill in title, seller name, and price.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${api}/api/listings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, price: Number(form.price) }),
      })
      if (!res.ok) throw new Error('Failed to create listing')
      onCreated()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>📝 Create Listing</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>Type</label>
            <div className="type-toggle">
              <button
                className={`${form.type === 'offer' ? 'active offer' : ''}`}
                onClick={() => set('type', 'offer')}
              >
                🚀 Offer
              </button>
              <button
                className={`${form.type === 'request' ? 'active request' : ''}`}
                onClick={() => set('type', 'request')}
              >
                💬 Request
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Game</label>
            <select value={form.game} onChange={e => set('game', e.target.value)}>
              {GAMES.map(g => <option key={g}>{g}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Title</label>
            <input
              placeholder="e.g. Diamond Rank Boost — Fast & Safe"
              value={form.title}
              onChange={e => set('title', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Describe your offer or what you need…"
              value={form.description}
              onChange={e => set('description', e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Your Name / Username</label>
              <input
                placeholder="e.g. ProBooster99"
                value={form.seller}
                onChange={e => set('seller', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Price / Budget ($)</label>
              <input
                type="number"
                placeholder="e.g. 50"
                value={form.price}
                onChange={e => set('price', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>ETA</label>
            <input
              placeholder="e.g. 24-48 hours"
              value={form.eta}
              onChange={e => set('eta', e.target.value)}
            />
          </div>

          {error && <p style={{ color: 'var(--red)', fontSize: '0.85rem' }}>{error}</p>}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Posting…' : '🚀 Post Listing'}
          </button>
        </div>
      </div>
    </div>
  )
}
