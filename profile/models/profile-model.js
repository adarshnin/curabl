const mongoose = require("mongoose");
const Password = require("../services/password");
const {ageCalculator} = require('../libs/utils');

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

const clinicSchema = new Schema({
    licenseNo: String,
    license: Buffer,
    role: String,
    ...contactGroup,
    email: {
        type: String,
        required: [true, "Clinic Mail Required"],
        unique: true,
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
    age: String,
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

const profileSchema = new Schema({
    ...identityGroup,
    ...infoGroup,
    ...contactGroup,
    isDoctor: {
        type: Boolean,
        required: [true, "Need to be either doctor or patient"]
    },
    password: {
        type: String,
        required: [true, "Needs password for authentication"],
    },
    clinic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clinicSchema',
        // required: true,
    },
    fees: {
        type: chargesSchema,
    }
},
    {
        toJSON: {
            transform(doc, ret) {
                if(ret.dob) {
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

profileSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    next();
})

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;