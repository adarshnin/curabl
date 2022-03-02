const express = require("express");
const { checkSchema } = require('express-validator');
const jwt = require("jsonwebtoken");

const  adminSchema   = require("../models/Admin");
const { signInSchema, validateRequest } = require("../validators");
const Password = require('../services/password');

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        console.log(req.body);
        const emailid = req.body?.email;
        const pass = req.body?.password;
        const user = await adminSchema.findOne({
            email: emailid
        });
        if (user && await Password.compare(user.password, pass)) {
            
            console.log("user verified",user._id);
            const token = jwt.sign({id: user._id.toString(),email:user.email},process.env.SECRET,{expiresIn:"1h"});
            console.log(token);
            res.status(200).json({result:{
                id: user.id,
                token: token,
                isadmin:true
            },token :token});
        } else {
            // res.send("Password Wrong!!!!");
            var data = { error: "Unauthorized Access!", message: "You have entered invalid credentials." }
            console.log("Unauthorized Access!")
            res.status(201).json(data);
            // res.render("login", data);
        }
    } catch (error) {
        // res.status(400).send(error);
        var data = { error: "Unauthorized Access!", message: "server Error." }
        console.log("in catch", error);
        res.status(200).json(data);
    }
});

module.exports = router;