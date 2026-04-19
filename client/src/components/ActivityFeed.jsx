import { useState, useEffect } from 'react';

const API = 'https://boostbids-production.up.railway.app';

const dotColors = { blue: '#3d8bff', green: '#00e676', yellow: '#ffd600' };

function timeAgo(date) {
  const s = Math.floor((Date.now() - new Date(date)) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s/60)}m ago`;
  if (s < 86400) return `${Math.floor(s/3600)}h ago`;
  return `${Math.floor(s/86400)}d ago`;
}

export default function ActivityFeed() {
  const [events, setEvents] = useState([]);

  const fetch_ = () => {
    fetch(API + '/api/activity').then(r => r.json()).then(setEvents).catch(() => {});
  };

  useEffect(() => {
    fetch_();
    const interval = setInterval(fetch_, 30000);
    return () => clearInterval(interval);
  }, []);

  if (events.length === 0) return null;

  return (
    <div>
      {events.map((e, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: dotColors[e.dot] || '#3d8bff', boxShadow: `0 0 8px ${dotColors[e.dot] || '#3d8bff'}`, flexShrink: 0 }} />
          <div style={{ flex: 1, fontSize: '0.85rem', color: '#8aa3c1' }}>{e.text}</div>
          <div style={{ fontSize: '0.75rem', color: '#4a6380', whiteSpace: 'nowrap' }}>{timeAgo(e.time)}</div>
        </div>
      ))}
    </div>
  );
}
