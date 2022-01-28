require("dotenv").config({ path: __dirname + '/.env' });

const mongoose = require("mongoose");
//const jwt = require("jsonwebtoken");


const appointmentSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },

    slottime: {
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
    meetingurl: {
        type: String,
        required: true
    },
    // If appointment is cancelled or rescheduled
    status: {
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
})
module.exports = mongoose.model("appointments", appointmentSchema);