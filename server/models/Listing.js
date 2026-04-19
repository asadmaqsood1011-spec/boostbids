const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  game: { type: String, required: true },
  type: { type: String, enum: ['request', 'offer'], required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  seller: { type: String, required: true },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  verified: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  pro: { type: Boolean, default: false },
  eta: { type: String, default: '24 hours' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Listing', listingSchema);
