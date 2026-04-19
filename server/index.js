require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const listingsRouter = require('./routes/listings');
const bidsRouter = require('./routes/bids');
const messagesRouter = require('./routes/messages');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/boostbids';

app.use(cors());
app.use(express.json());

app.use('/api/listings', listingsRouter);
app.use('/api/bids', bidsRouter);
app.use('/api/messages', messagesRouter);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
