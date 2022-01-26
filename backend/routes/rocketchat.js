const express = require('express');
const router = express.Router();
const axios = require('axios');

// this is the endpoint configured as API URL
router.post('/sso', function (req, res) {
  axios.post('http://20.204.25.234:3000/api/v1/login', {
    username: 'curabl',
    password: 'ubuntu123'
  }).then(function (response) {
    if (response.data.status === 'success') {
      res.json({
        loginToken: response.data.data.authToken
      });
    }
  }).catch(function () {
    res.sendStatus(401);
  });
});

// receives login information
router.post('/login', function (req, res) {
  // otherwise create a rocket.chat session using rocket.chat's API
  axios.post('http://20.204.25.234:3000/api/v1/login', {
    username: 'curabl',
    password: 'ubuntu123'
  }).then(function (response) {
    if (response.data.status === 'success') {
      // since this endpoint is loaded within the iframe, we need to communicate back to rocket.chat using `postMessage` API
      res.set('Content-Type', 'text/html');
      res.send(`<script>
				window.parent.postMessage({
					event: 'login-with-token',
					loginToken: '${response.data.data.authToken}'
				}, 'http://localhost:3000'); // rocket.chat's URL
				</script>`);
    }
  }).catch(function () {
    res.sendStatus(401);
  });
});

module.exports = router;