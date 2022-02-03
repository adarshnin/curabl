// const moment = require("moment");
const express = require("express");
 const PrescriptionSchema = require("../models/prescriptionTable");
const router = express.Router();


router.post("/", async (req, res) => {
    console.log(req.body);
    
    
    const Prescription = new PrescriptionSchema({
        doctorId: req.body.doctorId,                 
        date:req.body.date,                
        userid:req.body.userid,
        patientName:req.body.patientName,
        doctorName:req.body.doctorName,
        disease:req.body.disease,            
        medicines:req.body.medicines
        
    });
    // res.send("temp"); 
    // console.log("donecheck");
    Prescription.save()
        .then(data => {
            res.status(201).json({message:"Successfully Signup"});
            console.log(data);
        })
        .catch(error => {
            var data = { error: "Unauthorized Access!", message: "Retry!! Unable to sign up" }
            console.log("Unauthorized Access!")
            res.status(201).json(data);
            // console.log(error);
            // res.status(500).json({ error });
        });
    console.log("done")
});

module.exports = router;