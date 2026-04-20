# Boost Bids ðŸŽ®

> A full-stack gaming boosting marketplace where players can buy and sell rank boosting services for Valorant, Call of Duty, and Rocket League.

**Live:** [boostbids.org](https://boostbids.org)

---

## Screenshots

> _Add a screenshot of your homepage and listing page here_

---

## Features

- ðŸ—‚ **Browse listings** by game category (Valorant, CoD, Rocket League)
- â­ **Ratings & reviews** â€” buyers can rate sellers after completion
- âœ… **Verified seller badges** â€” trust signals for top boosters
- ðŸ’¬ **In-app messaging** â€” buyers and sellers communicate directly
- ðŸ”” **Notifications** â€” real-time alerts for bids, messages, and reviews
- ðŸ” **Auth system** â€” JWT-based registration and login
- ðŸ›  **Admin panel** â€” manage listings and users
- ðŸ“¦ **18+ live listings** seeded into production database

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Vite, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT |
| Deployment | Railway |

---

## Architecture

```
boostbids/
â”œâ”€â”€ client/                 # React frontend (Vite)
â”‚   â””â”€â”€ src/
â”‚       â”œâ”€â”€ components/     # UI components
â”‚       â”œâ”€â”€ context/        # React context (auth, state)
â”‚       â””â”€â”€ App.jsx
â”‚
â””â”€â”€ server/                 # Node.js/Express backend
    â”œâ”€â”€ models/             # Mongoose schemas
    â”‚   â”œâ”€â”€ User.js
    â”‚   â”œâ”€â”€ Listing.js
    â”‚   â”œâ”€â”€ Bid.js
    â”‚   â”œâ”€â”€ Review.js
    â”‚   â”œâ”€â”€ Message.js
    â”‚   â””â”€â”€ Notification.js
    â”œâ”€â”€ routes/             # REST API routes
    â”‚   â”œâ”€â”€ auth.js         # POST /api/auth/register, /login
    â”‚   â”œâ”€â”€ listings.js     # CRUD /api/listings
    â”‚   â”œâ”€â”€ bids.js         # POST /api/bids
    â”‚   â”œâ”€â”€ reviews.js      # POST /api/reviews
    â”‚   â”œâ”€â”€ messages.js     # GET/POST /api/messages
    â”‚   â”œâ”€â”€ notifications.js
    â”‚   â”œâ”€â”€ users.js
    â”‚   â””â”€â”€ admin.js
    â”œâ”€â”€ middleware/
    â”œâ”€â”€ seed.js             # Database seeder
    â””â”€â”€ index.js            # Entry point
```

---

## Run Locally

**Prerequisites:** Node.js 18+, MongoDB

```bash
# Clone
git clone https://github.com/asadmaqsood1011-spec/boostbids.git
cd boostbids

# Backend
cd server
npm install
cp .env.example .env   # add your MONGO_URI and JWT_SECRET
node index.js

# Frontend (new terminal)
cd client
npm install
npm run dev
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login, returns JWT |
| GET | `/api/listings` | Get all listings |
| POST | `/api/listings` | Create a listing |
| POST | `/api/bids` | Place a bid |
| POST | `/api/reviews` | Submit a review |
| GET | `/api/messages/:userId` | Get messages |

---

## Deployment

Deployed on **Railway** with automatic deploys from `main` branch.

- Backend: `node server/index.js`
- Frontend: Dockerized React app
- Database: MongoDB hosted on Railway

---

## Author

**Asad Maqsood** â€” [github.com/asadmaqsood1011-spec](https://github.com/asadmaqsood1011-spec)
