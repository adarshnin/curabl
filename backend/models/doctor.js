const mongoose = require("mongoose");
const Password = require("../services/password");
const { ageCalculator } = require('../utils');

const { Schema } = mongoose;

const experienceGroup = {
    services: { type: [String], default: undefined },
    specializations: { type: [String], default: undefined },
    memberships: { type: [String], default: undefined },
    experience: { type: Number },
    education: { type: [String], default: undefined },
    registrations: { type: [String], default: undefined },
    awardsAndRecognition: { type: [String], default: undefined },
    disease: { type: [String], default: undefined },
};

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

const clinicSchema = new Schema({
    licenseNo: {
        type: String,
        unique: true,
    },
    license: String, // URL
    role: String,
    ...contactGroup,
    email: {
        type: String,
        required: [true, "Clinic Mail Required"],
    }
});

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
    imrNumber: {
        type: String,
    },
    name: {
        type: nameSchema,
        required: [true, "Name Required"]
    },
    description: String,
};

const chargesSchema = new Schema({
    consultation: Number,
});

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
    ...experienceGroup,
};

const doctorSchema = new Schema({
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
    clinic: clinicSchema,
    fees: chargesSchema,
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

doctorSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    next();
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = { Doctor };
