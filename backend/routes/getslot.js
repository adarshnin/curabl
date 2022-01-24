const moment = require("moment");
const express = require("express");
const slotmodeltemplate = require("../models/slotmodel");
const router = express.Router();


router.post("/", async (req, res) => {
    try {
        var Date = req.body.Date;
        // Date = moment(Date);
        console.log(Date);
        slotmodeltemplate.find({ date: Date }).sort({ slottime: 1 }).exec((err, data) => {
            if (err) {
                res.send("No Data found");
                console.log(err);
            }
            else {
                console.log(data);
                res.send(data);
            }


        });
        // res.send("Date response got");

        // slotmodeltemplate("date")


    } catch (error) {
        // res.status(400).send(error);

        res.send(error);
    }

});

module.exports = router;