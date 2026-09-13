import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiTrash2, FiCheck, FiX, FiUserX, FiUserCheck } from 'react-icons/fi';
import { PROPERTIES, DEMO_USERS } from '../data/listings';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminDashboard = () => {
  const [tab, setTab] = useState('properties');
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    setUsers([...DEMO_USERS]);
    setProperties([...PROPERTIES]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const setPropertyStatus = (id, status) => {
    setProperties((prev) => prev.map((p) => (p._id === id ? { ...p, status } : p)));
    toast.success(`Property ${status}`);
  };

  const removeProperty = (id) => {
    if (!window.confirm('Permanently remove this listing?')) return;
    setProperties((prev) => prev.filter((p) => p._id !== id));
    toast.success('Listing removed');
  };

  const toggleUserStatus = (id, isActive) => {
    setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, isActive: !isActive } : u)));
    toast.success(!isActive ? 'User activated' : 'User deactivated');
  };

  const deleteUser = (id) => {
    if (!window.confirm('Delete this user permanently?')) return;
    setUsers((prev) => prev.filter((u) => u._id !== id));
    toast.success('User deleted');
  };

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="section-title mb-6">Admin Dashboard</h1>

      <div className="flex gap-2 mb-6">
        {['properties', 'users'].map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${tab === t ? 'bg-primary-600 text-white' : 'bg-surface-800 text-slate-300 border border-surface-700'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'properties' && (
        <div className="bg-surface-800/80 backdrop-blur-sm rounded-xl border border-surface-700/50 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-surface-700/50 text-slate-300 uppercase text-xs">
              <tr>
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Owner</th>
                <th className="px-5 py-3">Rent</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-700">
              {properties.map((p) => (
                <tr key={p._id} className="hover:bg-surface-700/30">
                  <td className="px-5 py-3 font-medium text-white line-clamp-1">{p.title}</td>
                  <td className="px-5 py-3 text-slate-300">{p.owner_id?.name || '—'}</td>
                  <td className="px-5 py-3 whitespace-nowrap text-slate-300">₹{Number(p.rent_price).toLocaleString('en-IN')}</td>
                  <td className="px-5 py-3 capitalize text-slate-300">{p.status}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-3">
                      {p.status !== 'approved' && (
                        <button onClick={() => setPropertyStatus(p._id, 'approved')} className="text-green-400" title="Approve"><FiCheck /></button>
                      )}
                      {p.status !== 'rejected' && (
                        <button onClick={() => setPropertyStatus(p._id, 'rejected')} className="text-yellow-400" title="Reject"><FiX /></button>
                      )}
                      <button onClick={() => removeProperty(p._id)} className="text-red-400" title="Delete"><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'users' && (
        <div className="bg-surface-800/80 backdrop-blur-sm rounded-xl border border-surface-700/50 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-surface-700/50 text-slate-300 uppercase text-xs">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-700">
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-surface-700/30">
                  <td className="px-5 py-3 font-medium text-white">{u.name}</td>
                  <td className="px-5 py-3 text-slate-300">{u.email}</td>
                  <td className="px-5 py-3 capitalize text-slate-300">{u.role}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${u.isActive ? 'bg-green-900 text-green-300' : 'bg-surface-700 text-slate-400'}`}>
                      {u.isActive ? 'Active' : 'Deactivated'}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    {u.role !== 'admin' && (
                      <div className="flex items-center justify-end gap-3">
                        <button onClick={() => toggleUserStatus(u._id, u.isActive)} className="text-slate-400 hover:text-primary-400" title={u.isActive ? 'Deactivate' : 'Activate'}>
                          {u.isActive ? <FiUserX /> : <FiUserCheck />}
                        </button>
                        <button onClick={() => deleteUser(u._id)} className="text-red-400" title="Delete"><FiTrash2 /></button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
