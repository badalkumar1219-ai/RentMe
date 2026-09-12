// pages/PropertyDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiMapPin, FiHeart, FiPhone, FiMail, FiCalendar } from 'react-icons/fi';
import { FaBed, FaBath, FaRulerCombined, FaCouch } from 'react-icons/fa';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import ImageGallery from '../components/ImageGallery';
import LoadingSpinner from '../components/LoadingSpinner';

const PropertyDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/properties/${id}`);
        setProperty(data.data);

        if (user) {
          const favRes = await api.get('/favorites');
          setIsFavorite(favRes.data.data.some((p) => p._id === id));
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Property not found');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, user]);

  const handleSave = async () => {
    if (!user) {
      toast.error('Please login to save this property');
      return;
    }
    try {
      if (isFavorite) {
        await api.delete(`/favorites/${id}`);
        setIsFavorite(false);
        toast.success('Removed from saved properties');
      } else {
        await api.post(`/favorites/${id}`);
        setIsFavorite(true);
        toast.success('Property saved!');
      }
    } catch {
      toast.error('Something went wrong');
    }
  };

  if (loading) return <LoadingSpinner fullScreen />;
  if (error || !property) {
    return (
      <div className="max-w-3xl mx-auto text-center py-24">
        <p className="text-red-400 font-medium">{error || 'Property not found'}</p>
        <Link to="/listings" className="text-primary-400 hover:underline mt-3 inline-block">
          Back to listings
        </Link>
      </div>
    );
  }

  const mapQuery = encodeURIComponent(`${property.location}, ${property.city}`);
  const mapEmbedSrc = `https://maps.google.com/maps?q=${mapQuery}&z=14&output=embed`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <ImageGallery images={property.images} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-8">
        {/* Main details */}
        <div className="lg:col-span-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-semibold bg-primary-900/50 text-primary-300 px-2.5 py-1 rounded-full">
                {property.property_type}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-white mt-3">{property.title}</h1>
              <p className="flex items-center gap-1 text-slate-400 mt-1">
                <FiMapPin /> {property.location}, {property.city}
              </p>
            </div>
            <button
              onClick={handleSave}
              className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium ${
                isFavorite ? 'bg-red-900/20 border-red-900/50 text-red-400' : 'border-surface-700 text-slate-300 hover:bg-surface-700/50'
              }`}
            >
              <FiHeart fill={isFavorite ? 'currentColor' : 'none'} />
              {isFavorite ? 'Saved' : 'Save Property'}
            </button>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <Stat icon={<FaBed />} label="Bedrooms" value={property.bedrooms} />
            <Stat icon={<FaBath />} label="Bathrooms" value={property.bathrooms} />
            <Stat icon={<FaRulerCombined />} label="Area" value={`${property.area} sqft`} />
            <Stat icon={<FaCouch />} label="Furnishing" value={property.furnishing_status} />
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-white mb-2">Description</h2>
            <p className="text-slate-300 leading-relaxed whitespace-pre-line">{property.description}</p>
          </div>

          <div className="mt-8 flex items-center gap-2 text-slate-300">
            <FiCalendar />
            <span>
              Available from{' '}
              <strong className="text-white">{new Date(property.available_from).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>
            </span>
          </div>

          {/* Map */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-white mb-2">Location on Map</h2>
            <div className="rounded-xl overflow-hidden h-72 border border-surface-700/50">
              <iframe
                title="Property location"
                src={mapEmbedSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Sidebar: price + contact */}
        <div>
          <div className="bg-surface-800/80 backdrop-blur-sm rounded-xl border border-surface-700/50 p-6 sticky top-20">
            <p className="text-3xl font-bold text-primary-400">
              ₹{Number(property.rent_price).toLocaleString('en-IN')}
              <span className="text-base font-normal text-slate-400"> /month</span>
            </p>

            <div className="mt-6 border-t border-surface-700 pt-4">
              <h3 className="font-semibold text-white mb-1">Listed by</h3>
              <p className="text-slate-300">{property.owner_id?.name || 'Property Owner'}</p>

              {showContact ? (
                <div className="mt-3 space-y-2 text-sm">
                  <p className="flex items-center gap-2 text-slate-300">
                    <FiPhone /> {property.owner_id?.phone_number || 'Not provided'}
                  </p>
                  <p className="flex items-center gap-2 text-slate-300">
                    <FiMail /> {property.owner_id?.email}
                  </p>
                </div>
              ) : (
                <button
                  onClick={() => {
                    if (!user) {
                      toast.error('Please login to view contact details');
                      return;
                    }
                    setShowContact(true);
                  }}
                  className="btn-primary w-full mt-4"
                >
                  Contact Owner
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Stat = ({ icon, label, value }) => (
  <div className="bg-surface-800/80 backdrop-blur-sm rounded-xl border border-surface-700/50 p-4 flex flex-col items-center text-center gap-1">
    <span className="text-primary-400 text-lg">{icon}</span>
    <span className="font-semibold text-white">{value}</span>
    <span className="text-xs text-slate-400">{label}</span>
  </div>
);

export default PropertyDetails;
