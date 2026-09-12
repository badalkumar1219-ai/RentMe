// config/db.js
// Handles the connection to our MongoDB database using Mongoose.

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/User');
const Property = require('../models/Property');

const seedDefaultUsers = async () => {
  const userCount = await User.countDocuments();
  if (userCount > 0) return;

  const defaultUsers = [
    {
      name: 'Admin User',
      email: 'admin@homenest.com',
      password: 'admin123',
      phone_number: '9999999999',
      role: 'admin',
    },
    {
      name: 'Badal Kumar',
      email: 'owner@homenest.com',
      password: 'owner123',
      phone_number: '9876543210',
      role: 'owner',
    },
    {
      name: 'Priya Sharma',
      email: 'tenant@homenest.com',
      password: 'tenant123',
      phone_number: '9123456780',
      role: 'tenant',
    },
  ];

  await Promise.all(defaultUsers.map((user) => User.create(user)));
  console.log('✅ Seeded default demo users');
};

const seedDefaultProperties = async () => {
  const propertyCount = await Property.countDocuments();
  if (propertyCount > 0) return;

  const owner = await User.findOne({ email: 'owner@homenest.com' });
  if (!owner) return;

  const sampleImage = 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=60';

  const sampleProperties = [
    {
      title: 'Modern 2BHK Apartment in Koramangala',
      description: 'A bright 2BHK apartment near cafés, parks, and metro connectivity, ideal for professionals and small families.',
      rent_price: 28000,
      location: 'Koramangala 5th Block',
      city: 'Bengaluru',
      property_type: 'Apartment',
      bedrooms: 2,
      bathrooms: 2,
      area: 1100,
      furnishing_status: 'Semi-Furnished',
      available_from: new Date(),
      images: [{ image_url: sampleImage }],
      owner_id: owner._id,
      status: 'approved',
      isActive: true,
    },
    {
      title: 'Luxury Villa with Private Garden',
      description: 'Premium villa with landscaped garden, covered parking, and 24/7 security in a gated residential zone.',
      rent_price: 75000,
      location: 'Whitefield',
      city: 'Bengaluru',
      property_type: 'Villa',
      bedrooms: 4,
      bathrooms: 4,
      area: 2800,
      furnishing_status: 'Furnished',
      available_from: new Date(),
      images: [{ image_url: sampleImage }],
      owner_id: owner._id,
      status: 'approved',
      isActive: true,
    },
    {
      title: 'Budget PG for Working Professionals',
      description: 'Comfortable and affordable room with WiFi, meals, housekeeping, and easy commute access.',
      rent_price: 9000,
      location: 'HSR Layout',
      city: 'Bengaluru',
      property_type: 'PG',
      bedrooms: 1,
      bathrooms: 1,
      area: 180,
      furnishing_status: 'Furnished',
      available_from: new Date(),
      images: [{ image_url: sampleImage }],
      owner_id: owner._id,
      status: 'approved',
      isActive: true,
    },
    {
      title: 'Independent House near IT Park',
      description: 'Spacious family home with a backyard, parking space, and peaceful surroundings close to the office hub.',
      rent_price: 42000,
      location: 'Hinjewadi Phase 2',
      city: 'Pune',
      property_type: 'Independent House',
      bedrooms: 3,
      bathrooms: 3,
      area: 1800,
      furnishing_status: 'Unfurnished',
      available_from: new Date(),
      images: [{ image_url: sampleImage }],
      owner_id: owner._id,
      status: 'approved',
      isActive: true,
    },
    {
      title: 'Single Room for Rent near University',
      description: 'Affordable room option for students with shared kitchen, bathroom facilities, and a convenient location.',
      rent_price: 6000,
      location: 'Kothrud',
      city: 'Pune',
      property_type: 'Room',
      bedrooms: 1,
      bathrooms: 1,
      area: 120,
      furnishing_status: 'Semi-Furnished',
      available_from: new Date(),
      images: [{ image_url: sampleImage }],
      owner_id: owner._id,
      status: 'approved',
      isActive: true,
    },
    {
      title: 'Premium 3BHK with City View',
      description: 'Modern apartment with city skyline views, a swimming pool, gym, and clubhouse amenities.',
      rent_price: 55000,
      location: 'Powai',
      city: 'Mumbai',
      property_type: 'Apartment',
      bedrooms: 3,
      bathrooms: 3,
      area: 1600,
      furnishing_status: 'Furnished',
      available_from: new Date(),
      images: [{ image_url: sampleImage }],
      owner_id: owner._id,
      status: 'approved',
      isActive: true,
    },
  ];

  await Property.insertMany(sampleProperties);
  console.log('✅ Seeded default demo properties');
};

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      const mongoMemoryServer = await MongoMemoryServer.create();
      mongoUri = mongoMemoryServer.getUri();
      console.log('ℹ️ No MONGO_URI found. Using in-memory MongoDB for local development.');
    }

    const conn = await mongoose.connect(mongoUri);
    await seedDefaultUsers();
    await seedDefaultProperties();
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
