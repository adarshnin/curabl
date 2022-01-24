const mongoose = require("mongoose");
const Password = require("../services/password");
const { ageCalculator } = require('../utils');

const { Schema } = mongoose;

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

const contactGroup = {
    email: {
        type: String,
        required: [true, "Email Required"],
        unique: true,
    },
    contactNo: String,
    address: addressSchema,
};

const nameSchema = {
    firstName: String,
    middleName: String,
    lastName: String,
};

const identityGroup = {
    designation: {
        type: String,
        enum: ['Dr.', 'Mr.', 'Mrs.', 'Miss', 'Er.', 'Prof.'],
    },
    name: {
        type: nameSchema,
        required: [true, "Name Required"]
    },
};

const infoGroup = {
    dob: Date,
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
    },
    profileImage: String,
    bloodGroup: {
        type: String,
        enum: ['O+', 'A+', 'B+', 'AB+', 'O+', 'O-', 'A-', 'B-', 'AB-'],
    },
};

const patientSchema = new Schema({
    ...identityGroup,
    ...infoGroup,
    ...contactGroup,
    password: {
        type: String,
        required: true
    },
    isDoctor: {
        type: Boolean,
        required: [true, "Need to be either doctor or patient"]
    },
},
    {
        toJSON: {
            transform(doc, ret) {
                if (ret.dob) {
                    ret.age = ageCalculator(ret.dob);
                } else {
                    delete ret.age;
                }
                ret.userId = ret._id;
                delete ret._id;
                delete ret.password;
                delete ret.__v;
            }
        }
    },
);

patientSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    next();
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = { Patient };
