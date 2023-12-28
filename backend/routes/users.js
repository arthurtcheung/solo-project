const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register a user
router.post('/register', async (req, res) => {
  console.log('* Handling registering a user...');
  try {
      const { username, email, password } = req.body;

      // generate new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // create new user
      const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword
      })

      // save user and send response
      const registeredUser = await newUser.save(); // NOTE: saves a document to the db (similar to .create() but allows for additional operations before saving)
      console.log(`   - New user registered: ${registeredUser}`);
      res.status(200).json(registeredUser._id);

  } catch (err) {
      res.status(500).json(err);
  }
})

// Login a user
router.post('/login', async (req, res) => {
  console.log('* Handling logging in a user...');
  try {
      const { username, password } = req.body;

      // find user
      const foundUser = await User.findOne({ username: username }); // NOTE: returns the document or null
      if (foundUser) console.log(`   - Username found in db: ${foundUser.username}`);
      else {
        console.log('   - Username does not exist in db!')
        return res.status(400).json('Wrong username or password!');
      }

      // validate password and send response
      const validPassword = await bcrypt.compare(password, foundUser.password); // NOTE: returns a boolean
      console.log(`   - Valid password entered: ${validPassword}`);
      if (!validPassword) return res.status(400).json('Wrong username or password!');
      res.status(200).json({ _id: foundUser._id, username: foundUser.username });

  } catch (err) {
      res.status(500).json(err);
  }
})

module.exports = router;