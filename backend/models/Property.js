// models/Property.js
// Defines the Property schema. Images are stored as an embedded array
// of { image_url, public_id } (this covers the "Property Images" table
// from the spec, embedded for simpler reads instead of a join).

const mongoose = require('mongoose');

const propertyImageSchema = new mongoose.Schema(
  {
    image_url: { type: String, required: true },
    public_id: { type: String }, // Cloudinary id, needed to delete the image later
  },
  { _id: true }
);

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Property title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    rent_price: {
      type: Number,
      required: [true, 'Rent price is required'],
      min: 0,
    },
    location: {
      type: String, // full address / locality
      required: [true, 'Location is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    latitude: { type: Number },
    longitude: { type: Number },
    property_type: {
      type: String,
      enum: ['Apartment', 'Independent House', 'Villa', 'PG', 'Room'],
      required: true,
    },
    bedrooms: { type: Number, required: true, min: 0 },
    bathrooms: { type: Number, required: true, min: 0 },
    area: {
      type: Number, // square feet
      required: true,
      min: 0,
    },
    furnishing_status: {
      type: String,
      enum: ['Furnished', 'Semi-Furnished', 'Unfurnished'],
      default: 'Unfurnished',
    },
    available_from: {
      type: Date,
      default: Date.now,
    },
    images: [propertyImageSchema],
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'approved', // set to 'pending' if you want admin approval before going live
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

// Useful text index for searching by title/location/city
propertySchema.index({ title: 'text', location: 'text', city: 'text' });

module.exports = mongoose.model('Property', propertySchema);
