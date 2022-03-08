const moment = require("moment");
const express = require("express");
const slotmodeltemplate = require("../models/slotmodel");
const { Patient, Doctor } = require("../models");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        // var Date = req.body.Date;
        // var doctor_id = req.body.
        // Date = moment(Date);
        console.log("userid ", req.body.userid);
        Patient.find({ _id: req.body.userid }).exec((err, data) => {
            if (err) {
                res.send("Errors found");
                console.log(err);
            }
            else {
                // console.log(data,data[0].name);
                if (data !== []) {
                    res.send(data[0].name);
                }
                else {
                    res.send(data);
                }
            }
        });
    } catch (error) {
        res.send(error);
    }
});

router.post("/count", async (req, res) => {
    console.log("in here");
    try {
        // var Date = req.body.Date;
        // var doctor_id = req.body.
        Patient.count({}).exec((err, count) => {
            if (err) {
                res.send(err);
                return;
            }
            console.log("total = ", count);
            res.send({count: count});
        });
    } catch (error) {
        res.send(error);
    }
});

router.post("/doccount", async (req, res) => {
    console.log("in here");
    try {
        // var Date = req.body.Date;
        // var doctor_id = req.body.
        Doctor.count({}).exec((err, count) => {
            if (err) {
                res.send(err);
                return;
            }
            console.log("total = ", count);
            res.send({count: count});
        });
    } catch (error) {
        res.send(error);
    }
});



module.exports = router;