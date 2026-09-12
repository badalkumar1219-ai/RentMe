# 🏠 HomeNest — Full-Stack House Rental Website

A complete MERN-stack (MongoDB, Express, React, Node.js) house rental platform
where tenants can browse/search rental properties and property owners can list
and manage their properties. Includes an admin dashboard for moderation.

## ✨ Features

- **Home page** with hero search, featured listings, popular locations, and a CTA to list a property
- **Property listings** with images, price, location, bedrooms/bathrooms, type, area, description
- **Property details page** with an image gallery, Google Maps embed, and a "Contact Owner" flow
- **Advanced search & filters**: location, rent range, property type, bedrooms, bathrooms, furnishing status, sorting — all update dynamically
- **JWT authentication** with two roles: `tenant` and `owner` (plus a separate `admin` role)
- **Owner dashboard**: add / edit / delete properties, upload multiple images (via Cloudinary)
- **Tenant features**: save/unsave favorites, view saved properties, contact owners
- **Admin dashboard**: manage users (activate/deactivate/delete), approve/reject/remove property listings
- Fully responsive (mobile, tablet, desktop), loading states, form validation, toast notifications

## 🧱 Tech Stack

| Layer          | Technology                                  |
|----------------|----------------------------------------------|
| Frontend       | React (Vite), React Router, Tailwind CSS, Axios |
| Backend        | Node.js, Express.js                          |
| Database       | MongoDB + Mongoose                            |
| Auth           | JWT (JSON Web Tokens) + bcrypt password hashing |
| Image storage  | Cloudinary                                    |

## 📁 Project Structure

```
house-rental-app/
├── backend/
│   ├── config/            # DB + Cloudinary configuration
│   ├── controllers/       # Route handler logic
│   ├── middleware/        # Auth guard + error handler
│   ├── models/            # Mongoose schemas (User, Property, Favorite)
│   ├── routes/            # Express routers
│   ├── utils/             # JWT helper + DB seed script
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── api/            # Axios instance (auto-attaches JWT)
    │   ├── components/     # Navbar, Footer, PropertyCard, Filters, etc.
    │   ├── context/        # AuthContext (global auth state)
    │   ├── pages/          # Home, Listings, PropertyDetails, Dashboards, etc.
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .env.example
    ├── index.html
    ├── tailwind.config.js
    └── package.json
```

## 🗄️ Database Models

**User**: `name, email, password (hashed), phone_number, role (tenant/owner/admin), isActive, created_at`

**Property**: `title, description, rent_price, location, city, property_type, bedrooms, bathrooms, area, furnishing_status, available_from, images[], owner_id, status (pending/approved/rejected), created_at`
> Note: `images` is embedded as an array of `{ image_url, public_id }` directly on the Property document — functionally the same as a separate "Property Images" table, just denormalized for faster reads.

**Favorite**: `user_id, property_id, created_at` (unique per user+property pair)

## 💻 Running in VS Code

