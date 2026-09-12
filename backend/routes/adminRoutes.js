// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  setUserStatus,
  deleteUser,
  getAllPropertiesAdmin,
  setPropertyStatus,
  removeProperty,
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

// Every route here requires an authenticated admin
router.use(protect, authorize('admin'));

router.get('/users', getAllUsers);
router.put('/users/:id/status', setUserStatus);
router.delete('/users/:id', deleteUser);

router.get('/properties', getAllPropertiesAdmin);
router.put('/properties/:id/status', setPropertyStatus);
router.delete('/properties/:id', removeProperty);

module.exports = router;
