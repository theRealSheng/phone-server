const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhoneSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  manufacturer: {
    type: String
  },
  description: {
    type: String
  },
  color: {
    type: String
  },
  price: {
    type: Number
  },
  image: {
    type: String,
    required: true
  },
  screen: {
    type: String
  },
  processor: {
    type: String
  },
  ram: {
    type: String
  }
});

module.exports = mongoose.model('Phone', PhoneSchema);
