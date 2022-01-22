const express = require("express");
const { checkSchema } = require('express-validator');

const { signUpSchema, validateRequest } = require("../validators");
const { Doctor, Patient } = require("../models");

const router = express.Router();

router.post("/", [
    checkSchema(signUpSchema),
    validateRequest,
], (req, res) => {
    if (req.body && !("isDoctor" in req.body)) {
        res.status(400).json({ error: "isDoctor field not provided" });
    }
    console.log("is Doctor: ", req.body.isDoctor);
    console.log("First Name: ", req.body.firstName)
    console.log("Middle Name: ", req.body.middleName)
    console.log("Last Name: ", req.body.lastName)
    const isDoctor = req.body.isDoctor;
    const Profile = isDoctor ? Doctor : Patient;
    const name = {
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
    };
    const signedUpUser = new Profile({
        name,
        email: req.body.email,
        password: req.body.password,
        isDoctor: req.body.isDoctor,
    });
    // res.send("temp"); 
    console.log("donecheck");
    signedUpUser.save()
        .then(data => {
            res.status(201).json(data);
            console.log(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error });
        });
    console.log("done");
});

router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});


module.exports = router;