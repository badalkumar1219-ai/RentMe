// pages/Profile.jsx
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiPhone } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', phone_number: user?.phone_number || '' });
  const [saving, setSaving] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    updateUser({ name: form.name, phone_number: form.phone_number });
    toast.success('Profile updated');
    setSaving(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="section-title mb-6">My Profile</h1>

      <div className="bg-surface-800/80 backdrop-blur-sm rounded-2xl border border-surface-700/50 p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-2xl font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-white">{user?.name}</p>
            <span className="text-xs bg-surface-700 px-2 py-0.5 rounded-full text-slate-400 capitalize">{user?.role}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-300 flex items-center gap-1"><FiUser /> Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-field mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-300 flex items-center gap-1"><FiMail /> Email</label>
            <input type="email" value={user?.email} disabled className="input-field mt-1 bg-surface-700 cursor-not-allowed" />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-300 flex items-center gap-1"><FiPhone /> Phone Number</label>
            <input
              type="tel"
              value={form.phone_number}
              onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
              className="input-field mt-1"
            />
          </div>

          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
