const express = require("express");
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


    
});


  

module.exports = router;