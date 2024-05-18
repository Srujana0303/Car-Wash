const User = require('../models/User');
const Booking = require('../models/Booking');
const Place = require('../models/Place');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.bookCarWash = async (req, res) => {
  const { placeId, service, date } = req.body;
  const userId = req.user.id;
  try {
    const existingBookings = await Booking.find({ place: placeId, date });
    if (existingBookings.length >= 5) {
      return res.status(400).json({ message: 'No slots available for this date' });
    }
    const booking = await Booking.create({
      user: userId,
      place: placeId,
      service,
      date,
    });
    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBookingStatus = async (req, res) => {
  const userId = req.user.id;
  try {
    const bookings = await Booking.find({ user: userId }).populate('place');
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
