import { useState, useEffect } from 'react';

const API = 'https://boostbids-production.up.railway.app';
const ADMIN_KEY = 'boostbids_admin_2024';
const headers = { 'x-admin-key': ADMIN_KEY };

export default function AdminPanel({ onClose }) {
  const [tab, setTab] = useState('stats');
  const [stats, setStats] = useState(null);
  const [listings, setListings] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(API + '/api/admin/stats', { headers }).then(r => r.json()).then(setStats);
  }, []);

  useEffect(() => {
    if (tab === 'listings') fetch(API + '/api/admin/listings', { headers }).then(r => r.json()).then(setListings);
    if (tab === 'users') fetch(API + '/api/admin/users', { headers }).then(r => r.json()).then(setUsers);
  }, [tab]);

  const deleteListing = async (id) => {
    if (!confirm('Delete this listing?')) return;
    await fetch(API + '/api/admin/listings/' + id, { method: 'DELETE', headers });
    setListings(listings.filter(l => l._id !== id));
  };

  const deleteUser = async (id) => {
    if (!confirm('Delete this user and all their listings?')) return;
    await fetch(API + '/api/admin/users/' + id, { method: 'DELETE', headers });
    setUsers(users.filter(u => u._id !== id));
  };

  const tabStyle = (t) => ({ padding: '8px 18px', cursor: 'pointer', border: 'none', borderRadius: 8, background: tab === t ? '#7c3aed' : '#2d2d2d', color: '#fff', fontWeight: tab === t ? 700 : 400 });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 800, width: '95%' }}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2>🛡️ Admin Panel</h2>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          <button style={tabStyle('stats')} onClick={() => setTab('stats')}>Stats</button>
          <button style={tabStyle('listings')} onClick={() => setTab('listings')}>Listings</button>
          <button style={tabStyle('users')} onClick={() => setTab('users')}>Users</button>
        </div>

        {tab === 'stats' && stats && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[['📋 Listings', stats.listings], ['👥 Users', stats.users], ['💰 Bids', stats.bids], ['⭐ Reviews', stats.reviews]].map(([label, val]) => (
              <div key={label} style={{ background: '#1a1a2e', borderRadius: 12, padding: 20, textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 700, color: '#7c3aed' }}>{val}</div>
                <div style={{ color: '#aaa', marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'listings' && (
          <div style={{ maxHeight: 500, overflowY: 'auto' }}>
            {listings.map(l => (
              <div key={l._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #333' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{l.title}</div>
                  <div style={{ color: '#aaa', fontSize: 12 }}>{l.game} · {l.seller} · ${l.price}</div>
                </div>
                <button onClick={() => deleteListing(l._id)} style={{ background: '#ff6b6b', border: 'none', color: '#fff', padding: '6px 12px', borderRadius: 8, cursor: 'pointer' }}>Delete</button>
              </div>
            ))}
          </div>
        )}

        {tab === 'users' && (
          <div style={{ maxHeight: 500, overflowY: 'auto' }}>
            {users.map(u => (
              <div key={u._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #333' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{u.username}</div>
                  <div style={{ color: '#aaa', fontSize: 12 }}>{u.email} · ⭐ {u.rating} · {u.totalReviews} reviews</div>
                </div>
                <button onClick={() => deleteUser(u._id)} style={{ background: '#ff6b6b', border: 'none', color: '#fff', padding: '6px 12px', borderRadius: 8, cursor: 'pointer' }}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
