// components/SearchBar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

const PROPERTY_TYPES = ['Apartment', 'Independent House', 'Villa', 'PG', 'Room'];

const SearchBar = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ location: '', propertyType: '', minRent: '', maxRent: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(form).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-panel shadow-[0_20px_60px_rgba(0,0,0,0.4)] p-4 md:p-5 grid grid-cols-1 md:grid-cols-5 gap-3 w-full max-w-4xl animate-slide-up delay-150"
    >
      <input
        type="text"
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="City or locality"
        className="input-field md:col-span-2"
      />
      <select name="propertyType" value={form.propertyType} onChange={handleChange} className="input-field">
        <option value="">Property type</option>
        {PROPERTY_TYPES.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      <input
        type="number"
        name="minRent"
        value={form.minRent}
        onChange={handleChange}
        placeholder="Min rent"
        min="0"
        className="input-field"
      />
      <input
        type="number"
        name="maxRent"
        value={form.maxRent}
        onChange={handleChange}
        placeholder="Max rent"
        min="0"
        className="input-field"
      />
      <button type="submit" className="btn-primary md:col-span-5 flex items-center justify-center gap-2">
        <FiSearch /> Search Rentals
      </button>
    </form>
  );
};

export default SearchBar;
