// pages/AddEditProperty.jsx
// In static/demo mode, property creation is not available.

import React from 'react';
import { Link } from 'react-router-dom';
import { FiAlertCircle } from 'react-icons/fi';

const AddEditProperty = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <div className="bg-surface-800/80 backdrop-blur-sm rounded-2xl border border-surface-700/50 p-10">
        <FiAlertCircle className="text-amber-400 mx-auto mb-4" size={48} />
        <h1 className="text-2xl font-bold text-white mb-3">Demo Mode</h1>
        <p className="text-slate-400 leading-relaxed">
          Adding and editing properties is not available in this demo deployment. 
          Browse the existing listings to explore the app.
        </p>
        <Link to="/listings" className="btn-primary inline-block mt-6">
          Browse Listings
        </Link>
      </div>
    </div>
  );
};

export default AddEditProperty;
