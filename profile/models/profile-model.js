const mongoose = require("mongoose");

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
    }
});

const nameSchema = new Schema({
    firstName: String,
    middleName: String,
    lastName: String,
});

const identityGroup = {
    userName: String,
    designation: {
        type: String,
        enum: ['Dr.', 'Mr.', 'Er.', 'Prof.'],
        default: 'Dr.'
    },
    imrNumber: String,
    name: {
        type: nameSchema,
        required: [true, "Name Required"]
    },
};

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
    clinic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clinicSchema',
        // required: true,
    },
    isDoctor: {
        type: Boolean,
        required: [true, "Need to be either doctor or patient"]
    },
    password: {
        type: String,
        required: [true, "Needs password for authentication"],
    },
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

profileSchema.pre("save", async (next) => {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    next();
})

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;