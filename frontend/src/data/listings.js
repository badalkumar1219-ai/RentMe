// data/listings.js
// Static property and user data for the RentMe app.
// Replaces all MongoDB/API dependencies for property listings.

const SAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=60',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=60',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=60',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=60',
  'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=60',
  'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=60',
];

export const DEMO_USERS = [
  {
    _id: 'user-1',
    name: 'Admin User',
    email: 'admin@rentme.com',
    phone_number: '9999999999',
    role: 'admin',
    isActive: true,
  },
  {
    _id: 'user-2',
    name: 'Badal Kumar',
    email: 'owner@rentme.com',
    phone_number: '9876543210',
    role: 'owner',
    isActive: true,
  },
  {
    _id: 'user-3',
    name: 'Priya Sharma',
    email: 'tenant@rentme.com',
    phone_number: '9123456780',
    role: 'tenant',
    isActive: true,
  },
];

// Plaintext passwords for demo login (no backend needed)
export const DEMO_PASSWORDS = {
  'admin@rentme.com': 'admin123',
  'owner@rentme.com': 'owner123',
  'tenant@rentme.com': 'tenant123',
};

const OWNER = { _id: 'user-2', name: 'Badal Kumar', email: 'owner@rentme.com', phone_number: '9876543210' };

export const PROPERTIES = [
  {
    _id: 'prop-1',
    title: 'Modern 2BHK Apartment in Koramangala',
    description: 'A bright 2BHK apartment near cafés, parks, and metro connectivity, ideal for professionals and small families. Features modern interiors, 24/7 water supply, power backup, and access to a community gym.',
    rent_price: 28000,
    location: 'Koramangala 5th Block',
    city: 'Bengaluru',
    property_type: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    furnishing_status: 'Semi-Furnished',
    available_from: new Date().toISOString(),
    images: [{ _id: 'img-1', image_url: SAMPLE_IMAGES[0] }],
    owner_id: OWNER,
    status: 'approved',
    isActive: true,
    created_at: '2025-06-01T10:00:00.000Z',
  },
  {
    _id: 'prop-2',
    title: 'Luxury Villa with Private Garden',
    description: 'Premium villa with landscaped garden, covered parking, and 24/7 security in a gated residential zone. Includes a private garden, modern kitchen, and spacious living areas.',
    rent_price: 75000,
    location: 'Whitefield',
    city: 'Bengaluru',
    property_type: 'Villa',
    bedrooms: 4,
    bathrooms: 4,
    area: 2800,
    furnishing_status: 'Furnished',
    available_from: new Date().toISOString(),
    images: [{ _id: 'img-2', image_url: SAMPLE_IMAGES[1] }],
    owner_id: OWNER,
    status: 'approved',
    isActive: true,
    created_at: '2025-05-15T10:00:00.000Z',
  },
  {
    _id: 'prop-3',
    title: 'Budget PG for Working Professionals',
    description: 'Comfortable and affordable room with WiFi, meals, housekeeping, and easy commute access. Ideal for IT professionals working in nearby tech parks.',
    rent_price: 9000,
    location: 'HSR Layout',
    city: 'Bengaluru',
    property_type: 'PG',
    bedrooms: 1,
    bathrooms: 1,
    area: 180,
    furnishing_status: 'Furnished',
    available_from: new Date().toISOString(),
    images: [{ _id: 'img-3', image_url: SAMPLE_IMAGES[2] }],
    owner_id: OWNER,
    status: 'approved',
    isActive: true,
    created_at: '2025-07-01T10:00:00.000Z',
  },
  {
    _id: 'prop-4',
    title: 'Independent House near IT Park',
    description: 'Spacious family home with a backyard, parking space, and peaceful surroundings close to the office hub. Well-maintained property with excellent ventilation.',
    rent_price: 42000,
    location: 'Hinjewadi Phase 2',
    city: 'Pune',
    property_type: 'Independent House',
    bedrooms: 3,
    bathrooms: 3,
    area: 1800,
    furnishing_status: 'Unfurnished',
    available_from: new Date().toISOString(),
    images: [{ _id: 'img-4', image_url: SAMPLE_IMAGES[3] }],
    owner_id: OWNER,
    status: 'approved',
    isActive: true,
    created_at: '2025-04-20T10:00:00.000Z',
  },
  {
    _id: 'prop-5',
    title: 'Single Room for Rent near University',
    description: 'Affordable room option for students with shared kitchen, bathroom facilities, and a convenient location near universities and public transport.',
    rent_price: 6000,
    location: 'Kothrud',
    city: 'Pune',
    property_type: 'Room',
    bedrooms: 1,
    bathrooms: 1,
    area: 120,
    furnishing_status: 'Semi-Furnished',
    available_from: new Date().toISOString(),
    images: [{ _id: 'img-5', image_url: SAMPLE_IMAGES[4] }],
    owner_id: OWNER,
    status: 'approved',
    isActive: true,
    created_at: '2025-08-10T10:00:00.000Z',
  },
  {
    _id: 'prop-6',
    title: 'Premium 3BHK with City View',
    description: 'Modern apartment with city skyline views, a swimming pool, gym, and clubhouse amenities. Located in a premium high-rise society with excellent connectivity.',
    rent_price: 55000,
    location: 'Powai',
    city: 'Mumbai',
    property_type: 'Apartment',
    bedrooms: 3,
    bathrooms: 3,
    area: 1600,
    furnishing_status: 'Furnished',
    available_from: new Date().toISOString(),
    images: [{ _id: 'img-6', image_url: SAMPLE_IMAGES[5] }],
    owner_id: OWNER,
    status: 'approved',
    isActive: true,
    created_at: '2025-03-05T10:00:00.000Z',
  },
];

// ── Helper functions ──

export const getAllProperties = () =>
  PROPERTIES.filter((p) => p.isActive && p.status === 'approved');

export const getFeaturedProperties = () => getAllProperties().slice(0, 6);

export const getPropertyById = (id) => PROPERTIES.find((p) => p._id === id) || null;

export const getPopularLocations = () => {
  const cityMap = {};
  getAllProperties().forEach((p) => {
    cityMap[p.city] = (cityMap[p.city] || 0) + 1;
  });
  return Object.entries(cityMap)
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
};

export const filterProperties = (filters = {}) => {
  let results = getAllProperties();

  // Location / keyword search (across location, city, title)
  if (filters.location) {
    const q = filters.location.toLowerCase();
    results = results.filter(
      (p) =>
        p.location.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q)
    );
  }

  if (filters.propertyType) {
    results = results.filter((p) => p.property_type === filters.propertyType);
  }

  if (filters.minRent) {
    results = results.filter((p) => p.rent_price >= Number(filters.minRent));
  }

  if (filters.maxRent) {
    results = results.filter((p) => p.rent_price <= Number(filters.maxRent));
  }

  if (filters.bedrooms) {
    results = results.filter((p) => p.bedrooms === Number(filters.bedrooms));
  }

  if (filters.bathrooms) {
    results = results.filter((p) => p.bathrooms === Number(filters.bathrooms));
  }

  if (filters.furnishingStatus) {
    results = results.filter((p) => p.furnishing_status === filters.furnishingStatus);
  }

  // Sort
  if (filters.sortBy === 'lowest') {
    results.sort((a, b) => a.rent_price - b.rent_price);
  } else if (filters.sortBy === 'highest') {
    results.sort((a, b) => b.rent_price - a.rent_price);
  } else {
    // newest first (default)
    results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  return results;
};
