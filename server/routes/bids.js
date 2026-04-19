const express = require('express');
const router = express.Router();
const Bid = require('../models/Bid');

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
    res.status(201).json(bid);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
