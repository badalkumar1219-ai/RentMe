// pages/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiHome, FiShield, FiMail, FiLock, FiPhone, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';

const ROLES = [
  { key: 'tenant', label: 'Tenant', icon: FiUser, desc: 'Looking for a rental home', color: 'from-blue-500 to-cyan-400' },
  { key: 'owner', label: 'Owner', icon: FiHome, desc: 'List your properties', color: 'from-primary-500 to-accent-500' },
  { key: 'admin', label: 'Admin', icon: FiShield, desc: 'Platform management', color: 'from-amber-500 to-orange-500' },
];

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone_number: '',
    role: 'tenant',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!/^[0-9+\\-\\s]{7,15}$/.test(form.phone_number)) errs.phone_number = 'Enter a valid phone number';
    if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { confirmPassword, ...payload } = form;
      const userData = await register(payload);
      toast.success(`Welcome to RentMe, ${userData.name}!`);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const currentRole = ROLES.find(r => r.key === form.role);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-surface-900 via-primary-900/40 to-surface-900 items-center justify-center p-12">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-accent-500/10 blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-primary-500/10 blur-3xl animate-float" />
        
        <div className="relative z-10 text-center max-w-md">
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${currentRole.color} mx-auto flex items-center justify-center mb-6 shadow-2xl transition-all duration-500`}>
            <currentRole.icon className="text-white text-3xl" />
          </div>
          <h2 className="font-display text-4xl text-white mb-4">Join RentMe</h2>
          <p className="text-slate-400 text-lg">{currentRole.desc}</p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-display text-white">Create Account</h1>
          <p className="text-slate-400 mt-2">Join RentMe as a tenant or property owner</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Role selector */}
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">I am a...</label>
              <div className="grid grid-cols-3 gap-3">
                {ROLES.map((r) => (
                  <button
                    type="button"
                    key={r.key}
                    onClick={() => setForm({ ...form, role: r.key })}
                    className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-sm font-medium transition-all duration-300 ${
                      form.role === r.key
                        ? 'bg-primary-600/20 text-primary-300 border-primary-500/50 shadow-lg shadow-primary-500/10'
                        : 'border-surface-600 text-slate-400 hover:border-surface-500 hover:text-slate-300'
                    }`}
                  >
                    <r.icon size={20} />
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300 mb-1.5 block">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-field pl-10"
                  placeholder="John Doe"
                />
              </div>
              {errors.name && <p className="text-xs text-red-400 mt-1.5">{errors.name}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300 mb-1.5 block">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-field pl-10"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && <p className="text-xs text-red-400 mt-1.5">{errors.email}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300 mb-1.5 block">Phone Number</label>
              <div className="relative">
                <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input
                  type="tel"
                  value={form.phone_number}
                  onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
                  className="input-field pl-10"
                  placeholder="+91 98765 43210"
                />
              </div>
              {errors.phone_number && <p className="text-xs text-red-400 mt-1.5">{errors.phone_number}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300 mb-1.5 block">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-field pl-10 pr-10"
                  placeholder="At least 6 characters"
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

            <div>
              <label className="text-sm font-medium text-slate-300 mb-1.5 block">Confirm Password</label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  className="input-field pl-10"
                  placeholder="Re-enter password"
                />
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-400 mt-1.5">{errors.confirmPassword}</p>}
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Create Account <FiArrowRight /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-400 font-semibold hover:text-primary-300 transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
