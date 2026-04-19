const express = require('express');
const router = express.Router();
const Bid = require('../models/Bid');
const Listing = require('../models/Listing');
const Review = require('../models/Review');

router.get('/', async (req, res) => {
  try {
    const [bids, listings, reviews] = await Promise.all([
      Bid.find().sort('-createdAt').limit(5),
      Listing.find().sort('-createdAt').limit(5),
      Review.find().sort('-createdAt').limit(5).populate('reviewer', 'username'),
    ]);

    const events = [
      ...bids.map(b => ({ type: 'bid', text: `${b.bidder} placed a $${b.amount} bid`, time: b.createdAt, dot: 'blue' })),
      ...listings.map(l => ({ type: 'listing', text: `${l.seller} posted a new ${l.game} listing`, time: l.createdAt, dot: 'green' })),
      ...reviews.map(r => ({ type: 'review', text: `${r.reviewer?.username || 'Someone'} left a ${'★'.repeat(r.rating)} review`, time: r.createdAt, dot: 'yellow' })),
    ];

    events.sort((a, b) => new Date(b.time) - new Date(a.time));
    res.json(events.slice(0, 10));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
