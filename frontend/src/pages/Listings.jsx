import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { filterProperties } from '../data/listings';
import PropertyCard from '../components/PropertyCard';
import FilterSidebar from '../components/FilterSidebar';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Listings = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  const initialFilters = useMemo(
    () => ({
      location: searchParams.get('location') || '',
      propertyType: searchParams.get('propertyType') || '',
      minRent: searchParams.get('minRent') || '',
      maxRent: searchParams.get('maxRent') || '',
      bedrooms: searchParams.get('bedrooms') || '',
      bathrooms: searchParams.get('bathrooms') || '',
      furnishingStatus: searchParams.get('furnishingStatus') || '',
      sortBy: searchParams.get('sortBy') || 'newest',
    }),
    []
  );

  const [filters, setFilters] = useState(initialFilters);
  const [properties, setProperties] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProperties = useCallback(() => {
    setLoading(true);
    setError('');
    try {
      const results = filterProperties(filters);
      setProperties(results);
      setTotalPages(1);
    } catch (err) {
      setError('Failed to load properties');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const timer = setTimeout(fetchProperties, 350);
    return () => clearTimeout(timer);
  }, [fetchProperties]);

  useEffect(() => {
    if (!user) return;
    try {
      const stored = localStorage.getItem('favoriteIds');
      if (stored) {
        setFavoriteIds(new Set(JSON.parse(stored)));
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  const handleFiltersChange = (next) => {
    setPage(1);
    setFilters(next);
  };

  const handleReset = () => {
    setPage(1);
    setFilters({
      location: '',
      propertyType: '',
      minRent: '',
      maxRent: '',
      bedrooms: '',
      bathrooms: '',
      furnishingStatus: '',
      sortBy: 'newest',
    });
  };

  const toggleFavorite = async (propertyId) => {
    if (!user) {
      toast.error('Please login to save properties');
      return;
    }
    const isFav = favoriteIds.has(propertyId);
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (isFav) {
        next.delete(propertyId);
        toast.success('Removed from favorites');
      } else {
        next.add(propertyId);
        toast.success('Saved to favorites');
      }
      localStorage.setItem('favoriteIds', JSON.stringify(Array.from(next)));
      return next;
    });
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-12 md:py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10 animate-slide-up">
        <div>
          <p className="text-primary-400 font-bold text-xs uppercase tracking-[0.22em] mb-3">The RentMe collection</p>
          <h1 className="section-title">Browse Rental Properties</h1>
          <p className="text-slate-500 mt-3 max-w-xl">Thoughtfully listed homes, apartments, and rooms for the way you want to live.</p>
        </div>
        <div className="bg-primary-500/10 text-primary-400 border border-primary-500/20 rounded-full px-4 py-2 text-sm font-semibold w-fit">Live listings, updated daily</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-8 lg:gap-10">
        <div className="lg:col-span-1">
          <FilterSidebar filters={filters} onChange={handleFiltersChange} onReset={handleReset} />
        </div>

        <div className="lg:col-span-3">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <p className="text-red-400 text-center py-10">{error}</p>
          ) : properties.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <p className="text-lg font-medium">No properties match your filters.</p>
              <p className="text-sm mt-1">Try adjusting your search criteria.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7">
                {properties.map((property) => (
                  <PropertyCard
                    key={property._id}
                    property={property}
                    isFavorite={favoriteIds.has(property._id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-10">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="btn-secondary disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-slate-400">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="btn-secondary disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Listings;
