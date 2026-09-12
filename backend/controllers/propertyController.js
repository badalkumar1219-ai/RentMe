// controllers/propertyController.js
// CRUD + search/filter logic for properties.

const asyncHandler = require('express-async-handler');
const Property = require('../models/Property');
const { cloudinary } = require('../config/cloudinary');

// @desc    Get all properties with search, filters, sort & pagination
// @route   GET /api/properties
// @access  Public
// Supported query params:
//   location, city, propertyType, minRent, maxRent, bedrooms, bathrooms,
//   furnishingStatus, sortBy (lowest|highest|newest), page, limit
const getProperties = asyncHandler(async (req, res) => {
  const {
    location,
    city,
    propertyType,
    minRent,
    maxRent,
    bedrooms,
    bathrooms,
    furnishingStatus,
    sortBy,
    page = 1,
    limit = 9,
  } = req.query;

  const query = { isActive: true, status: 'approved' };

  if (location) {
    // Search across location + city + title
    query.$or = [
      { location: { $regex: location, $options: 'i' } },
      { city: { $regex: location, $options: 'i' } },
      { title: { $regex: location, $options: 'i' } },
    ];
  }

  if (city) query.city = { $regex: city, $options: 'i' };
  if (propertyType) query.property_type = propertyType;
  if (bedrooms) query.bedrooms = Number(bedrooms);
  if (bathrooms) query.bathrooms = Number(bathrooms);
  if (furnishingStatus) query.furnishing_status = furnishingStatus;

  if (minRent || maxRent) {
    query.rent_price = {};
    if (minRent) query.rent_price.$gte = Number(minRent);
    if (maxRent) query.rent_price.$lte = Number(maxRent);
  }

  let sort = { created_at: -1 }; // newest first, by default
  if (sortBy === 'lowest') sort = { rent_price: 1 };
  if (sortBy === 'highest') sort = { rent_price: -1 };
  if (sortBy === 'newest') sort = { created_at: -1 };

  const pageNum = Math.max(Number(page), 1);
  const limitNum = Math.max(Number(limit), 1);
  const skip = (pageNum - 1) * limitNum;

  const [properties, total] = await Promise.all([
    Property.find(query)
      .populate('owner_id', 'name email phone_number')
      .sort(sort)
      .skip(skip)
      .limit(limitNum),
    Property.countDocuments(query),
  ]);

  res.json({
    success: true,
    count: properties.length,
    total,
    totalPages: Math.ceil(total / limitNum),
    currentPage: pageNum,
    data: properties,
  });
});

// @desc    Get a handful of featured properties for the homepage
// @route   GET /api/properties/featured
// @access  Public
const getFeaturedProperties = asyncHandler(async (req, res) => {
  const properties = await Property.find({ isActive: true, status: 'approved' })
    .sort({ created_at: -1 })
    .limit(6)
    .populate('owner_id', 'name');

  res.json({ success: true, data: properties });
});

// @desc    Get list of popular locations (distinct cities + counts)
// @route   GET /api/properties/popular-locations
// @access  Public
const getPopularLocations = asyncHandler(async (req, res) => {
  const locations = await Property.aggregate([
    { $match: { isActive: true, status: 'approved' } },
    { $group: { _id: '$city', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 8 },
  ]);

  res.json({
    success: true,
    data: locations.map((l) => ({ city: l._id, count: l.count })),
  });
});

// @desc    Get single property by id
// @route   GET /api/properties/:id
// @access  Public
const getPropertyById = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id).populate(
    'owner_id',
    'name email phone_number'
  );

  if (!property) {
    res.status(404);
    throw new Error('Property not found');
  }

  res.json({ success: true, data: property });
});

// @desc    Create a new property listing
// @route   POST /api/properties
// @access  Private (owner, admin)
const createProperty = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    rent_price,
    location,
    city,
    property_type,
    bedrooms,
    bathrooms,
    area,
    furnishing_status,
    available_from,
    latitude,
    longitude,
  } = req.body;

  // req.files comes from the multer/cloudinary middleware (field name: "images")
  const images = (req.files || []).map((file) => ({
    image_url: file.path, // secure_url returned by Cloudinary storage engine
    public_id: file.filename,
  }));

  const property = await Property.create({
    title,
    description,
    rent_price,
    location,
    city,
    property_type,
    bedrooms,
    bathrooms,
    area,
    furnishing_status,
    available_from,
    latitude,
    longitude,
    images,
    owner_id: req.user._id,
  });

  res.status(201).json({ success: true, data: property });
});

// @desc    Update a property (owner of the property, or admin)
// @route   PUT /api/properties/:id
// @access  Private (owner, admin)
const updateProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    res.status(404);
    throw new Error('Property not found');
  }

  const isOwner = property.owner_id.toString() === req.user._id.toString();
  if (!isOwner && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('You are not authorized to update this property');
  }

  const fields = [
    'title',
    'description',
    'rent_price',
    'location',
    'city',
    'property_type',
    'bedrooms',
    'bathrooms',
    'area',
    'furnishing_status',
    'available_from',
    'latitude',
    'longitude',
  ];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) property[field] = req.body[field];
  });

  // Append any newly uploaded images
  if (req.files && req.files.length > 0) {
    const newImages = req.files.map((file) => ({
      image_url: file.path,
      public_id: file.filename,
    }));
    property.images.push(...newImages);
  }

  const updated = await property.save();
  res.json({ success: true, data: updated });
});

// @desc    Delete a single image from a property
// @route   DELETE /api/properties/:id/images/:imageId
// @access  Private (owner, admin)
const deletePropertyImage = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) {
    res.status(404);
    throw new Error('Property not found');
  }

  const isOwner = property.owner_id.toString() === req.user._id.toString();
  if (!isOwner && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('You are not authorized to modify this property');
  }

  const image = property.images.id(req.params.imageId);
  if (!image) {
    res.status(404);
    throw new Error('Image not found');
  }

  if (image.public_id) {
    await cloudinary.uploader.destroy(image.public_id).catch(() => {});
  }
  image.deleteOne();
  await property.save();

  res.json({ success: true, data: property });
});

// @desc    Delete a property (and its Cloudinary images)
// @route   DELETE /api/properties/:id
// @access  Private (owner, admin)
const deleteProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    res.status(404);
    throw new Error('Property not found');
  }

  const isOwner = property.owner_id.toString() === req.user._id.toString();
  if (!isOwner && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('You are not authorized to delete this property');
  }

  // Clean up images from Cloudinary
  await Promise.all(
    property.images.map((img) =>
      img.public_id ? cloudinary.uploader.destroy(img.public_id).catch(() => {}) : null
    )
  );

  await property.deleteOne();
  res.json({ success: true, message: 'Property deleted successfully' });
});

// @desc    Get properties belonging to the logged-in owner
// @route   GET /api/properties/owner/mine
// @access  Private (owner)
const getMyProperties = asyncHandler(async (req, res) => {
  const properties = await Property.find({ owner_id: req.user._id }).sort({ created_at: -1 });
  res.json({ success: true, count: properties.length, data: properties });
});

module.exports = {
  getProperties,
  getFeaturedProperties,
  getPopularLocations,
  getPropertyById,
  createProperty,
  updateProperty,
  deletePropertyImage,
  deleteProperty,
  getMyProperties,
};
