// External Imports
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Local Imports
const profileRoute = require('./routes/profile');
const Profile = require('./models/profile-model');
const mongoDb = require('./libs/mongodb');

// Define
const PORT = process.env.PORT || 5000;
const app = express();

// Database Connections
try {
  mongoose.connect(mongoDb.MONGO_URL_LOCAL);
} catch (error) {
  console.error(error);
}

// External Middlewares
app.use(express.json());
app.use(cors());

// Custom Middlewares
app.use('/profile', profileRoute);

// Test Handlers
app.get('/', (req, res) => {
  res.send({ message: "Hi", from: "SERVER" }).sendStatus(200);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Profile Server listening on ${PORT}`);
});