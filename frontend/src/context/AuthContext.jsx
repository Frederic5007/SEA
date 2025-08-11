import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('sea_auth_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('sea_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sea_auth_user');
    }
  }, [user]);

  const value = useMemo(() => ({
    user,
    isLoggedIn: Boolean(user),
    login: ({ name, email }) => {
      const profile = {
        id: crypto.randomUUID(),
        name: name || 'SEA User',
        email,
        joinedAt: new Date().toISOString(),
      };
      setUser(profile);
    },
    logout: () => setUser(null),
  }), [user]);

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}


