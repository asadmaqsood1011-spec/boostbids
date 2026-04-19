const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');
const User = require('../models/User');
const Bid = require('../models/Bid');
const Review = require('../models/Review');

const ADMIN_KEY = process.env.ADMIN_KEY || 'boostbids_admin_2024';

// Middleware
const adminAuth = (req, res, next) => {
  if (req.headers['x-admin-key'] !== ADMIN_KEY) return res.status(403).json({ error: 'Forbidden' });
  next();
};

// Stats
router.get('/stats', adminAuth, async (req, res) => {
  const [listings, users, bids, reviews] = await Promise.all([
    Listing.countDocuments(),
    User.countDocuments(),
    Bid.countDocuments(),
    Review.countDocuments(),
  ]);
  res.json({ listings, users, bids, reviews });
});

// Get all listings
router.get('/listings', adminAuth, async (req, res) => {
  const listings = await Listing.find().sort('-createdAt');
  res.json(listings);
});

// Delete listing
router.delete('/listings/:id', adminAuth, async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  await Bid.deleteMany({ listingId: req.params.id });
  res.json({ success: true });
});

// Get all users
router.get('/users', adminAuth, async (req, res) => {
  const users = await User.find().select('-password').sort('-createdAt');
  res.json(users);
});

// Delete user
router.delete('/users/:id', adminAuth, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  await Listing.deleteMany({ sellerId: req.params.id });
  res.json({ success: true });
});

// Delete review
router.delete('/reviews/:id', adminAuth, async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
