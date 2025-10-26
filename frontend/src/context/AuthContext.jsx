import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserInfo } from '../api/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true); // To prevent UI flicker

  useEffect(() => {
    // Check for user info in local storage on initial load
    try {
      const storedUser = getUserInfo();
      if (storedUser) {
        setUserInfo(storedUser);
      }
    } catch (error) {
      console.error("Failed to parse user info from storage", error);
      localStorage.removeItem('userInfo');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('userInfo', JSON.stringify(userData));
    setUserInfo(userData);
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
  };

  const value = {
    userInfo,
    isAuthenticated: !!(userInfo && userInfo.data && userInfo.data.token),
    loading, // Expose the loading state
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};