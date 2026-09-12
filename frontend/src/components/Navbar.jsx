// components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiMenu, FiX, FiHeart, FiUser, FiLogOut, FiGrid, FiShield } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const ROLE_BADGES = {
  tenant: { label: 'Tenant', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  owner: { label: 'Owner', color: 'bg-primary-500/20 text-primary-400 border-primary-500/30' },
  admin: { label: 'Admin', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/');
  };

  const links = [
    { to: '/listings', label: 'Browse Rentals' },
    ...(user?.role === 'owner' ? [{ to: '/owner/dashboard', label: 'My Listings' }] : []),
    ...(user?.role === 'admin' ? [{ to: '/admin/dashboard', label: 'Admin Panel' }] : []),
  ];

  const roleBadge = user ? ROLE_BADGES[user.role] : null;

  return (
    <header className="sticky top-0 z-50 bg-surface-900/80 backdrop-blur-xl border-b border-surface-700/50 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 text-xl font-extrabold text-white tracking-tight">
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 text-white shadow-lg shadow-primary-600/30">
            <FiHome className="text-lg" />
          </span>
          <span className="gradient-text">RentMe</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="text-slate-400 hover:text-primary-400 font-semibold text-sm transition-colors relative group">
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link to="/favorites" className="p-2 text-slate-400 hover:text-primary-400 transition-colors" title="Saved properties">
                <FiHeart size={20} />
              </Link>
              {roleBadge && (
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${roleBadge.color}`}>
                  {roleBadge.label}
                </span>
              )}
              <Link to="/profile" className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-primary-400 transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white text-xs font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                {user.name?.split(' ')[0]}
              </Link>
              <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-400 transition-colors" title="Logout">
                <FiLogOut size={18} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-semibold text-slate-300 hover:text-primary-400 transition-colors">
                Login
              </Link>
              <Link to="/register" className="btn-primary text-sm">
                Get Started
              </Link>
            </>
          )}
          {user?.role === 'owner' && (
            <Link to="/owner/dashboard/add" className="btn-outline text-sm flex items-center gap-1">
              <FiGrid /> List Property
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 text-slate-300" onClick={() => setOpen(!open)}>
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-surface-800 border-t border-surface-700 px-4 py-4 space-y-3 animate-slide-up">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block text-slate-300 font-medium hover:text-primary-400">
              {l.label}
            </Link>
          ))}
          {user ? (
            <>
              {roleBadge && (
                <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border ${roleBadge.color}`}>
                  {roleBadge.label}
                </span>
              )}
              <Link to="/favorites" onClick={() => setOpen(false)} className="block text-slate-300 font-medium hover:text-primary-400">
                Saved Properties
              </Link>
              <Link to="/profile" onClick={() => setOpen(false)} className="block text-slate-300 font-medium hover:text-primary-400">
                Profile
              </Link>
              <button onClick={handleLogout} className="block text-red-400 font-medium">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className="block text-slate-300 font-medium">
                Login
              </Link>
              <Link to="/register" onClick={() => setOpen(false)} className="block text-primary-400 font-semibold">
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
