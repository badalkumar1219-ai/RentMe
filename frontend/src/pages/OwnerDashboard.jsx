// pages/OwnerDashboard.jsx
// Property owner's dashboard: view/edit/delete their own listings.

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { PROPERTIES } from '../data/listings';
import LoadingSpinner from '../components/LoadingSpinner';

const OwnerDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const load = () => {
    setLoading(true);
    // Setting all properties from static data as requested
    setProperties([...PROPERTIES]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this property? This cannot be undone.')) return;
    setDeletingId(id);
    setProperties((prev) => prev.filter((p) => p._id !== id));
    toast.success('Property deleted');
    setDeletingId(null);
  };

  const statusBadge = (status) => {
    const styles = {
      approved: 'bg-green-900 text-green-300',
      pending: 'bg-yellow-900 text-yellow-300',
      rejected: 'bg-red-900 text-red-300',
    };
    return <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${styles[status]}`}>{status}</span>;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="section-title">My Listings</h1>
        <Link to="/owner/dashboard/add" className="btn-primary flex items-center gap-2">
          <FiPlus /> Add New Property
        </Link>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : properties.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <p>You haven't listed any properties yet.</p>
          <Link to="/owner/dashboard/add" className="text-primary-400 hover:underline mt-2 inline-block">
            List your first property
          </Link>
        </div>
      ) : (
        <div className="bg-surface-800/80 backdrop-blur-sm rounded-xl border border-surface-700/50 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-surface-700/50 text-slate-300 uppercase text-xs">
              <tr>
                <th className="px-5 py-3">Property</th>
                <th className="px-5 py-3">Rent</th>
                <th className="px-5 py-3">Location</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-700">
              {properties.map((p) => (
                <tr key={p._id} className="hover:bg-surface-700/30">
                  <td className="px-5 py-3 flex items-center gap-3">
                    <img
                      src={p.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=200&q=50'}
                      alt={p.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <Link to={`/property/${p._id}`} className="font-medium text-white hover:text-primary-400 line-clamp-1">
                      {p.title}
                    </Link>
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap text-slate-300">₹{Number(p.rent_price).toLocaleString('en-IN')}</td>
                  <td className="px-5 py-3 whitespace-nowrap text-slate-300">{p.city}</td>
                  <td className="px-5 py-3">{statusBadge(p.status)}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <Link to={`/owner/dashboard/edit/${p._id}`} className="text-slate-400 hover:text-primary-400" title="Edit">
                        <FiEdit2 />
                      </Link>
                      <button
                        onClick={() => handleDelete(p._id)}
                        disabled={deletingId === p._id}
                        className="text-slate-400 hover:text-red-400"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
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

export default OwnerDashboard;
