// components/PropertyCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiHeart } from 'react-icons/fi';
import { BsDoorOpen } from 'react-icons/bs';
import { FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=60';

const PropertyCard = ({ property, isFavorite, onToggleFavorite }) => {
  const image = property.images && property.images.length > 0 ? property.images[0].image_url : PLACEHOLDER;

  return (
    <div className="card animate-fade-in group">
      <div className="relative">
        <Link to={`/property/${property._id}`}>
          <img
            src={image}
            alt={property.title}
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-900/60 to-transparent" />
        </Link>
        <span className="absolute top-3 left-3 bg-primary-600/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur">
          {property.property_type}
        </span>
        {onToggleFavorite && (
          <button
            onClick={() => onToggleFavorite(property._id)}
            className={`absolute top-3 right-3 p-2 rounded-full bg-surface-800/80 backdrop-blur shadow hover:scale-110 transition-all ${
              isFavorite ? 'text-red-400' : 'text-slate-400'
            }`}
            title="Save property"
          >
            <FiHeart fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/property/${property._id}`}>
            <h3 className="font-bold text-white line-clamp-1 hover:text-primary-400 transition-colors">{property.title}</h3>
          </Link>
        </div>

        <p className="flex items-center gap-1 text-slate-500 text-sm mt-1">
          <FiMapPin size={14} className="text-primary-500" /> {property.location}, {property.city}
        </p>

        <p className="text-primary-400 font-bold text-lg mt-2">
          ₹{Number(property.rent_price).toLocaleString('en-IN')}
          <span className="text-sm font-normal text-slate-500"> /month</span>
        </p>

        <div className="flex items-center gap-4 text-slate-400 text-sm mt-3 border-t border-surface-700/50 pt-3">
          <span className="flex items-center gap-1"><FaBed /> {property.bedrooms} Bed</span>
          <span className="flex items-center gap-1"><FaBath /> {property.bathrooms} Bath</span>
          <span className="flex items-center gap-1"><FaRulerCombined /> {property.area} sqft</span>
        </div>

        <p className="text-slate-500 text-sm mt-3 line-clamp-2">{property.description}</p>

        <Link
          to={`/property/${property._id}`}
          className="btn-primary w-full mt-4 flex items-center justify-center gap-2 text-sm"
        >
          <BsDoorOpen /> View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
