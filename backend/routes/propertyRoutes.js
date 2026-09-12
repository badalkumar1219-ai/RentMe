// routes/propertyRoutes.js
const express = require('express');
const router = express.Router();
const {
  getProperties,
  getFeaturedProperties,
  getPopularLocations,
  getPropertyById,
  createProperty,
  updateProperty,
  deletePropertyImage,
  deleteProperty,
  getMyProperties,
} = require('../controllers/propertyController');
const { protect, authorize } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

// Public routes
router.get('/', getProperties);
router.get('/featured', getFeaturedProperties);
router.get('/popular-locations', getPopularLocations);

// Owner: list their own properties (must be before /:id so "owner" isn't read as an id)
router.get('/owner/mine', protect, authorize('owner', 'admin'), getMyProperties);

router.get('/:id', getPropertyById);

// Owner/Admin routes (with image upload, up to 10 images)
router.post('/', protect, authorize('owner', 'admin'), upload.array('images', 10), createProperty);
router.put('/:id', protect, authorize('owner', 'admin'), upload.array('images', 10), updateProperty);
router.delete('/:id', protect, authorize('owner', 'admin'), deleteProperty);
router.delete('/:id/images/:imageId', protect, authorize('owner', 'admin'), deletePropertyImage);

module.exports = router;
