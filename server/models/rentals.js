const mongoose = require('mongoose');
// 0-> 2n, 1-> 2e, 2-> 4n, 3-> 4e
// rewards -> [1, 3, 0, 2]
const rentalschema = new mongoose.Schema({
  cityname: String,
  name: String,
  pricing: [Number],
  rewards : [Number],
  no_of_v : [Number],
});

module.exports = mongoose.model('Rental', rentalschema);