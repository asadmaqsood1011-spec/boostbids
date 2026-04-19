import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const API = 'https://boostbids-production.up.railway.app';

export default function AuthModal({ onClose }) {
  const { login } = useAuth();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const res = await fetch(API + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      login(data.token, data.user);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 400 }}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2 style={{ marginBottom: 20 }}>{mode === 'login' ? '🔐 Login' : '✨ Sign Up'}</h2>
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {mode === 'register' && (
            <input className="form-input" placeholder="Username" value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })} required />
          )}
          <input className="form-input" type="email" placeholder="Email" value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })} required />
          <input className="form-input" type="password" placeholder="Password" value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })} required />
          {error && <p style={{ color: '#ff6b6b', margin: 0 }}>{error}</p>}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Loading...' : mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: 16, color: '#aaa', cursor: 'pointer' }}
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
          {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Login'}
        </p>
      </div>
    </div>
  );
}
