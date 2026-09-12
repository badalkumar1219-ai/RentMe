// controllers/userController.js
// User-facing profile helpers beyond what's in authController
// (kept separate to mirror the REST resource /api/users).

const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc    Get a public-safe user profile by id (e.g. to show an owner's name)
// @route   GET /api/users/:id
// @access  Public
const getUserPublicProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('name role created_at');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json({ success: true, data: user });
});

module.exports = { getUserPublicProfile };
