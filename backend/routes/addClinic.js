const moment = require("moment");
const express = require("express");
const clinicmodeltemplate = require("../models/clinic.js");
const router = express.Router();
const { assignPropsUpload, assignEmptyObj, convertJsonToDot, upload, assignPropsVal, assignPropsBooleanVal } = require('../utils');


router.post("/", async (req, res) => {
    console.log("in save clinic")
    let addressProps = ['houseNo', 'street', 'landmark', 'area', 'district', 'state', 'country', 'postalCode',]
    let nameProps = ['clinicname'];
    let dateProps = ['date'];

    var data = req.body;
    console.log("Data - ", data);

    console.log(data.instruments)

    
    try {
        // Date = moment(Date);
        let clinic = new clinicmodeltemplate({
            date: data.date,
            address: data.address,
            clinicName: data.clinicname,
            instrument: data.instruments
        }
        );

        console.log(data.date);
        // , userid: data.patientId Add this @@@@@@@@

        // res.send("temp"); 
        console.log("donecheck");
        clinic.save()
            .then(data => {
                res.json(data);
                console.log(data);
            })
            .catch(error => {
                res.json(error);
                console.log(error);
            })
        // res.sendStatus( 201);
        console.log("clinic saved");
    } catch (error) {
        // res.status(400).send(error);
        console.log("in catch", error);
        res.send(null);
    }

});

module.exports = router;