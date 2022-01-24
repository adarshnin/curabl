// External Imports
const express = require('express');
const { checkSchema } = require('express-validator');

// Custom Imports
const { Patient, Doctor } = require('../models');
const { assignPropsUpload, assignEmptyObj, convertJsonToDot, upload, assignPropsVal, assignPropsBooleanVal } = require('../utils');
const { userValidationSchema, validateRequest } = require('../validators');

// Define
const router = express.Router();

// Delete a Profile
router.delete('/', async (req, res) => {
  const data = req.body;
  const isDoctor = req.body.isDoctor;
  console.log(data);
  let user;
  const Profile = isDoctor ? Doctor : Patient;
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

// Update a Profile
router.post('/',
  [
    upload.single('profileImage'),
    checkSchema(userValidationSchema),
    validateRequest,
  ], async (req, res) => {
    const data = req.body;
    console.log("data", data);
    console.log("req.file", req.file);
    const isDoctor = req.body.isDoctor;
    const Profile = isDoctor ? Doctor : Patient;

    // Fetch or create
    let user;
    if (data.id) {
      user = await Profile.findById(data.id);
    } else if (data.email) {
      user = await Profile.findOne({ email: data.email });
      console.log('Checking email', { email: data.email });
    } else {
      res.status(400).json({ "message": "No unique parameters provided." });
    }
    console.log("Old information of user", user);

    // Field Props
    let requiredProps = ['email', 'password',];
    let nameProps = ['firstName', 'middleName', 'lastName',];
    let infoProps = ['dob', 'bloodGroup', 'gender', 'contactNo', 'designation',];
    let addressProps = ['houseNo', 'street', 'landmark', 'area', 'district', 'state', 'country', 'postalCode',]
    let doctorInfoProps = ['imrNumber', 'description',];
    let experienceProps = ['services', 'specializations', 'memberships', 'experience', 'education', 'registrations', 'awardsAndRecognition',];
    let clinicProps = ['licenseNo', 'license', 'role', 'email', 'contactNo',];
    let feesProps = ['consultation'];
    let objectProps = ['name', 'address',];
    let doctorObjectProps = ['clinic', 'fees',];
    let uploadProps = ['profileImage'];
    let booleanProps = ['isDoctor'];

    if (user) {
      assignEmptyObj(objectProps, user);
      if (isDoctor) {
        assignEmptyObj(doctorObjectProps, user);
      }
    }

    // Set or modify
    // Required Fields
    assignPropsVal(nameProps, data.name, user);
    assignPropsVal(requiredProps, data, user);
    assignPropsBooleanVal(booleanProps, data, user);

    // Not Required Fields
    // Address Schema
    if (data.address) {
      assignPropsVal(addressProps, data.address, user.address);
    }

    // Info Schema
    assignPropsVal(infoProps, data, user);

    if (isDoctor) {
      // Doctor's Info Schema (Additional Fields)
      assignPropsVal(doctorInfoProps, data, user);

      // Charges Schema
      assignPropsVal(feesProps, data.fees, user)

      // Experience Schema
      assignPropsVal(experienceProps, data, user);

      // Clinic Schema
      if (data.clinic) {
        assignPropsVal(clinicProps, data.clinic, user.clinic);
        if (data.clinic.address) {
          assignPropsVal(addressProps, data.clinic.address, user.clinic.address);
        }
      }
    }

    // Blob
    assignPropsUpload(uploadProps, req.file, user);

    console.log("New information Filled", user);

    // Save or update
    await user.save((err, profile) => {
      if (err) {
        console.error(err);
        res.status(400).json({ error: err });
      } else {
        console.log(profile);
        res.status(201).json({ profile });
      }
    });
  });

// Search Profile(s)
router.post('/find', (req, res) => {
  const count = req.body.count;
  const matches = convertJsonToDot(req.body.matches);
  const Profile = req.body.isDoctor ? Doctor : Patient;
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

// Fetch Profile(s)
router.post('/getUser', (req, res) => {
  console.log(req.body);
  const data = {};
  if (req.body.email) { data.email = req.body.email }
  if (req.body.id) { data.id = req.body.id }
  const Profile = req.body.isDoctor ? Doctor : Patient;
  Profile.findOne(data).exec((err, data) => {
    if (err) {
      console.error(err);
      res.status(400).json({ error: err })
    } else {
      console.log(data);
      res.status(200).json(data);
    }
  });
});


router.get('/', (req, res) => {
  res.status(200).json({ message: "Hi", from: "PROFILE" });
})

module.exports = router;