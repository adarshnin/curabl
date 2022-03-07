require("dotenv").config({ path: __dirname + '/.env' });

const mongoose = require("mongoose");
//const jwt = require("jsonwebtoken");


const clinicAssistantSchema = new mongoose.Schema({
    
    email:{
        type: String,
        required: true
    },
    name:{
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    clinicid:{
        type: String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    post:{
        type:String,
        required:true
    }
    
})
module.exports = mongoose.model("clinicAssistantSchema", clinicAssistantSchema);