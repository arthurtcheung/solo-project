const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require()

// Register a user
router.post('/register', async (req, res) => {
  const newUser = new User(req.body);
  try {
      // generate new password
      // create new user
      // save user and send response
      const registeredUser = await newUser.save(); // NOTE: saves a document to the db (similar to .create() but allows for additional operations before saving)
      console.log(`* New user registered: ${registeredUser}`);
      res.status(200).json(registeredUser);
  } catch (err) {
      res.status(500).json(err);
  }
})

// Login a user
router.get('/', async (req, res) => {
  try {
      const pins = await Pin.find(); // NOTE: returns all the pin documents in db
      console.log(`* All pins retrieved: ${pins}`);
      res.status(200).json(pins);
  } catch (err) {
      res.status(500).json(err);
  }
})

module.exports = router;