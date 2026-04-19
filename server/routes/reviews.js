const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const User = require('../models/User');
const Notification = require('../models/Notification');
const auth = require('../middleware/auth');

// Post review
router.post('/', auth, async (req, res) => {
  try {
    const { revieweeId, listingId, rating, comment } = req.body;
    const review = await Review.create({ reviewer: req.user.id, reviewee: revieweeId, listing: listingId, rating, comment });
    // Update user rating
    const reviews = await Review.find({ reviewee: revieweeId });
    const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await User.findByIdAndUpdate(revieweeId, { rating: avg.toFixed(1), totalReviews: reviews.length });
    // Notify
    await Notification.create({ user: revieweeId, type: 'review_received', message: `${req.user.username} left you a ${rating}-star review`, relatedId: review._id });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get reviews for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const reviews = await Review.find({ reviewee: req.params.userId }).populate('reviewer', 'username avatar').sort('-createdAt');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
