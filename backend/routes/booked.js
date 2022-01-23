const moment = require("moment");
const express = require("express");
const slotmodeltemplate = require("../models/slotmodel");
const router = express.Router();


router.post("/", async (req, res) => {
    console.log("in reserve slot")

    try {
        var data = req.body;
        // Date = moment(Date);
        console.log(data.date);
        const filter = { doctorId: data.doctorId, date: data.date, slottime: data.timeslot, Status: "free" };
        const update = { Status: "processing" };
        let doc = await slotmodeltemplate.findOneAndUpdate(filter, update).exec((err, data) => {
            if (err) {
                res.send("No Data found");
                console.log(err);
            }
            else {
                console.log(data);
                res.send(data);
            }


        });
    } catch (error) {
        // res.status(400).send(error);
        console.log("in catch", error);
        res.send(null);
    }

});