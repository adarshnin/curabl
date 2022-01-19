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
    }

    
    
})
module.exports = mongoose.model("schedulingTable",schedulingSchema);