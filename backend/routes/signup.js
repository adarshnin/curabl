const express = require("express");
<<<<<<< HEAD
const { restart } = require("nodemon");
const { request, response } = require("../app");
const router = express.Router();
const signuptemplate = require("../models/signupmodel");

router.post("/",(req,res)=>{
    console.log(req.body.name)
    signuptemplate.find({ email:req.body.email}).exec((err, data) => {
        if(err){
            res.status(400).send("Error at server side");
            // res.send("No Data found");
            // console.log(err);
            
        }
        else{
            console.log(data,data.length);
            if(data.length === 0){
                const signedUpUser = new signuptemplate({
                    fullName: req.body.name,
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
                    res.status(204).json(error);
                    console.log(error);
                })
                // res.sendStatus( 201);
                console.log("done");
            }else{
                res.status(201).send("Email already exists");
            }
            // res.send();
        }
        

});
=======
const { checkSchema } = require('express-validator');

const { signUpSchema, validateRequest } = require("../validators");
const { Doctor, Patient } = require("../models");
>>>>>>> 68be3ef2405c508e782910e0873b62e172b84171

const router = express.Router();

<<<<<<< HEAD
    
});


  
=======
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

>>>>>>> 68be3ef2405c508e782910e0873b62e172b84171

module.exports = router;