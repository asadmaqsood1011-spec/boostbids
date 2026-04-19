const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');

// GET /api/listings
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.game) filter.game = req.query.game;
    if (req.query.type) filter.type = req.query.type;
    const listings = await Listing.find(filter).sort({ featured: -1, createdAt: -1 });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/listings
router.post('/', async (req, res) => {
  try {
    const listing = new Listing(req.body);
    await listing.save();
    res.status(201).json(listing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
