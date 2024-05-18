const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  shopName: { type: String, required: true },
  name: { type: String, required: true },
  services: { type: [String], required: true },
});

const Place = mongoose.model('Place', placeSchema);
module.exports = Place;
