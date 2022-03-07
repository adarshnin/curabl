require("dotenv").config({ path: __dirname + '/.env' });

const mongoose = require("mongoose");
const { Schema } = mongoose;
//const jwt = require("jsonwebtoken");

const InstrumentSchema = new mongoose.Schema({ 
    name: String,
    Working : {
        type: Boolean,
        required: true,
        default: false,
    },
    state: {
        type: Boolean,
        required: false,
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
    clinicName: {
        type: String,
        required: false
    },
    address:{
        type: addressSchema,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    instrument: {
        type: [InstrumentSchema],
        required: false
    },
    
})
module.exports = mongoose.model("clinicInfo", clinicInfoSchema);