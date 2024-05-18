const Admin = require('../models/Admin');
const Place = require('../models/Place');
const Booking = require('../models/Booking');
const jwt = require('jsonwebtoken');

exports.adminlogin = async (req, res) => {
  console.log('adminlogin function called');
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (admin && (await admin.matchPassword(password))) {
      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addPlace = async (req, res) => {
  const { shopName, name, services } = req.body;
  try {
    const place = await Place.create({ shopName, name, services });
    res.status(201).json({ message: 'Place added successfully', place });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBookings = async (req, res) => {
  const { placeId, date } = req.query;
  try {
    const query = {};
    if (placeId) query.place = placeId;
    if (date) query.date = date;
    const bookings = await Booking.find(query)
      .populate('place')
      .populate('user')
      .exec();
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  const { bookingId, status } = req.body;
  try {
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );
    res.json({ message: 'Booking status updated successfully', booking });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
