import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiMapPin, FiHome, FiUsers, FiStar } from 'react-icons/fi';
import { getFeaturedProperties, getPopularLocations } from '../data/listings';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import LoadingSpinner from '../components/LoadingSpinner';

const STATS = [
  { icon: FiHome, value: '500+', label: 'Properties', color: 'text-emerald-400' },
  { icon: FiUsers, value: '1,200+', label: 'Happy Tenants', color: 'text-amber-400' },
  { icon: FiMapPin, value: '50+', label: 'Cities', color: 'text-rose-400' },
  { icon: FiStar, value: '4.8', label: 'Avg Rating', color: 'text-yellow-400' },
];

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setFeatured(getFeaturedProperties());
    setLocations(getPopularLocations());
    setLoading(false);
  }, []);

  return (
    <div>
      <section className="relative overflow-hidden min-h-[700px] flex items-center bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85')" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-surface-900/95 via-surface-900/70 to-surface-900/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-900 via-transparent to-transparent" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-emerald-500/8 blur-3xl animate-pulse-soft" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-rose-500/8 blur-3xl animate-float" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full border border-amber-500/10 animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 rounded-full bg-primary-400/5 blur-2xl animate-pulse-soft" style={{ animationDelay: '1.5s' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 w-full flex flex-col items-center text-center">
          <p className="text-emerald-400 text-sm font-bold uppercase tracking-[0.25em] animate-fade-in">Find a place that feels like yours</p>
          <h1 className="font-display text-5xl md:text-7xl text-white max-w-4xl leading-[1.02] text-balance mt-4 animate-slide-up">
            Find Your Perfect <span className="gradient-text">Rental Home</span>
          </h1>
          <p className="text-slate-400 mt-5 max-w-2xl text-base md:text-lg animate-slide-up delay-150">
            Search apartments, villas, independent houses, PGs and rooms — all in one place.
          </p>
          <div className="mt-8 w-full flex justify-center">
            <SearchBar />
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 animate-slide-up delay-300">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <stat.icon className={`${stat.color} mb-1`} size={22} />
                <span className="text-2xl font-extrabold text-white">{stat.value}</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-primary-400 font-bold text-sm uppercase tracking-widest mb-2">Curated for you</p>
            <h2 className="section-title">Featured Rental Properties</h2>
          </div>
          <Link to="/listings" className="text-primary-400 font-medium flex items-center gap-1 hover:text-primary-300 transition-colors">
            View all <FiArrowRight />
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : featured.length === 0 ? (
          <p className="text-slate-500">No properties listed yet. Check back soon!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </section>

      {locations.length > 0 && (
        <section className="bg-surface-800/50 py-16 border-y border-surface-700/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-primary-400 font-bold text-sm uppercase tracking-widest mb-2">Explore the neighbourhood</p>
            <h2 className="section-title mb-8">Popular Locations</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {locations.map((loc) => (
                <Link
                  key={loc.city}
                  to={`/listings?location=${encodeURIComponent(loc.city)}`}
                  className="glass-panel p-5 hover:border-primary-500/30 hover:-translate-y-1 transition-all flex flex-col items-start gap-2"
                >
                  <FiMapPin className="text-primary-400" size={22} />
                  <span className="font-semibold text-white">{loc.city}</span>
                  <span className="text-xs text-slate-500">{loc.count} properties</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/50 via-surface-900 to-accent-900/30" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-display text-white">Have a property to rent out?</h2>
          <p className="text-slate-400 mt-3 max-w-xl mx-auto">
            List your property on RentMe and connect with thousands of verified tenants looking for a place to call home.
          </p>
          <Link
            to="/register"
            className="inline-block mt-6 bg-gradient-to-r from-primary-600 to-accent-500 text-white font-bold px-8 py-3.5 rounded-xl hover:shadow-lg hover:shadow-primary-500/30 hover:-translate-y-0.5 transition-all"
          >
            List Your Property
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