1. Open the **`house-rental-app`** folder in VS Code (`File → Open Folder…`).
2. Install the recommended extensions when prompted (or open the Extensions panel — they're listed in `.vscode/extensions.json`): ESLint, Prettier, Tailwind CSS IntelliSense.
3. Open a terminal: `` Ctrl+` `` (Windows/Linux) or `` Cmd+` `` (Mac).
4. From the **root** folder, install everything and start both servers with one command:
   ```bash
   npm run install:all   # installs backend + frontend dependencies
   npm run dev            # runs backend (port 5000) and frontend (port 5173) together
   ```
   (This uses `concurrently`, defined in the root `package.json` — run `npm install` in the root once first if `concurrently` isn't found.)
5. Alternatively, run them separately in two VS Code terminals (`Terminal → Split Terminal`):
   ```bash
   # Terminal 1
   cd backend && npm install && npm run dev

   # Terminal 2
   cd frontend && npm install && npm run dev
   ```
6. To debug the backend with breakpoints, press `F5` (uses the "Debug Backend (server.js)" config in `.vscode/launch.json`).
7. Don't forget to create `backend/.env` and `frontend/.env` from their `.env.example` files before starting (see below).

## 🚀 Getting Started (Run Locally)

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ installed
- [MongoDB](https://www.mongodb.com/try/download/community) running locally, OR a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) cluster
- A free [Cloudinary](https://cloudinary.com/users/register/free) account (for image uploads)

### 1. Clone / unzip the project
```bash
cd house-rental-app
```

### 2. Backend setup
```bash
cd backend
npm install
cp .env.example .env
```
Open `.env` and fill in your real values:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/house_rental     # or your Atlas connection string
JWT_SECRET=some_long_random_string
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173
```

(Optional) Seed the database with sample users & properties:
```bash
npm run seed
```
This creates:
- Admin login: `admin@homenest.com` / `admin123`
- Owner login: `owner@homenest.com` / `owner123`
- Tenant login: `tenant@homenest.com` / `tenant123`

Start the backend:
```bash
npm run dev
```
The API will run at `http://localhost:5000`. Test it: `GET http://localhost:5000/api/health`.

### 3. Frontend setup
Open a **new terminal**:
```bash
cd frontend
npm install
cp .env.example .env
```
`.env` should contain:
```
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```
Visit `http://localhost:5173` in your browser. 🎉

> The Vite dev server also proxies `/api` to `http://localhost:5000`, so the app works even without setting `VITE_API_URL`.

### 4. Try it out
1. Register as a **Property Owner**, then go to "List Property" and add a listing with images.
2. Register (or log in) as a **Tenant** in another browser/incognito window, browse `/listings`, apply filters, save a favorite, and view property details.
3. To test the **Admin Dashboard**, log in with the seeded admin account (or manually set a user's `role` to `admin` in MongoDB) and visit `/admin/dashboard`.

## 🔌 Key API Endpoints

| Method | Endpoint                              | Access        | Description                       |
|--------|----------------------------------------|---------------|------------------------------------|
| POST   | `/api/auth/register`                  | Public        | Register (tenant/owner)            |
| POST   | `/api/auth/login`                     | Public        | Login, returns JWT                 |
| GET    | `/api/auth/me`                        | Private       | Get logged-in user profile         |
| GET    | `/api/properties`                     | Public        | Search/filter/sort properties      |
| GET    | `/api/properties/featured`            | Public        | Featured properties for homepage   |
| GET    | `/api/properties/popular-locations`   | Public        | Popular cities                     |
| GET    | `/api/properties/:id`                 | Public        | Single property details            |
| POST   | `/api/properties`                     | Owner/Admin   | Create property (multipart images) |
| PUT    | `/api/properties/:id`                 | Owner/Admin   | Update property                    |
| DELETE | `/api/properties/:id`                 | Owner/Admin   | Delete property                    |
| GET    | `/api/properties/owner/mine`          | Owner/Admin   | Owner's own listings               |
| GET    | `/api/favorites`                      | Private       | Logged-in user's saved properties  |
| POST   | `/api/favorites/:propertyId`          | Private       | Save a property                    |
| DELETE | `/api/favorites/:propertyId`          | Private       | Unsave a property                  |
| GET    | `/api/admin/users`                    | Admin         | List all users                     |
| PUT    | `/api/admin/users/:id/status`         | Admin         | Activate/deactivate user           |
| DELETE | `/api/admin/users/:id`                | Admin         | Delete user                        |
| GET    | `/api/admin/properties`               | Admin         | List all properties (any status)   |
| PUT    | `/api/admin/properties/:id/status`    | Admin         | Approve/reject a listing           |
| DELETE | `/api/admin/properties/:id`           | Admin         | Remove a listing                   |

## 🛠️ Notes & Next Steps

- Search/filter query params on `GET /api/properties`: `location, propertyType, minRent, maxRent, bedrooms, bathrooms, furnishingStatus, sortBy (lowest|highest|newest), page, limit`.
- By default new listings are auto-approved (`status: 'approved'`). If you want admin approval before listings go live, change the default in `backend/models/Property.js` to `'pending'`.
- Google Maps integration uses a simple embeddable iframe (no API key required) based on the property's location/city text. For pin-accurate maps, you can swap in the Google Maps JavaScript API with lat/lng and an API key.
- To deploy: host the backend (e.g. Render/Railway), the frontend (e.g. Vercel/Netlify), and use MongoDB Atlas for the database. Remember to update `CLIENT_URL` (backend) and `VITE_API_URL` (frontend) to your deployed URLs.
