const mongoose = require('mongoose');
const config = require('.');

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (e) {
    console.error(e.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;

