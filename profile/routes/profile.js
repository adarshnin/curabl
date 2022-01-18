// External Imports
const express = require('express');

// Custom Imports
const Profile = require('../models/profile-model');
const { convertJsonToDot } = require('../libs/utils');
const upload = require('../avatarUpload');

// Define
const router = express.Router();

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
router.post('/', upload.single('profileImage'), async (req, res) => {
  const data = req.body;
  console.log("data", data);
  console.log("req.file", req.file);
  // Fetch or create
  let user;
  if (data.$update) {
    if (data.id) {
      user = await Profile.findById(data.id);
    } else if (data.email) {
      user = await Profile.findOne({ email: data.email });
      console.log('Checking email', { email: data.email });
    } else {
      res.status(400).json({ "message": "No unique parameters provided." });
    }
  } else {
    user = await new Profile();
    user.name = {};
    user.address = {};
    user.fees = {};
  }
  if ("name" in data) { data.name = JSON.parse(data.name); }
  if ("address" in data) { data.address = JSON.parse(data.address); }
  console.log("user", user);

  // Set or modify
  // Required Fields
  user.name.firstName = data.name.firstName || user.name.firstName;
  user.name.middleName = data.name.middleName || user.name.middleName;
  user.name.lastName = data.name.lastName || user.name.lastName;
  user.email = data.email || user.email;
  user.password = data.password || user.password;
  user.isDoctor = ("isDoctor" in data) ? data.isDoctor : user.isDoctor;

  // Not Required Fields
  // Info Schema
  user.dob = data.dob || user.dob;
  user.bloodGroup = data.bloodGroup || user.bloodGroup;
  user.gender = data.gender || user.gender;
  user.contactNo = data.contactNo || user.contactNo;
  user.designation = data.designation || user.designation;
  user.imrNumber = data.imrNumber || user.imrNumber;
  user.description = data.description || user.description;

  // Charges Schema
  user.fees.consultation = data.consultationFees || user.fees.consultation;

  // Address Schema
  user.address.houseNo = data?.address?.houseNo || user.address.houseNo;
  user.address.street = data?.address?.street || user.address.street;
  user.address.landmark = data?.address?.landmark || user.address.landmark;
  user.address.area = data?.address?.area || user.address.area;
  user.address.district = data?.address?.district || user.address.district;
  user.address.state = data?.address?.state || user.address.state;
  user.address.country = data?.address?.country || user.address.country;
  user.address.postalCode = data?.address?.postalCode || user.address.postalCode;

  // Blob
  if (req.file) {
    user.profileImage = req.file.path;
  }
  user.profileImage = data.profileImage || user.profileImage;

  console.log(user);

  // Save or update
  await user.save((err, profile) => {
    if (err) {
      console.error(err);
      res.status(400).json({ error: err });
    } else {
      console.log(profile);
      res.status(201).json({ profile });
    }
  })
});

// Fetch Profile(s)
router.post('/find', (req, res) => {
  const count = req.body.count;
  const matches = convertJsonToDot(req.body.matches);
  Profile.find(matches).limit(count).exec((err, data) => {
    if (err) {
      console.error(err);
      res.status(400).json({ error: err });
    } else {
      if (data.length === 1) {
        data = data[0];
      }
      console.log(data);
      res.status(200).json(data);
    }
  });
});

router.post('/getUser', (req, res) => {
  console.log(req.body);
  const data = {};
  if (req.body.email) { data.email = req.body.email }
  if (req.body.id) { data.id = req.body.id }
  Profile.findOne(data).exec((err, data) => {
    if (err) {
      console.error(err);
      res.status(400).json({ error: err })
    } else {
      console.log(data);
      res.status(200).json(data);
    }
  });
})


router.get('/', (req, res) => {
  res.send({ message: "Hi", from: "PROFILE" }).sendStatus(200);
})

module.exports = router;