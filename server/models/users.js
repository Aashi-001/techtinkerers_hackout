const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  phone: Number,
  reward_points: Number,
});

module.exports = mongoose.model('User', userSchema);