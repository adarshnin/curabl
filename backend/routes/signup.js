const express = require("express");
const { restart } = require("nodemon");
const { request, response } = require("../app");
const router = express.Router();
const signuptemplate = require("../models/signupmodel");

router.post("/",(req,res)=>{
    console.log(req.body.fullName)



    const signedUpUser = new signuptemplate({
        fullName: req.body.fullName,
        email: req.body.email,
        password : req.body.password 
    });
    // res.send("temp"); 
    console.log("donecheck");
    signedUpUser.save()
    .then(data =>{
        res.json(data);
        console.log(data);
    })
    .catch(error =>{
        res.json(error);
        console.log(error);
    })
    // res.sendStatus( 201);
    console.log("done");
});

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });
  

module.exports = router;