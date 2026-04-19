# ⚡ BoostBids — Gaming Boost Marketplace

A clean MERN stack posting board for gaming boosting services.

## Stack
- **Frontend:** React 18 + Vite (port 5173)
- **Backend:** Node.js + Express (port 5000)
- **Database:** MongoDB + Mongoose

## Setup

### Prerequisites
- Node.js 18+
- MongoDB running locally on `mongodb://localhost:27017`

### 1. Install dependencies

```bash
# Server
cd server && npm install

# Client
cd ../client && npm install
```

### 2. Seed the database

```bash
cd server && node seed.js
```

This will add 16 sample listings across all 8 games + bids + messages.

### 3. Run the app

Open **two terminals**:

**Terminal 1 — Backend:**
```bash
cd server && node index.js
```

**Terminal 2 — Frontend:**
```bash
cd client && npm run dev
```

### 4. Open the app

👉 http://localhost:5173

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/listings | Get all listings (supports ?game= filter) |
| POST | /api/listings | Create a listing |
| GET | /api/bids/:listingId | Get bids for a listing |
| POST | /api/bids | Place a bid |
| GET | /api/messages/:listingId | Get messages for a listing |
| POST | /api/messages | Post a message |

## Games Supported
- Call of Duty
- World of Warcraft
- Lost Ark
- Warframe
- Final Fantasy XIV
- Escape from Tarkov
- VALORANT
- Rocket League

## Disclaimer
BoostBids is a posting board only. No payment processing. All deals happen independently between users.
