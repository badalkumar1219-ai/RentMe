// pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiHome, FiShield, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';

const ROLES = [
  { key: 'tenant', label: 'Tenant', icon: FiUser, color: 'from-blue-500 to-cyan-400', desc: 'Find your perfect rental home', credentials: { email: 'tenant@homenest.com', password: 'tenant123' } },
  { key: 'owner', label: 'Owner', icon: FiHome, color: 'from-primary-500 to-accent-500', desc: 'Manage your property listings', credentials: { email: 'owner@homenest.com', password: 'owner123' } },
  { key: 'admin', label: 'Admin', icon: FiShield, color: 'from-amber-500 to-orange-500', desc: 'Oversee the entire platform', credentials: { email: 'admin@homenest.com', password: 'admin123' } },
];

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const defaultRole = 'admin';
  const [activeRole, setActiveRole] = useState(defaultRole);
  const [form, setForm] = useState(() => ({
    ...(ROLES.find(r => r.key === defaultRole)?.credentials || { email: '', password: '' }),
  }));
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const trimmedEmail = String(form.email ?? '').trim().toLowerCase();
    const errs = {};

    if (!trimmedEmail) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) errs.email = 'Enter a valid email';

    if (!form.password) errs.password = 'Password is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const normalizedEmail = String(form.email ?? '').trim().toLowerCase();
      const userData = await login(normalizedEmail, form.password);
      toast.success(`Welcome back, ${userData.name}!`);
      // Redirect based on role
      const redirectTo = location.state?.from || 
        (userData.role === 'admin' ? '/admin/dashboard' : 
         userData.role === 'owner' ? '/owner/dashboard' : '/');
      navigate(redirectTo);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const currentRole = ROLES.find(r => r.key === activeRole);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* Left decorative panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-surface-900 via-primary-900/40 to-surface-900 items-center justify-center p-12">
        {/* Animated orbs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-primary-500/10 blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-accent-500/10 blur-3xl animate-float" />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full border border-primary-500/20 animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="relative z-10 text-center max-w-md">
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${currentRole.color} mx-auto flex items-center justify-center mb-6 shadow-2xl transition-all duration-500`}>
            <currentRole.icon className="text-white text-3xl" />
          </div>
          <h2 className="font-display text-4xl text-white mb-4">Welcome to RentMe</h2>
          <p className="text-slate-400 text-lg">{currentRole.desc}</p>
          <div className="mt-8 flex items-center justify-center gap-3">
            {ROLES.map(r => (
              <div key={r.key} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeRole === r.key ? 'bg-primary-400 scale-125' : 'bg-slate-600'}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <div className="w-full max-w-md">
          {/* Role tabs */}
          <div className="flex bg-surface-800 rounded-xl p-1 mb-8 border border-surface-700">
            {ROLES.map(r => (
              <button
                key={r.key}
                type="button"
                onClick={() => {
                  setActiveRole(r.key);
                  setForm({ ...r.credentials });
                  setErrors({});
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  activeRole === r.key
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <r.icon size={16} />
                {r.label}
              </button>
            ))}
          </div>

          <h1 className="text-3xl font-display text-white">Sign In</h1>
          <p className="text-slate-400 mt-2">Login as <span className="text-primary-400 font-semibold capitalize">{activeRole}</span> to continue</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-medium text-slate-300 mb-1.5 block">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                  }}
                  className="input-field pl-10"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && <p className="text-xs text-red-400 mt-1.5">{errors.email}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300 mb-1.5 block">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                    if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                  }}
                  className="input-field pl-10 pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-400 mt-1.5">{errors.password}</p>}
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <FiArrowRight /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-8">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-400 font-semibold hover:text-primary-300 transition-colors">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
