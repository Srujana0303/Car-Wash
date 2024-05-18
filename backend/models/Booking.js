const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  service: { type: String, required: true },
  date: { type: Date, required: true },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  shopName: { type: String, required: true }, // Add shopName field
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
