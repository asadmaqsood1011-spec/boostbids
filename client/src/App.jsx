import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import FeaturedSection from './components/FeaturedSection'
import Marketplace from './components/Marketplace'
import MonetizationSection from './components/MonetizationSection'
import Disclaimer from './components/Disclaimer'
import CreateListingModal from './components/CreateListingModal'
import BidModal from './components/BidModal'
import ChatModal from './components/ChatModal'
import AuthModal from './components/AuthModal'
import NotificationBell from './components/NotificationBell'
import { useAuth } from './context/AuthContext'

const API = 'https://boostbids-production.up.railway.app'

export default function App() {
  const { user, logout } = useAuth()
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedGame, setSelectedGame] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showBidModal, setShowBidModal] = useState(false)
  const [showChatModal, setShowChatModal] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [selectedListing, setSelectedListing] = useState(null)
  const [createType, setCreateType] = useState('offer')

  const fetchListings = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API}/api/listings`)
      const data = await res.json()
      setListings(data)
    } catch (err) {
      console.error('Failed to fetch listings:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchListings() }, [])

  const filtered = listings.filter(l => {
    const gameMatch = selectedGame === 'All' || l.game === selectedGame
    const searchMatch = !searchQuery ||
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.seller.toLowerCase().includes(searchQuery.toLowerCase())
    return gameMatch && searchMatch
  })

  const featured = listings.filter(l => l.featured)

  const openBid = (listing) => { setSelectedListing(listing); setShowBidModal(true) }
  const openChat = (listing) => { setSelectedListing(listing); setShowChatModal(true) }
  const openCreate = (type = 'offer') => {
    if (!user) { setShowAuthModal(true); return }
    setCreateType(type); setShowCreateModal(true)
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-brand">⚡ <span>BoostBids</span></div>
        <div className="nav-links">
          <a href="#marketplace">Marketplace</a>
          <a href="#featured">Featured</a>
          <a href="#monetize">Go Pro</a>
          <NotificationBell />
          {user ? (
            <>
              <span style={{ color: '#aaa', fontSize: 14 }}>👤 {user.username}</span>
              <button className="btn-secondary" onClick={logout} style={{ padding: '6px 14px', fontSize: 13 }}>Logout</button>
            </>
          ) : (
            <button className="btn-secondary" onClick={() => setShowAuthModal(true)} style={{ padding: '6px 14px', fontSize: 13 }}>Login</button>
          )}
          <button className="btn-primary" onClick={() => openCreate('offer')}>Post Listing</button>
        </div>
      </nav>

      <Hero onPostRequest={() => openCreate('request')} onPostOffer={() => openCreate('offer')} />
      <FeaturedSection listings={featured} onBid={openBid} onChat={openChat} />
      <Marketplace
        listings={filtered}
        loading={loading}
        selectedGame={selectedGame}
        setSelectedGame={setSelectedGame}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onBid={openBid}
        onChat={openChat}
        onCreateListing={() => openCreate('offer')}
      />
      <MonetizationSection />
      <Disclaimer />

      <footer className="footer">
        <p>⚡ BoostBids &copy; 2024 — A posting board for gaming services. Not a payment platform.</p>
      </footer>

      {showCreateModal && (
        <CreateListingModal
          api={API}
          defaultType={createType}
          onClose={() => setShowCreateModal(false)}
          onCreated={() => { setShowCreateModal(false); fetchListings() }}
        />
      )}
      {showBidModal && selectedListing && (
        <BidModal
          api={API}
          listing={selectedListing}
          onClose={() => setShowBidModal(false)}
        />
      )}
      {showChatModal && selectedListing && (
        <ChatModal
          api={API}
          listing={selectedListing}
          onClose={() => setShowChatModal(false)}
        />
      )}
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  )
}
