const express = require("express");

const router = express.Router();
const Users = require("../models/signupmodel");


router.post("/", async (req, res) => {
    try {
        const emailid = req.body.email;
        const pass = req.body.password;
        const user = await Users.findOne({
            email: emailid
        });
        if (user && user.password === pass) {

            // //generate token using jwt 
            // const token = await user.generateAuthToken();
            // //set the cookie in browser
            // res.cookie("jwt", token, {
            //     expires: new Date(Date.now() + 1500000),
            //     httpOnly: true
            // });
            console.log("user verified")

            
        }
        else {
            // res.send("Password Wrong!!!!");
            var data = { error: "Unauthorized Access!", data: "You have entered invalid credentials." }
            console.log("Unauthorized Access!")
            // res.render("login", data);
        }

    } catch (error) {
        // res.status(400).send(error);
        var data = { error: "Unauthorized Access!", data: "You have entered invalid credentials." }
        console.log("in catch", error);
        res.render("login", data);
    }
});

module.exports = router;