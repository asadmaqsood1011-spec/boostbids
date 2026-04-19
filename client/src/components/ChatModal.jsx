import { useState, useEffect, useRef } from 'react'

export default function ChatModal({ api, listing, onClose }) {
  const [messages, setMessages] = useState([])
  const [sender, setSender] = useState('')
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${api}/api/messages/${listing._id}`)
      const data = await res.json()
      setMessages(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => { fetchMessages() }, [listing._id])
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const handleSend = async () => {
    if (!sender.trim() || !text.trim()) return
    setLoading(true)
    try {
      const res = await fetch(`${api}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId: listing._id, sender: sender.trim(), text: text.trim() }),
      })
      if (!res.ok) throw new Error('Failed to send')
      setText('')
      fetchMessages()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  const formatTime = (iso) => new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-wide" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>💬 Chat</h2>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>{listing.title}</div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="chat-messages">
            {messages.length === 0 ? (
              <p className="empty-state">No messages yet. Start the conversation!</p>
            ) : (
              messages.map(m => (
                <div key={m._id} className={`chat-bubble ${m.sender === sender ? 'own' : ''}`}>
                  <div className="chat-sender">{m.sender}</div>
                  <div className="chat-text">{m.text}</div>
                  <div className="chat-time">{formatTime(m.createdAt)}</div>
                </div>
              ))
            )}
            <div ref={bottomRef} />
          </div>

          <div style={{ paddingTop: 12, borderTop: '1px solid var(--border)' }}>
            <div className="form-group" style={{ marginBottom: 10 }}>
              <label>Your Username</label>
              <input
                placeholder="Enter your username first"
                value={sender}
                onChange={e => setSender(e.target.value)}
              />
            </div>
            <div className="chat-form">
              <input
                placeholder="Type a message… (Enter to send)"
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button className="btn-primary" onClick={handleSend} disabled={loading || !sender.trim() || !text.trim()}>
                {loading ? '…' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
