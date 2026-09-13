import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_USERS, DEMO_PASSWORDS } from '../data/listings';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

const localRegisteredUsers = [];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const register = async (payload) => {
    const newUser = {
      _id: `user-${Date.now()}`,
      name: payload.name,
      email: payload.email,
      phone_number: payload.phone_number,
      role: payload.role || 'renter',
      isActive: true,
      token: 'fake-jwt-token-for-demo'
    };
    localRegisteredUsers.push(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const login = async (email, password) => {
    // Check demo users
    let match = DEMO_USERS.find(u => u.email === email);
    
    // Check newly registered users if not found in demo
    if (!match) {
      match = localRegisteredUsers.find(u => u.email === email);
      // For local registered, allow any password in this demo
      if (match) {
        const loggedInUser = { ...match, token: 'fake-jwt-token-for-demo' };
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        setUser(loggedInUser);
        return loggedInUser;
      }
    }

    if (match && DEMO_PASSWORDS[email] === password) {
      const loggedInUser = { ...match, token: 'fake-jwt-token-for-demo' };
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      return loggedInUser;
    }

    throw new Error('Invalid email or password');
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateUser = (updates) => {
    const updated = { ...user, ...updates };
    localStorage.setItem('user', JSON.stringify(updated));
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
