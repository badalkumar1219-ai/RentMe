// controllers/adminController.js
// Admin-only operations: manage users and moderate property listings.

const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Property = require('../models/Property');
const { cloudinary } = require('../config/cloudinary');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (admin)
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ created_at: -1 });
  res.json({ success: true, count: users.length, data: users });
});

// @desc    Activate/Deactivate a user
// @route   PUT /api/admin/users/:id/status
// @access  Private (admin)
const setUserStatus = asyncHandler(async (req, res) => {
  const { isActive } = req.body;
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  if (user.role === 'admin') {
    res.status(400);
    throw new Error('Cannot modify another admin account');
  }

  user.isActive = isActive;
  await user.save();
  res.json({ success: true, data: user });
});

// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
// @access  Private (admin)
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  if (user.role === 'admin') {
    res.status(400);
    throw new Error('Cannot delete another admin account');
  }

  await user.deleteOne();
  res.json({ success: true, message: 'User deleted successfully' });
});

// @desc    Get all properties (any status) for moderation
// @route   GET /api/admin/properties
// @access  Private (admin)
const getAllPropertiesAdmin = asyncHandler(async (req, res) => {
  const properties = await Property.find()
    .populate('owner_id', 'name email')
    .sort({ created_at: -1 });
  res.json({ success: true, count: properties.length, data: properties });
});

// @desc    Approve or reject a property listing
// @route   PUT /api/admin/properties/:id/status
// @access  Private (admin)
const setPropertyStatus = asyncHandler(async (req, res) => {
  const { status } = req.body; // 'approved' | 'rejected' | 'pending'
  const property = await Property.findById(req.params.id);

  if (!property) {
    res.status(404);
    throw new Error('Property not found');
  }

  property.status = status;
  await property.save();
  res.json({ success: true, data: property });
});

// @desc    Remove/delete an inappropriate property listing
// @route   DELETE /api/admin/properties/:id
// @access  Private (admin)
const removeProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) {
    res.status(404);
    throw new Error('Property not found');
  }

  await Promise.all(
    property.images.map((img) =>
      img.public_id ? cloudinary.uploader.destroy(img.public_id).catch(() => {}) : null
    )
  );

  await property.deleteOne();
  res.json({ success: true, message: 'Property removed successfully' });
});

module.exports = {
  getAllUsers,
  setUserStatus,
  deleteUser,
  getAllPropertiesAdmin,
  setPropertyStatus,
  removeProperty,
};
