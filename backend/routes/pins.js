const router = require('express').Router();
const Pin = require('../models/Pin');

// Create a pin
router.post('/', async (req, res) => {
  const newPin = new Pin(req.body);
  try {
      const savedPin = await newPin.save(); // NOTE: saves a document to the db (similar to .create() but allows for additional operations before saving)
      console.log(`* New pin created: ${savedPin}`);
      res.status(200).json(savedPin);
  } catch (err) {
      res.status(500).json(err);
  }
})

// Get all pins
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