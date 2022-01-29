require("dotenv").config({ path: __dirname + '/.env' });

const mongoose = require("mongoose");
//const jwt = require("jsonwebtoken");


const schedulingSchema = new mongoose.Schema({
    doctorId: {
        type: String,
        required: true
    }, 
    date:{
        type: String,
        required:true
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
    orderid:{
        type: String,
        required: false
    },
    signature:{
        type: String,
        required: false
    },
    // evening/afternoon.
    dayperiod: {
        type: String,
        required: true
    },

    // Free, Booked, or In process
    status :{
        type: String,
        required: true
    }
    
})
module.exports = mongoose.model("schedulingTable",schedulingSchema);