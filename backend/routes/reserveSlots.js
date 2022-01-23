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

router.post("/startBackendTimer", async (req, res) => {
    let cue = 'The actors are here!';
    console.log("in startbacktimer")

    res.send("time applied")

    // However, the cue is not announced until at least 5000ms have
    // passed through the use of setTimeout
    setTimeout(async function () {
        try {
            var data = req.body;
            // Date = moment(Date);
            console.log(data.date);
            const filter = { doctorId: data.doctorId, date: data.date, slottime: data.timeslot, Status: "processing" };
            const update = { Status: "free" };
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