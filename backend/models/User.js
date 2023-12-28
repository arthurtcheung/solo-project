const mongoose = require("mongoose");

// Create User schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    min: 3,
    max: 20,
    unique: true
  },
  email: {
    type: String,
    require: true,
    max: 50,
    unique: true
  },
  password: {
    type: String,
    require: true,
    min: 6
  }
}, { timestamps: true }) // NOTE: every user created will include two additonal properties: a date it was created and a date it was updated

module.exports = mongoose.model('User', UserSchema);