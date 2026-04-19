import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const API = 'https://boostbids-production.up.railway.app';

export default function NotificationBell() {
  const { token } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!token) return;
    fetch(API + '/api/notifications', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setNotifications).catch(() => {});
  }, [token]);

  const unread = notifications.filter(n => !n.read).length;

  const markAll = async () => {
    await fetch(API + '/api/notifications/read-all', { method: 'PUT', headers: { Authorization: `Bearer ${token}` } });
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  if (!token) return null;

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: '#fff', position: 'relative' }}>
        🔔
        {unread > 0 && (
          <span style={{ position: 'absolute', top: -4, right: -4, background: '#ff6b6b', color: '#fff', borderRadius: '50%', fontSize: 10, width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {unread}
          </span>
        )}
      </button>
      {open && (
        <div style={{ position: 'absolute', right: 0, top: 36, background: '#1a1a2e', border: '1px solid #333', borderRadius: 12, width: 300, zIndex: 1000, maxHeight: 400, overflowY: 'auto' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong>Notifications</strong>
            {unread > 0 && <button onClick={markAll} style={{ background: 'none', border: 'none', color: '#7c3aed', cursor: 'pointer', fontSize: 12 }}>Mark all read</button>}
          </div>
          {notifications.length === 0 ? (
            <p style={{ padding: 16, color: '#aaa', margin: 0 }}>No notifications</p>
          ) : notifications.map(n => (
            <div key={n._id} style={{ padding: '10px 16px', borderBottom: '1px solid #222', background: n.read ? 'transparent' : '#2d1b4e' }}>
              <p style={{ margin: 0, fontSize: 13 }}>{n.message}</p>
              <p style={{ margin: '4px 0 0', fontSize: 11, color: '#888' }}>{new Date(n.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
