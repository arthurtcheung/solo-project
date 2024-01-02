const mongoose = require("mongoose");

// Create Pin schema
const PinSchema = new mongoose.Schema({
  username: {
    type: String,
    rquire: true,
  },
  title: {
    type: String,
    rquire: true,
    min: 3
  },
  review: {
    type: String,
    rquire: true,
    min: 3
  },
  rating: {
    type: Number,
    require: true,
    min: 0,
    max: 5
  },
  lat: {
    type: Number,
    require: true
  },
  long: {
    type: Number,
    require: true
  }
}, { timestamps: true }) // NOTE: every pin created will include two additonal properties: a date it was created and a date it was updated

module.exports = mongoose.model('Pin', PinSchema);