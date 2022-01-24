const moment = require("moment");
const express = require("express");
const slotmodeltemplate = require("../models/slotmodel");
const router = express.Router();


router.post("/processing", async (req, res) => {
    console.log("in reserve slot")

    try {
        var data = req.body;
        // Date = moment(Date);
        console.log(data.date);
        const filter = { doctorId: data.doctorId, date: data.date, slottime: data.timeslot, status: "free" };
        const update = { status: "processing" };
        let doc = await slotmodeltemplate.findOneAndUpdate(filter, update).exec((err, data) => {
            if (err) {
                res.send(null);
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

router.post("/startBackendTimer", async (req, res) => {
    let cue = 'The actors are here!';
    console.log("in startbacktimer")

    res.send("time applied")

    // After 10 min, if slot is processing, it is freed.
    setTimeout(async function () {
        try {
            var data = req.body;
            // Date = moment(Date);
            console.log(data.date);
            const filter = { doctorId: data.doctorId, date: data.date, slottime: data.timeslot, status: "processing" };
            const update = { status: "free" };
            let doc = await slotmodeltemplate.findOneAndUpdate(filter, update).exec((err, data) => {
                if (err) {
                    // res.send("No Data found");
                    console.log(err);
                }
                else {
                    console.log(data);
                    // res.send(data);
                }


            });
        } catch (error) {
            // res.status(400).send(error);
            console.log("in catch", error);
            // res.send("null");
        }
        return console.log(cue);
    }, 600000);
    // wait 10 min

})

module.exports = router;