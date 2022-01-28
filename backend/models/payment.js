require("dotenv").config({ path: __dirname + '/.env' });

const mongoose = require("mongoose");
//const jwt = require("jsonwebtoken");


const paymentSchema = new mongoose.Schema({
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
    paymentID: {
        type: String,
        required: true
    },
    orderID: {
        type: String,
        required: true
    },
    signature: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    // If payment is cancelled -- refund issued
    status: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model("payments", paymentSchema);