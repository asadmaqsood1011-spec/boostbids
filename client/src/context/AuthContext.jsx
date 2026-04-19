import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem('bb_token');
    const u = localStorage.getItem('bb_user');
    if (t && u) { setToken(t); setUser(JSON.parse(u)); }
  }, []);

  const login = (token, user) => {
    localStorage.setItem('bb_token', token);
    localStorage.setItem('bb_user', JSON.stringify(user));
    setToken(token); setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('bb_token');
    localStorage.removeItem('bb_user');
    setToken(null); setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
