const express = require("express");
const { checkSchema } = require('express-validator');

const { Doctor, Patient } = require("../models");
const { signInSchema, validateRequest } = require("../validators");
const Password = require('../services/password');

const router = express.Router();

router.post("/", [
    checkSchema(signInSchema),
    validateRequest,
], async (req, res) => {
    try {
        console.log(req.body);
        const isDoctor = req.body.isDoctor;
        const Profile = isDoctor ? Doctor : Patient;
        const emailid = req.body.email;
        const pass = req.body.password;
        Profile.find({ email:emailid }).exec((err, data) => {
            if(err){
                res.status(400).send("Error at server side");
                
                var data = { error: "Unauthorized Access!", data: "You have entered invalid credentials." }
                console.log("Unauthorized Access!")
                
            }
            else{
                if (data && await Password.compare(data.password, pass)) {
                    // //generate token using jwt 
                    // const token = await user.generateAuthToken();
                    // //set the cookie in browser
                    // res.cookie("jwt", token, {
                    //     expires: new Date(Date.now() + 1500000),
                    //     httpOnly: true
                    // });
                    console.log("user verified");
                    res.status(200).json(user);
                } else {
                    // res.send("Password Wrong!!!!");
                    var data = { error: "Unauthorized Access!", data: "You have entered invalid credentials." }
                    console.log("Unauthorized Access!")
                    res.status(403).json(data);
                    // res.render("login", data);
                }
                console.log(data,data.length);
            }
        })
        

    } catch (error) {
        // res.status(400).send(error);
        // var data = { error: "Unauthorized Access!", data: "You have entered invalid credentials." }
        console.log("in catch", error);
        res.status(500).json({ error });
    }
});

module.exports = router;