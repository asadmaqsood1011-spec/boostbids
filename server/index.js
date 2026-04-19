require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const listingsRouter = require('./routes/listings');
const bidsRouter = require('./routes/bids');
const messagesRouter = require('./routes/messages');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const reviewsRouter = require('./routes/reviews');
const notificationsRouter = require('./routes/notifications');
const adminRouter = require('./routes/admin');
const activityRouter = require('./routes/activity');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/boostbids';

app.use(cors());
app.use(express.json());

app.use('/api/listings', listingsRouter);
app.use('/api/bids', bidsRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/admin', adminRouter);
app.use('/api/activity', activityRouter);

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
