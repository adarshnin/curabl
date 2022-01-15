const express = require('express');
const Profile = require('../models/profile-model');
const router = express.Router();
const { convertJsonToDot } = require('../libs/utils');

// Delete a Profile
router.delete('/', async (req, res) => {
  const data = req.body;
  console.log(data);
  let user;
  if (data.id || data._id) {
    user = await Profile.findById(data.id || data._id);
  } else if (data.email) {
    user = await Profile.findOne({ email: data.email });
  } else {
    res.sendStatus(404);
  }
  if (user) {
    await Profile.deleteOne({ _id: user._id });
    res.status(200).json({ "message": "Profile Deleted Successfully." })
  }
});

// Create or Update a Profile
router.post('/', async (req, res) => {
  const data = req.body;
  console.log(data);
  let user;
  if(data.$update) {
    if (data.id) {
      user = await Profile.findById(data.id);
    } else if (data.email) {
      user = await Profile.findOne({ email: data.email });
    } else {
      res.status(400).json({"message":"No unique parameters provided."});
    }
  } else {
    user = await new Profile();
    user.name = {};
  }
  console.log(user);
  user.name.firstName = data.name.firstName || user.name.firstName;
  user.name.middleName = data.name.middleName || user.name.middleName;
  user.name.lastName = data.name.lastName || user.name.lastName;
  user.email = data.email || user.email;
  user.password = data.password || user.password;
  user.isDoctor = ("isDoctor" in data) ? data.isDoctor : user.isDoctor;
  console.log(user);
  
  await user.save((err, profile) => {
    if (err) {
      console.error(err);
      res.status(400).json({ error: err });
    } else {
      console.log(profile);
      res.status(201).json({profile});
    }
  })
});

// Fetch Profile(s)
router.get('/', (req, res) => {
  const count = req.body.count;
  const matches = convertJsonToDot(req.body.matches);
  console.log(matches);
  Profile.find(matches).limit(count).exec((err, data) => {
    console.log(err, data);
    if (err) {
      console.error(err);
      res.send(400).json({ error: err });
    } else {
      res.status(200).json(data);
    }
  })
});


router.get('/', (req, res) => {
  res.send({ message: "Hi", from: "PROFILE" }).sendStatus(200);
})

module.exports = router;