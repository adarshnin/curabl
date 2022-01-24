const express = require("express");

const router = express.Router();
const Users = require("../models/signupmodel");


router.post("/", async (req, res) => {
    try {
        const emailid = req.body.email;
        const pass = req.body.password;
        signuptemplate.find({ email:emailid }).exec((err, data) => {
            if(err){
                res.status(400).send("Error at server side");
                
                var data = { error: "Unauthorized Access!", data: "You have entered invalid credentials." }
                console.log("Unauthorized Access!")
                
            }
            else{
                console.log(data,data.length);
            }
        })
        

    } catch (error) {
        // res.status(400).send(error);
        var data = { error: "Unauthorized Access!", data: "You have entered invalid credentials." }
        console.log("in catch", error);
        res.render("login", data);
    }
});

module.exports = router;