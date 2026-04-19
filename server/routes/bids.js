const express = require('express');
const router = express.Router();
const Bid = require('../models/Bid');
const Listing = require('../models/Listing');
const Notification = require('../models/Notification');
const auth = require('../middleware/auth');

// GET /api/bids/:listingId
router.get('/:listingId', async (req, res) => {
  try {
    const bids = await Bid.find({ listingId: req.params.listingId }).sort({ createdAt: -1 });
    res.json(bids);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/bids
router.post('/', async (req, res) => {
  try {
    const bid = new Bid(req.body);
    await bid.save();
    // Notify listing owner
    try {
      const listing = await Listing.findById(bid.listingId);
      if (listing && listing.sellerId) {
        await Notification.create({
          user: listing.sellerId,
          type: 'bid_received',
          message: `${bid.bidder} placed a $${bid.amount} bid on your listing "${listing.title}"`,
          relatedId: bid._id
        });
      }
    } catch (e) {}
    res.status(201).json(bid);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Accept bid
router.put('/:id/accept', auth, async (req, res) => {
  try {
    const bid = await Bid.findByIdAndUpdate(req.params.id, { status: 'accepted' }, { new: true });
    if (bid.bidderId) {
      await Notification.create({
        user: bid.bidderId,
        type: 'bid_accepted',
        message: `Your bid of $${bid.amount} was accepted!`,
        relatedId: bid._id
      });
    }
    res.json(bid);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reject bid
router.put('/:id/reject', auth, async (req, res) => {
  try {
    const bid = await Bid.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
    if (bid.bidderId) {
      await Notification.create({
        user: bid.bidderId,
        type: 'bid_rejected',
        message: `Your bid of $${bid.amount} was rejected.`,
        relatedId: bid._id
      });
    }
    res.json(bid);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
