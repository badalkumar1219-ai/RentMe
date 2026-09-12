// components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => (
  <footer className="bg-surface-900 border-t border-surface-700/50 mt-20">
    {/* Gradient top border */}
    <div className="h-0.5 bg-gradient-to-r from-emerald-500 via-primary-500 via-50% to-amber-500" />
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <div className="flex items-center gap-2.5 text-2xl text-white mb-3">
          <span className="grid place-items-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500">
            <FiHome className="text-white" />
          </span>
          <span className="gradient-text font-extrabold">RentMe</span>
        </div>
        <p className="text-sm text-slate-500 leading-relaxed">
          Helping tenants find their perfect rental home, and helping owners list properties with ease.
        </p>
      </div>

      <div>
        <h4 className="text-white font-display text-xl mb-3">Quick Links</h4>
        <ul className="space-y-2 text-sm">
          <li><Link to="/listings" className="text-slate-400 hover:text-emerald-400 transition-colors">Browse Rentals</Link></li>
          <li><Link to="/register" className="text-slate-400 hover:text-amber-400 transition-colors">List Your Property</Link></li>
          <li><Link to="/login" className="text-slate-400 hover:text-rose-400 transition-colors">Login</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-display text-xl mb-3">Property Types</h4>
        <ul className="space-y-2 text-sm text-slate-400">
          <li>Apartments</li>
          <li>Independent Houses</li>
          <li>Villas</li>
          <li>PG &amp; Rooms</li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-display text-xl mb-3">Contact</h4>
        <ul className="space-y-2 text-sm text-slate-400">
          <li className="flex items-center gap-2"><FiMail className="text-emerald-400" /> badalkumar1219@gmail.com</li>
          <li className="flex items-center gap-2"><FiPhone className="text-amber-400" /> 7846914033</li>
          <li className="flex items-center gap-2"><FiMapPin className="text-rose-400" /> Bengaluru, India</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-surface-800 py-4 text-center text-xs text-slate-600">
      © {new Date().getFullYear()} RentMe. All rights reserved.
    </div>
  </footer>
);

export default Footer;
