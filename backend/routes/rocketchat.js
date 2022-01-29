const express = require('express');
const router = express.Router();
const axios = require('axios');

const rocketChatUrl = process.env.ROCKETCHAT_SERVER_URL;

// const rocketChatSignUp = async (res, { email, password, name, username, id }, model) => {
//   let response;
//   console.log(rocketChatUrl);
//   try {
//     response = await axios.post(`${rocketChatUrl}api/v1/users.register`, {
//       username,
//       email,
//       pass: password,
//       name,
//     });
//   } catch (err) {
//     console.error("Error", err);
//     res.status(500).json({ error: err });
//     return;
//   }
//   console.log("RocketChat Successful Response", response);
//   const rocketChat = {
//     username: response.data.user.username,
//     _id: response.data.user._id,
//     password,
//     name: response.data.user.name,
//   }
//   const user = await model.findById(id);
//   user.rocketChat = rocketChat;
//   await user.save((err, profile) => {
//     if (err) {
//       console.error(err);
//       res.status(400).json({ error: err });
//       return;
//     } else {
//       console.log(profile);
//       return profile;
//     }
//   });
// }

// // This method will be called by Rocket.chat to fetch the login token
// app.get('/rocket_chat_auth_get', (req, res) => {
//   if (req.session.user && req.session.user.rocketchatAuthToken) {
//     res.send({ loginToken: ctx.session.user.rocketchatAuthToken })
//     return;
//   } else {
//     res.status(401).json({ message: 'User not logged in'});
//     return;
//   }
// })


// // this is the endpoint configured as API URL
router.post('/sso', function (req, res) {
  axios.post('https://chat.curabl.me/api/v1/login', {
    username: 'curabl',
    password: 'ubuntu123'
  }).then(function (response) {
    if (response.data.status === 'success') {
      res.status(200).json({
        loginToken: response.data.data.authToken
      });
    }
  }).catch(function () {
    res.sendStatus(401);
  });
});

router.get('/login', (req, res) => {
  res.set('Content-Type', 'text/html')
  res.send(`<h1>Please wait logging in</h1>
  `)
  // res.redirect('/login')
})

router.post('/login', (req, res) => {
  console.log("Logged in with rocket chat")
  axios.post('https://chat.curabl.me/api/v1/login', {
    username: 'curabl',
    password: 'ubuntu123'
  }).then(function (response) {
    console.log(response.data.status)
    if (response.data.status === 'success') {
      res.set('Content-Type', 'text/html')
      res.send(`<script>
window.parent.postMessage({
event: 'login-with-token',
token: '${response.data.data.authToken}'},'https://chat.curabl.me')</script>`)
      // res.status(200).json({
      //   userId: response.data.data.userId,
      //   loginToken: response.data.data.authToken
      // });
    }
  }).catch(function () {
    res.sendStatus(401);
  });
})

// // receives login information
// router.post('/login', function (req, res) {
//   // const {email, username, password, authToken} = req.body;

//   // const user = rocketChatSignUp(res, );
//   // otherwise create a rocket.chat session using rocket.chat's API
//   axios.post(`${rocketChatUrl}api/v1/login`, {
//     username: "curabl",
//     password: "ubuntu123",
//   }).then(function (response) {
//     if (response.data.status === 'success') {
//       // since this endpoint is loaded within the iframe, we need to communicate back to rocket.chat using `postMessage` API
//       res.set('Content-Type', 'text/html');
//       res.send(`<script>
// 				window.parent.postMessage({
// 					event: 'login-with-token',
// 					loginToken: '${response.data.data.authToken}'
// 				}, 'http://localhost:3000'); // rocket.chat's URL
// 				</script>`);
//     }
//   }).catch(function () {
//     res.sendStatus(401);
//   });
// });

// const { createOrLoginUser } = require('./rc');

// router.post('/login', async (req, res) => {
//   // ....CODE TO LOGIN USER

//   // Creating or login user into Rocket chat
//   const {middleName, lastName, firstName, } = req.body;

//   try {
//     const response = await createOrLoginUser(username, name, email, password);
//     req.session.user = user;
//     // Saving the rocket.chat auth token and userId in the database
//     user.rocketchatAuthToken = response.data.authToken;
//     user.rocketchatUserId = response.data.userId;
//     await user.save();
//     res.send({ message: 'Login Successful' });
//   } catch (ex) {
//     console.log('Rocket.chat login failed');
//   }
// })

// // This method will be called by Rocket.chat to fetch the login token
// router.get('/rocket_chat_auth_get', (req, res) => {
//   if (req.session.user && req.session.user.rocketchatAuthToken) {
//     // res.send({ loginToken: req.session.user.rocketchatAuthToken })
//     res.send({ loginToken: "3LHRzQSyynsRrEBKD6vsy1EZTufqoQBHw" })
//     return;
//   } else {
//     res.status(401).json({ message: 'User not logged in' });
//     return;
//   }
// })

// // // This method will be called by Rocket.chat to fetch the login token
// // // and is used as a fallback
// router.get('/rocket_chat_iframe', (req, res) => {
//   const rocketChatServer = 'http://localhost:3000';
//   // if (req.session.user && req.session.user.rocketchatAuthToken) {
//     // We are sending a script tag to the front-end with the RocketChat Auth Token that will be used to authenticate the user
//     return res.send(`<script>
//       window.parent.postMessage({
//         event: 'login-with-token',
//         loginToken: '3LHRzQSyynsRrEBKD6vsy1EZTufqoQBHw'
//       }, '${rocketChatServer}');
//     </script>
//     `)
//     return;
//   // } else {
//   //   return res.status(401).send('User not logged in')
//   // }
// })

module.exports = router;
