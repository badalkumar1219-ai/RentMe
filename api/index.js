// Vercel serverless function entry point.
// Imports the Express app and exposes it as a serverless handler.
const app = require('../backend/server');
module.exports = app;
