const express = require('express');
const { adminlogin, addPlace, getBookings, updateBookingStatus } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/adminlogin', adminlogin);
router.post('/place', protect, addPlace);
router.get('/bookings', protect, getBookings);
router.put('/booking/status', protect, updateBookingStatus);

module.exports = router;
