const moment = require("moment");
const express = require("express");
const slotmodeltemplate = require("../models/slotmodel");
const clinicAssistantSchema = require("../models/clinicAssistant");

const router = express.Router();
var generator = require('generate-password');
const nodemailer = require('nodemailer');






let transport = nodemailer.createTransport({
    service:"gmail",
    auth: {
       user: process.env.CLINIC_EMAIL,
       pass: process.env.CLINIC_PASSWORD
    }
});


  
  
router.post("/", async (req, res) => {
    try {
        console.log("hello",req.body);
        var password = generator.generate({
            length: 8,
            numbers: true
        });
        // const user = await clinicAssistantSchema.findOne({
        //     email: emailid
        // });
        const data = new clinicAssistantSchema({
            email: req.body?.Email,
            name:req.body?.Name,
            password:password ,
            clinicid:"Clinic123",
            phoneNumber:req.body?.phone,
            post:req.body?.person
            
        });
        data.save()
        .then(data => {
            res.json(data);
            console.log("inschema",data);
            let mailOptions = {
                from: process.env.CLINIC_EMAIL,
                to: req.body.Email,
                subject: `You are hired for work in Curable Clinic`,
                html: '<h2>Hello '+ req.body?.Name + ', </h2><p>We are hiring you for our clinic.</p> <br><p> Email: ' + req.body?.Email 
                  + '</p><p>Password: '+password+'<p/>' +'<p>Please change the password</p>',
                
              };
              
              transport.sendMail(mailOptions, function (err, info) {
                if (err) {
                //   res.json(err);
                    console.log("from email",err);
                } else {
                  console.log("from email",info);
                //   res.json(info);
                }
              });
        })
        .catch(error => {
            res.json(error);
            console.log(error);
        })
    
        


        }
    catch (error) {
        // res.status(400).send(error);

        res.send(error);
    }

});

module.exports = router;