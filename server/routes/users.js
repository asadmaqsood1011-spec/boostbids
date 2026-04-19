const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Listing = require('../models/Listing');
const Review = require('../models/Review');
const auth = require('../middleware/auth');

// Get public profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    const totalListings = await Listing.countDocuments({ sellerId: req.params.id });
    const reviews = await Review.find({ reviewee: req.params.id }).populate('reviewer', 'username').sort('-createdAt');
    res.json({ user, totalListings, reviews });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update own profile
router.put('/me', auth, async (req, res) => {
  try {
    const { bio, avatar, gamesPlayed } = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, { bio, avatar, gamesPlayed }, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
