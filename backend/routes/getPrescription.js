const express = require("express");
 const PrescriptionSchema = require("../models/prescriptionTable");
const router = express.Router();


router.post("/", async (req, res) => {
    console.log("in get prescription",req.body);
    // res.send(req.body);
    doctorId=req.body.doctorId ,
    patientId=req.body.patientId,
    slotTime=req.body.slotTime,
    date=req.body.date
    
    try{
        PrescriptionSchema.find({doctorId:doctorId,date:date,patientId:patientId ,slotTime:slotTime}).exec((err, data) => {
            if (err) {
                res.send("Errors found");
                console.log(err);
            }
            else {
                // console.log(data,data[0].name);
                if (data === []){
                    res.send("nodata");
                }
                else{
                    console.log(data)
                    res.send(data);
                }
            }
        });
    } catch (error) {

        res.send(error);
    }
});

module.exports = router;