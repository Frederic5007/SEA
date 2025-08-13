import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import apiService from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token and verify it on app start
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (apiService.isAuthenticated()) {
          const { user } = await apiService.getProfile();
          setUser(user);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Clear invalid tokens
        localStorage.removeItem('sea_auth_token');
        localStorage.removeItem('sea_auth_user');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Store user in localStorage when it changes
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
    loading,
    login: async (credentials) => {
      try {
        const { user: userData } = await apiService.login(credentials);
        setUser(userData);
        return { success: true, user: userData };
      } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: error.message };
      }
    },
    register: async (userData) => {
      try {
        const { user: newUser } = await apiService.register(userData);
        setUser(newUser);
        return { success: true, user: newUser };
      } catch (error) {
        console.error('Registration error:', error);
        return { success: false, error: error.message };
      }
    },
    logout: async () => {
      try {
        await apiService.logout();
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        setUser(null);
      }
    },
    updateProfile: async (profileData) => {
      try {
        const { user: updatedUser } = await apiService.updateProfile(profileData);
        setUser(updatedUser);
        return { success: true };
      } catch (error) {
        console.error('Profile update error:', error);
        return { success: false, error: error.message };
      }
    },
    googleAuth: async (accessToken) => {
      try {
        const { user: userData } = await apiService.googleAuth(accessToken);
        setUser(userData);
        return { success: true, user: userData };
      } catch (error) {
        console.error('Google auth error:', error);
        return { success: false, error: error.message };
      }
    },
    facebookAuth: async (accessToken) => {
      try {
        const { user: userData } = await apiService.facebookAuth(accessToken);
        setUser(userData);
        return { success: true, user: userData };
      } catch (error) {
        console.error('Facebook auth error:', error);
        return { success: false, error: error.message };
      }
    }
  }), [user, loading]);

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}


