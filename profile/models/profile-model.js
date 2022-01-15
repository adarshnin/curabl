const mongoose = require("mongoose");
const Password = require("../services/password");

const { Schema } = mongoose;

const addressSchema = new Schema({
    houseNo: String,
    area: String,
    street: String,
    city: String,
    state: String,
    postalCode: String,
});

const contactGroup = {
    email: {
        type: String,
        required: [true, "Email Required"],
        unique: true,
    },
    contactNo: [String],
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
        enum: ['Dr.', 'Mr.','Mrs.','Miss', 'Er.', 'Prof.'],
        default: 'Mr.'
    },
    imrNumber: {
        type: String,
    },
    name: {
        type: nameSchema,
        required: [true, "Name Required"]
    },
};

const chargesSchema = new Schema({
    consultation: Number,
});

const infoGroup = {
    dob: Date,
    age: Number,
    gender: {
        type: String,
        enum: ['male', 'female'],
    },
    profileImage: Buffer,
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
    // {
    //     toJSON: {
    //         transform(doc, ret) {
    //             ret.id = ret._id;
    //             delete ret._id;
    //             delete ret.password;
    //             delete ret.__v;
    //         }
    //     }
    // },
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