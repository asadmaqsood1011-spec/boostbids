const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  bidder: { type: String, required: true },
  amount: { type: Number, required: true },
  message: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Bid', bidSchema);
