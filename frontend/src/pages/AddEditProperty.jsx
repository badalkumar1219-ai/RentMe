// pages/AddEditProperty.jsx
// A single form used both for adding a new property and editing an
// existing one (mode is decided by whether :id is present in the route).

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';

const PROPERTY_TYPES = ['Apartment', 'Independent House', 'Villa', 'PG', 'Room'];
const FURNISHING_OPTIONS = ['Furnished', 'Semi-Furnished', 'Unfurnished'];

const emptyForm = {
  title: '',
  description: '',
  rent_price: '',
  location: '',
  city: '',
  property_type: 'Apartment',
  bedrooms: 1,
  bathrooms: 1,
  area: '',
  furnishing_status: 'Unfurnished',
  available_from: '',
};

const AddEditProperty = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    const load = async () => {
      try {
        const { data } = await api.get(`/properties/${id}`);
        const p = data.data;
        setForm({
          title: p.title,
          description: p.description,
          rent_price: p.rent_price,
          location: p.location,
          city: p.city,
          property_type: p.property_type,
          bedrooms: p.bedrooms,
          bathrooms: p.bathrooms,
          area: p.area,
          furnishing_status: p.furnishing_status,
          available_from: p.available_from ? p.available_from.slice(0, 10) : '',
        });
        setExistingImages(p.images || []);
      } catch {
        toast.error('Failed to load property');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, isEdit]);

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.description.trim()) errs.description = 'Description is required';
    if (!form.rent_price || form.rent_price <= 0) errs.rent_price = 'Enter a valid rent price';
    if (!form.location.trim()) errs.location = 'Location is required';
    if (!form.city.trim()) errs.city = 'City is required';
    if (!form.area || form.area <= 0) errs.area = 'Enter a valid area';
    if (!isEdit && newImages.length === 0) errs.images = 'Please upload at least one image';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 10);
    setNewImages(files);
  };

  const removeExistingImage = async (imageId) => {
    if (!window.confirm('Remove this image?')) return;
    try {
      await api.delete(`/properties/${id}/images/${imageId}`);
      setExistingImages((prev) => prev.filter((img) => img._id !== imageId));
    } catch {
      toast.error('Failed to remove image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      newImages.forEach((file) => formData.append('images', file));

      if (isEdit) {
        await api.put(`/properties/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Property updated successfully');
      } else {
        await api.post('/properties', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Property listed successfully');
      }
      navigate('/owner/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save property');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="section-title mb-6">{isEdit ? 'Edit Property' : 'List a New Property'}</h1>

      <form onSubmit={handleSubmit} className="bg-surface-800/80 backdrop-blur-sm rounded-2xl border border-surface-700/50 p-8 space-y-5">
        <div>
          <label className="text-sm font-medium text-slate-300">Property Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="input-field mt-1"
            placeholder="e.g. Spacious 2BHK near City Center"
          />
          {errors.title && <p className="text-xs text-red-400 mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-300">Description</label>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="input-field mt-1"
            placeholder="Describe the property, amenities, nearby landmarks..."
          />
          {errors.description && <p className="text-xs text-red-400 mt-1">{errors.description}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-300">Monthly Rent (₹)</label>
            <input
              type="number"
              min="0"
              value={form.rent_price}
              onChange={(e) => setForm({ ...form, rent_price: e.target.value })}
              className="input-field mt-1"
            />
            {errors.rent_price && <p className="text-xs text-red-400 mt-1">{errors.rent_price}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Area (sqft)</label>
            <input
              type="number"
              min="0"
              value={form.area}
              onChange={(e) => setForm({ ...form, area: e.target.value })}
              className="input-field mt-1"
            />
            {errors.area && <p className="text-xs text-red-400 mt-1">{errors.area}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-300">Location / Locality</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="input-field mt-1"
              placeholder="e.g. Koramangala 5th Block"
            />
            {errors.location && <p className="text-xs text-red-400 mt-1">{errors.location}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">City</label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="input-field mt-1"
              placeholder="e.g. Bengaluru"
            />
            {errors.city && <p className="text-xs text-red-400 mt-1">{errors.city}</p>}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-300">Property Type</label>
            <select
              value={form.property_type}
              onChange={(e) => setForm({ ...form, property_type: e.target.value })}
              className="input-field mt-1"
            >
              {PROPERTY_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Bedrooms</label>
            <input
              type="number"
              min="0"
              value={form.bedrooms}
              onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
              className="input-field mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Bathrooms</label>
            <input
              type="number"
              min="0"
              value={form.bathrooms}
              onChange={(e) => setForm({ ...form, bathrooms: e.target.value })}
              className="input-field mt-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-300">Furnishing Status</label>
            <select
              value={form.furnishing_status}
              onChange={(e) => setForm({ ...form, furnishing_status: e.target.value })}
              className="input-field mt-1"
            >
              {FURNISHING_OPTIONS.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Available From</label>
            <input
              type="date"
              value={form.available_from}
              onChange={(e) => setForm({ ...form, available_from: e.target.value })}
              className="input-field mt-1"
            />
          </div>
        </div>

        {/* Existing images (edit mode only) */}
        {isEdit && existingImages.length > 0 && (
          <div>
            <label className="text-sm font-medium text-slate-300">Current Images</label>
            <div className="flex flex-wrap gap-3 mt-2">
              {existingImages.map((img) => (
                <div key={img._id} className="relative">
                  <img src={img.image_url} alt="Property" className="w-20 h-20 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(img._id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="text-sm font-medium text-slate-300">
            {isEdit ? 'Add More Images' : 'Upload Images'} (up to 10)
          </label>
          <input type="file" accept="image/*" multiple onChange={handleImageChange} className="input-field mt-1" />
          {errors.images && <p className="text-xs text-red-400 mt-1">{errors.images}</p>}
          {newImages.length > 0 && <p className="text-xs text-slate-400 mt-1">{newImages.length} file(s) selected</p>}
        </div>

        <button type="submit" disabled={submitting} className="btn-primary w-full">
          {submitting ? 'Saving...' : isEdit ? 'Update Property' : 'List Property'}
        </button>
      </form>
    </div>
  );
};

export default AddEditProperty;
