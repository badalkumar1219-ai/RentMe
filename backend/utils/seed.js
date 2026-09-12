// utils/seed.js
// Optional helper script to populate the database with sample data
// for local development/testing.
// Run with: node utils/seed.js

const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('../config/db');
const User = require('../models/User');
const Property = require('../models/Property');
const Favorite = require('../models/Favorite');

const SAMPLE_IMAGE = 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=60';

const seed = async () => {
  await connectDB();

  console.log('🧹 Clearing existing data...');
  await Promise.all([User.deleteMany(), Property.deleteMany(), Favorite.deleteMany()]);

  console.log('👤 Creating users...');
  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@homenest.com',
    password: 'admin123',
    phone_number: '9999999999',
    role: 'admin',
  });

  const owner = await User.create({
    name: 'Badal Kumar',
    email: 'owner@homenest.com',
    password: 'owner123',
    phone_number: '9876543210',
    role: 'owner',
  });

  const tenant = await User.create({
    name: 'Priya Sharma',
    email: 'tenant@homenest.com',
    password: 'tenant123',
    phone_number: '9123456780',
    role: 'tenant',
  });

  console.log('🏠 Creating 6 sample listings owned by Badal Kumar...');
  const samples = [
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
    },
  ];

  const properties = await Property.insertMany(
    samples.map((s) => ({
      ...s,
      owner_id: owner._id,
      images: [{ image_url: SAMPLE_IMAGE }],
      available_from: new Date(),
    }))
  );

  console.log('❤️ Creating a sample favorite...');
  await Favorite.create({ user_id: tenant._id, property_id: properties[0]._id });

  console.log('✅ Seed complete!');
  console.log('   Admin login:  admin@homenest.com  / admin123');
  console.log('   Owner login:  owner@homenest.com  / owner123');
  console.log('   Tenant login: tenant@homenest.com / tenant123');
  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
