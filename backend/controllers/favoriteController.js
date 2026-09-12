// controllers/favoriteController.js
// Lets tenants (or any logged-in user) save/unsave properties, and
// view their saved list.

const asyncHandler = require('express-async-handler');
const Favorite = require('../models/Favorite');
const Property = require('../models/Property');

// @desc    Add a property to favorites
// @route   POST /api/favorites/:propertyId
// @access  Private
const addFavorite = asyncHandler(async (req, res) => {
  const { propertyId } = req.params;

  const property = await Property.findById(propertyId);
  if (!property) {
    res.status(404);
    throw new Error('Property not found');
  }

  const existing = await Favorite.findOne({ user_id: req.user._id, property_id: propertyId });
  if (existing) {
    return res.json({ success: true, message: 'Already in favorites', data: existing });
  }

  const favorite = await Favorite.create({ user_id: req.user._id, property_id: propertyId });
  res.status(201).json({ success: true, data: favorite });
});

// @desc    Remove a property from favorites
// @route   DELETE /api/favorites/:propertyId
// @access  Private
const removeFavorite = asyncHandler(async (req, res) => {
  const { propertyId } = req.params;
  await Favorite.findOneAndDelete({ user_id: req.user._id, property_id: propertyId });
  res.json({ success: true, message: 'Removed from favorites' });
});

// @desc    Get the logged-in user's favorite properties
// @route   GET /api/favorites
// @access  Private
const getMyFavorites = asyncHandler(async (req, res) => {
  const favorites = await Favorite.find({ user_id: req.user._id }).populate({
    path: 'property_id',
    populate: { path: 'owner_id', select: 'name email phone_number' },
  });

  // Filter out favorites whose property may have been deleted
  const data = favorites.filter((f) => f.property_id).map((f) => f.property_id);

  res.json({ success: true, count: data.length, data });
});

module.exports = { addFavorite, removeFavorite, getMyFavorites };
