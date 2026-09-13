import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getPropertyById } from '../data/listings';
import PropertyCard from '../components/PropertyCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Favorites = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    try {
      const stored = localStorage.getItem('favoriteIds');
      const favoriteIds = stored ? JSON.parse(stored) : [];
      const loadedProps = favoriteIds.map(id => getPropertyById(id)).filter(Boolean);
      setProperties(loadedProps);
    } catch {
      toast.error('Failed to load saved properties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const toggleFavorite = (propertyId) => {
    try {
      const stored = localStorage.getItem('favoriteIds');
      let favoriteIds = stored ? JSON.parse(stored) : [];
      favoriteIds = favoriteIds.filter(id => id !== propertyId);
      localStorage.setItem('favoriteIds', JSON.stringify(favoriteIds));
      setProperties((prev) => prev.filter((p) => p._id !== propertyId));
      toast.success('Removed from saved properties');
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="section-title mb-6">Saved Properties</h1>
      {loading ? (
        <LoadingSpinner />
      ) : properties.length === 0 ? (
        <p className="text-slate-400 text-center py-16">You haven't saved any properties yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} isFavorite onToggleFavorite={toggleFavorite} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
