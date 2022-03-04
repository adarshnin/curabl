require("dotenv").config({ path: __dirname + '/.env' });

const mongoose = require("mongoose");
//const jwt = require("jsonwebtoken");

const InstrumentSchema = new mongoose.Schema({ 
    name: String,
    Working : {
        type: Boolean,
        require: true,
        default: false,
    },
    state: {
        type: Boolean,
        require: true,
        default: false,
    },

});
const addressSchema = new Schema({
    houseNo: String,
    street: String,
    landmark: String,
    area: String, // Village/City/Town
    district: String,
    
    state: String,
    country: String,
    postalCode: String,
});

const clinicInfoSchema = new mongoose.Schema({
    clinicId: {
        type: String,
        required: false
    },
    clinicName: {
        type: String,
        required: false
    },
    address:{
        type: addressSchema,
        required: true
    },
    pincode:{
        type:Number,
        required:false
    },
    timestamp: {
        type: String,
        required: true
    },
    instrument: {
        type: [InstrumentSchema],
    },
    
})
module.exports = mongoose.model("clinicInfo", clinicInfoSchema);