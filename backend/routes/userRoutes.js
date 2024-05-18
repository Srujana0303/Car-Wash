const express = require('express');
const { signup, login, bookCarWash, getBookingStatus, getPlaces } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/book', protect, bookCarWash);
router.get('/status', protect, getBookingStatus);
router.get('/places', getPlaces);

module.exports = router;
