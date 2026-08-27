// =========================================================
//  AuthContext — Global authentication state
// =========================================================

import { createContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const clearAuthStorage = useCallback(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }, []);

  // Initialize auth from localStorage on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('access_token');
      const storedUser = localStorage.getItem('user');
      if (token && storedUser) {
        try {
          const user = JSON.parse(storedUser);
          setCurrentUser(user);
          setIsAuthenticated(true);
        } catch {
          clearAuthStorage();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, [clearAuthStorage]);

  // Listen for forced logout events from the API interceptor
  useEffect(() => {
    const handleForcedLogout = () => {
      setCurrentUser(null);
      setIsAuthenticated(false);
    };
    window.addEventListener('auth:logout', handleForcedLogout);
    return () => window.removeEventListener('auth:logout', handleForcedLogout);
  }, []);

  const login = useCallback(async ({ email, password }) => {
    const data = await authService.login({ email, password });
    localStorage.setItem('access_token', data.access);
    if (data.refresh) localStorage.setItem('refresh_token', data.refresh);
    localStorage.setItem('user', JSON.stringify(data.user));
    setCurrentUser(data.user);
    setIsAuthenticated(true);
    return data.user;
  }, []);

  const signup = useCallback(async ({ name, email, password }) => {
    const data = await authService.signup({ name, email, password });
    localStorage.setItem('access_token', data.access);
    if (data.refresh) localStorage.setItem('refresh_token', data.refresh);
    localStorage.setItem('user', JSON.stringify(data.user));
    setCurrentUser(data.user);
    setIsAuthenticated(true);
    return data.user;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout().catch(() => {});
    clearAuthStorage();
    setCurrentUser(null);
    setIsAuthenticated(false);
  }, [clearAuthStorage]);

  const updateUser = useCallback((userData) => {
    setCurrentUser((prev) => {
      const updated = { ...prev, ...userData };
      localStorage.setItem('user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
