const moment = require("moment");
const express = require("express");
const slotmodeltemplate = require("../models/slotmodel");
const { Patient } = require("../models");

const router = express.Router();


router.post("/", async (req, res) => {
    try {
        // var Date = req.body.Date;
        // var doctor_id = req.body.
        //     // Date = moment(Date);
        console.log("userid " ,req.body.userid);
        Patient.find({ _id: req.body.userid }).exec((err, data) => {
            if (err) {
                res.send("Errors found");
                console.log(err);
            }
            else {
                // console.log(data,data[0].name);
                if (data !== []){
                    res.send(data[0].name);
                }
                else{
                    res.send(data);
                }
            }


        });



    } catch (error) {

        res.send(error);
    }

});



module.exports = router;