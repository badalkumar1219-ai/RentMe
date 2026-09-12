// components/FilterSidebar.jsx
import React from 'react';

const PROPERTY_TYPES = ['Apartment', 'Independent House', 'Villa', 'PG', 'Room'];
const BEDROOM_OPTIONS = [1, 2, 3, 4, 5];
const BATHROOM_OPTIONS = [1, 2, 3, 4];
const FURNISHING_OPTIONS = ['Furnished', 'Semi-Furnished', 'Unfurnished'];

const FilterSidebar = ({ filters, onChange, onReset }) => {
  const handleField = (name, value) => onChange({ ...filters, [name]: value });

  return (
    <aside className="glass-panel p-5 space-y-6 h-fit sticky top-24">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-2xl text-white">Refine your search</h3>
        <button onClick={onReset} className="text-xs text-primary-400 hover:text-primary-300 hover:underline transition-colors">
          Reset all
        </button>
      </div>

      {/* Location */}
      <div>
        <label className="text-sm font-medium text-slate-300">Location</label>
        <input
          type="text"
          value={filters.location || ''}
          onChange={(e) => handleField('location', e.target.value)}
          placeholder="City or locality"
          className="input-field mt-1"
        />
      </div>

      {/* Rent range */}
      <div>
        <label className="text-sm font-medium text-slate-300">Rent Range (₹/month)</label>
        <div className="flex items-center gap-2 mt-1">
          <input
            type="number"
            min="0"
            value={filters.minRent || ''}
            onChange={(e) => handleField('minRent', e.target.value)}
            placeholder="Min"
            className="input-field"
          />
          <span className="text-slate-600">-</span>
          <input
            type="number"
            min="0"
            value={filters.maxRent || ''}
            onChange={(e) => handleField('maxRent', e.target.value)}
            placeholder="Max"
            className="input-field"
          />
        </div>
      </div>

      {/* Property type */}
      <div>
        <label className="text-sm font-medium text-slate-300">Property Type</label>
        <select
          value={filters.propertyType || ''}
          onChange={(e) => handleField('propertyType', e.target.value)}
          className="input-field mt-1"
        >
          <option value="">Any</option>
          {PROPERTY_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Bedrooms */}
      <div>
        <label className="text-sm font-medium text-slate-300">Bedrooms (BHK)</label>
        <div className="flex flex-wrap gap-2 mt-1">
          {BEDROOM_OPTIONS.map((n) => (
            <button
              type="button"
              key={n}
              onClick={() => handleField('bedrooms', String(filters.bedrooms) === String(n) ? '' : n)}
              className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${
                String(filters.bedrooms) === String(n)
                  ? 'bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-600/25'
                  : 'border-surface-600 text-slate-400 hover:border-surface-500 hover:text-slate-300'
              }`}
            >
              {n} BHK
            </button>
          ))}
        </div>
      </div>

      {/* Bathrooms */}
      <div>
        <label className="text-sm font-medium text-slate-300">Bathrooms</label>
        <div className="flex flex-wrap gap-2 mt-1">
          {BATHROOM_OPTIONS.map((n) => (
            <button
              type="button"
              key={n}
              onClick={() => handleField('bathrooms', String(filters.bathrooms) === String(n) ? '' : n)}
              className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${
                String(filters.bathrooms) === String(n)
                  ? 'bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-600/25'
                  : 'border-surface-600 text-slate-400 hover:border-surface-500 hover:text-slate-300'
              }`}
            >
              {n}+
            </button>
          ))}
        </div>
      </div>

      {/* Furnishing status */}
      <div>
        <label className="text-sm font-medium text-slate-300">Furnishing</label>
        <select
          value={filters.furnishingStatus || ''}
          onChange={(e) => handleField('furnishingStatus', e.target.value)}
          className="input-field mt-1"
        >
          <option value="">Any</option>
          {FURNISHING_OPTIONS.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      {/* Sort */}
      <div>
        <label className="text-sm font-medium text-slate-300">Sort By</label>
        <select
          value={filters.sortBy || 'newest'}
          onChange={(e) => handleField('sortBy', e.target.value)}
          className="input-field mt-1"
        >
          <option value="newest">Newest Listings</option>
          <option value="lowest">Lowest Rent</option>
          <option value="highest">Highest Rent</option>
        </select>
      </div>
    </aside>
  );
};

export default FilterSidebar;
