const mongoose = require('mongoose');
require('dotenv').config();

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/url-shortener';

const dbconnect = () => {
  if (!dbUrl) {
    console.error('❌ DB_URL is not defined in .env');
    process.exit(1);
  }

  mongoose.connect(dbUrl, {
  })
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    console.error('❌ Error connecting to MongoDB:', err);
    process.exit(1);
  });
};

module.exports = dbconnect;