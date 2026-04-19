const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// GET /api/messages/:listingId
router.get('/:listingId', async (req, res) => {
  try {
    const messages = await Message.find({ listingId: req.params.listingId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/messages
router.post('/', async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
