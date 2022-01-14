const express = require('express');
const Password = require('../services/password');
const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body);
  res.send(req.body).sendStatus(201);
});

router.get('/', (req, res) => {
  console.log(req.body);
  Password();
  res.sendStatus(200);
})

router.get('/', (req, res) => {
  res.send({message: "Hi", from: "PROFILE"}).sendStatus(200);
})

module.exports = router;