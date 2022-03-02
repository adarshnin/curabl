require("dotenv").config({ path: __dirname + '/.env' });

const mongoose = require("mongoose");
//const jwt = require("jsonwebtoken");


const cityMed = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    doctorId: {
        type: String,
        required: true
    },
    patientId: {
        type: String,
        required: true
    },
    doctorName: {
        type: String,
        required: false
    },
    patientName: {
        type: String,
        required: false
    },
    medicineName: {
        type: String,
        required: true
    },
    medicineQuantity: {
        type: String,
        required: true
    },
    hospitalName: {
        type: String,
        required: true
    },
    hospitalID: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
})
module.exports = mongoose.model("citymed", cityMed);