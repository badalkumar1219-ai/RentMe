// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUserPublicProfile } = require('../controllers/userController');

router.get('/:id', getUserPublicProfile);

module.exports = router;
