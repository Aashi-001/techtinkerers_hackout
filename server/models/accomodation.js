const mongoose = require('mongoose');
// 0-> 2n, 1-> 2e, 2-> 4n, 3-> 4e
// rewards -> [1, 3, 0, 2]
const accommodationschema = new mongoose.Schema({
  cityname: String,
  name: String,
  level: Number, 
  address: String, 
  price: Number,
  ratings: Number,
  desc: String,
  link: String,
});

module.exports = mongoose.model('Accomodation', accommodationschema);