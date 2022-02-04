require("dotenv").config({ path: __dirname + '/.env' });

const mongoose = require("mongoose");
//const jwt = require("jsonwebtoken");

const medicine = {
        medicine: String,
        duration: String,
        morning: String,
        Afternoon: String,
        night: String,
        MedTime: String,
        instruction:String
}


const PrescriptionSchema = new mongoose.Schema({
    doctorId: {
        type: String,
        required: true
    }, 
    date:{
        type: String,
        required:true
    },

    
    patientId:{
        type: String,
        required: false
    },
    patientName:{
        type: String,
        required:true
    },
    doctorName:{
        type: String,
        required:true
    },
    disease:{
        type: String,
        required:true
    },

    medicines:{
        type: [medicine],
        required:true
    },
    slotTime:{
        type: String,
        required:true
    }

    
    
})
module.exports = mongoose.model("PrescriptionTable",PrescriptionSchema);