require("dotenv").config({ path: __dirname + '/.env' });

const mongoose = require("mongoose");
//const jwt = require("jsonwebtoken");


const signupSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true,
        unique: true
    },
   
    password: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default:Date.now()
    }
    
})
module.exports = mongoose.model("signupTable",signupSchema);