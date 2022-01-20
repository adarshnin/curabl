require("dotenv").config({ path: __dirname + '/.env' });

const mongoose = require("mongoose");
//const jwt = require("jsonwebtoken");


const schedulingSchema = new mongoose.Schema({
    doctorId: {
        type: String,
        required: true
    },
    
    
    date:{
        type: Date,
        default:Date.now()
    },

    slottime :{
        type: String,
        required: true
    },
    slotperiod:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: false
    },
    userid:{
        type: String,
        required: false
    },
    paymentid:{
        type: String,
        required: false
    },
    // evening/afternoon.
    dayperoiod: {
        type: String,
        required: true
    },

    // Free, Booked, or In process
    Status :{
        type: String,
        required: true
    }
    
})
module.exports = mongoose.model("schedulingTable",schedulingSchema);