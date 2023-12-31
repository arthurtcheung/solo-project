const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/users');
const pinRoute = require('./routes/pins');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // NOTE: server port stored in .env file

// Enable CORS for all routes (before parsing the JSON body)
app.use(cors());

// Handle parsing the JSON body of every request
app.use(express.json());

// Connect server to database hosted on Atlas
mongoose
  .connect(process.env.MONGO_URL) // NOTE: db connection string stored in .env file
  .then(() => {
    console.log('* MongoDB database connected');
  })
  .catch((err) => {
    console.log(err);
  })

// Define route handlers
app.use('/api/users', userRoute);
app.use('/api/pins', pinRoute);

// Turns computer into server to listen for incoming requests to a specific port
app.listen(port, () => {
  console.log(`* Server listening at http://localhost:${port}`)
});