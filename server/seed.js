require('dotenv').config();
const mongoose = require('mongoose');
const Listing = require('./models/Listing');
const Bid = require('./models/Bid');
const Message = require('./models/Message');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/boostbids';

const listings = [
  {
    game: 'Call of Duty',
    type: 'offer',
    title: 'MW3 Ranked to Diamond — Fast & Safe',
    description: 'I will boost your ranked account from Gold to Diamond in 24-48 hours. 100+ wins this season.',
    price: 45,
    seller: 'ShadowOp_X',
    rating: 4.9,
    verified: true,
    featured: true,
    pro: true,
    eta: '24-48 hrs',
  },
  {
    game: 'Call of Duty',
    type: 'request',
    title: 'Need Warzone Camo Unlock Help',
    description: 'Looking for someone to help me unlock the Borealis camo. Budget is $30. Willing to negotiate.',
    price: 30,
    seller: 'NightCrawler99',
    rating: 0,
    verified: false,
    featured: false,
    pro: false,
    eta: 'Flexible',
  },
  {
    game: 'World of Warcraft',
    type: 'offer',
    title: 'Mythic+ Carry — All Keys Up to +20',
    description: 'Full premade group carries. Gear, vault slots, achievements. Multiple classes available.',
    price: 80,
    seller: 'EliteRaidGroup',
    rating: 5.0,
    verified: true,
    featured: true,
    pro: true,
    eta: '2-4 hrs',
  },
  {
    game: 'World of Warcraft',
    type: 'request',
    title: 'Need AotC (Aberrus) Carry',
    description: 'Just want the Ahead of the Curve achievement and mount. Budget is around $50.',
    price: 50,
    seller: 'CasualDad_WoW',
    rating: 0,
    verified: false,
    featured: false,
    pro: false,
    eta: 'Weekend',
  },
  {
    game: 'Lost Ark',
    type: 'offer',
    title: 'Brel Hard Carry — 1600 iLevel Service',
    description: 'Professional Lost Ark player offering Brelshaza Hard mode carries. Full loot, no splits.',
    price: 60,
    seller: 'ArkMaster_KR',
    rating: 4.8,
    verified: true,
    featured: false,
    pro: true,
    eta: '3-5 hrs',
  },
  {
    game: 'Lost Ark',
    type: 'request',
    title: 'Chaos Dungeon Farm — Weekly Cap',
    description: 'Need weekly chaos dungeon cap farming. 5 chars. Budget $25.',
    price: 25,
    seller: 'LostArkFarmer',
    rating: 0,
    verified: false,
    featured: false,
    pro: false,
    eta: '1 day',
  },
  {
    game: 'Warframe',
    type: 'offer',
    title: 'Steel Path Leveling & Arcane Farm',
    description: 'Carry through Steel Path missions. Arcane Energize, Barrier, Avenger farming available.',
    price: 20,
    seller: 'TennoElite',
    rating: 4.7,
    verified: true,
    featured: true,
    pro: false,
    eta: '1-2 hrs',
  },
  {
    game: 'Warframe',
    type: 'request',
    title: 'Help with Eidolon Hunts',
    description: 'Need a carry for Profit-Taker and Eidolon hunts. Will pay $15 for a session.',
    price: 15,
    seller: 'NewTenno42',
    rating: 0,
    verified: false,
    featured: false,
    pro: false,
    eta: 'Any time',
  },
  {
    game: 'Final Fantasy XIV',
    type: 'offer',
    title: 'Savage Raid Clears — Anabaseios',
    description: 'Ultimate-cleared player offering Savage clears for all current tier fights. Loot rules negotiable.',
    price: 70,
    seller: 'LightningCoil',
    rating: 4.9,
    verified: true,
    featured: true,
    pro: true,
    eta: '4-6 hrs',
  },
  {
    game: 'Final Fantasy XIV',
    type: 'request',
    title: 'Need Blue Mage Masked Carnival Clears',
    description: 'Looking for someone to help with Blue Mage Masked Carnivall clears for the mount. Budget $20.',
    price: 20,
    seller: 'BLUMage_Enjoyer',
    rating: 0,
    verified: false,
    featured: false,
    pro: false,
    eta: 'This week',
  },
  {
    game: 'Escape from Tarkov',
    type: 'offer',
    title: 'Quest Carry — Lighthouse & Labs',
    description: 'Veteran EFT player. PMC carries for Lighthouse, Labs, quests. Kappa helper available.',
    price: 35,
    seller: 'TarkovVet_Chad',
    rating: 4.6,
    verified: true,
    featured: false,
    pro: true,
    eta: '1-3 hrs',
  },
  {
    game: 'Escape from Tarkov',
    type: 'request',
    title: 'Need Lighthouse Quests Done',
    description: 'Lighthouse stresses me out. Need someone to carry me through Lightkeeper quests. Paying $25.',
    price: 25,
    seller: 'ScavLife4Ever',
    rating: 0,
    verified: false,
    featured: false,
    pro: false,
    eta: 'ASAP',
  },
  {
    game: 'VALORANT',
    type: 'offer',
    title: 'Radiant Duo Boost — Any Rank',
    description: 'Radiant player boosting with you in duo queue. Fast, discreet, VPN available.',
    price: 55,
    seller: 'RadiantAim_GG',
    rating: 4.8,
    verified: true,
    featured: true,
    pro: true,
    eta: '1-2 days',
  },
  {
    game: 'VALORANT',
    type: 'request',
    title: 'Silver to Gold Boost Needed',
    description: 'Stuck in Silver 2. Looking for a booster to get me to Gold 1. Budget is $40.',
    price: 40,
    seller: 'Val_Player_EU',
    rating: 0,
    verified: false,
    featured: false,
    pro: false,
    eta: '3-5 days',
  },
  {
    game: 'Rocket League',
    type: 'offer',
    title: 'Grand Champion Coaching + Boost',
    description: 'GC3 player. Offering coaching sessions + rank boost. Replay analysis included.',
    price: 30,
    seller: 'RocketPro_NA',
    rating: 4.7,
    verified: true,
    featured: false,
    pro: true,
    eta: '1-3 days',
  },
  {
    game: 'Rocket League',
    type: 'request',
    title: 'Need Champ Rank for Season Rewards',
    description: 'Currently Plat 3. Want to hit Champ before season ends for the rewards. Paying $35.',
    price: 35,
    seller: 'BoostMe_RL',
    rating: 0,
    verified: false,
    featured: false,
    pro: false,
    eta: 'Before season end',
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Listing.deleteMany({});
    await Bid.deleteMany({});
    await Message.deleteMany({});
    console.log('🗑️  Cleared existing data');

    const savedListings = await Listing.insertMany(listings);
    console.log(`✅ Seeded ${savedListings.length} listings`);

    const bids = [];
    const messages = [];

    savedListings.forEach((listing, i) => {
      bids.push(
        { listingId: listing._id, bidder: 'ProGamer_01', amount: listing.price - 5, message: 'I can do this cheaper, check my profile.' },
        { listingId: listing._id, bidder: 'BoostKing_99', amount: listing.price + 10, message: 'Premium service, fastest delivery guaranteed.' },
        { listingId: listing._id, bidder: `User_${i + 100}`, amount: listing.price, message: 'Standard rate, available now.' }
      );
      messages.push(
        { listingId: listing._id, sender: listing.seller, text: `Hi! I posted this listing. Feel free to ask any questions.` },
        { listingId: listing._id, sender: 'Visitor_42', text: `Is this still available? I'm interested.` },
        { listingId: listing._id, sender: listing.seller, text: 'Yes, still available! DM me to arrange details.' },
        { listingId: listing._id, sender: 'Visitor_77', text: `What's your fastest turnaround for this?` }
      );
    });

    await Bid.insertMany(bids);
    console.log(`✅ Seeded ${bids.length} bids`);

    await Message.insertMany(messages);
    console.log(`✅ Seeded ${messages.length} messages`);

    console.log('\n🎉 Seed complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();
