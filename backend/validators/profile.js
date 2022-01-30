const { signUpSchema } = require('./signup');
const { bloodGroup, designation, countries, country, gender, } = require('../arrays');

const houseNo = {
  in: 'body',
  optional: { options: { nullable: true } },
  trim: true,
  isString: {
    errorMessage: 'invalid houseNo',
    bail: true,
  },
  isLength: {
    errorMessage: 'houseNo should be max 30 characters',
    options: { max: 30 },
    bail: true,
  }
};
const street = {
  in: 'body',
  optional: { options: { nullable: true } },
  trim: true,
  isString: {
    errorMessage: 'invalid street',
    bail: true,
  },
  isLength: {
    errorMessage: 'street should be max 30 characters',
    options: { max: 30 },
    bail: true,
  }
};
const landmark = {
  in: 'body',
  optional: { options: { nullable: true } },
  trim: true,
  isString: {
    errorMessage: 'invalid landmark',
    bail: true,
  },
  isLength: {
    errorMessage: 'landmark should be max 30 characters',
    options: { max: 30 },
    bail: true,
  }
};
const area = {
  in: 'body',
  optional: { options: { nullable: true } },
  trim: true,
  isString: {
    errorMessage: 'invalid area',
    bail: true,
  },
  isLength: {
    errorMessage: 'area should be max 30 characters',
    options: { max: 30 },
    bail: true,
  }
};// Village/City/Town
const district = {
  in: 'body',
  optional: { options: { nullable: true } },
  isString: {
    errorMessage: 'invalid district',
    bail: true,
  },
  isLength: {
    errorMessage: 'district should be max 30 characters',
    options: { max: 30 },
    bail: true,
  }
};
const state = {
  in: 'body',
  optional: { options: { nullable: true } },
  trim: true,
  isString: {
    errorMessage: 'invalid state',
    bail: true,
  },
  isLength: {
    errorMessage: 'state should be max 30 characters',
    options: { max: 30 },
    bail: true,
  },
  custom: {
    bail: true,
    errorMessage: 'given state is not in the given country',
    options: (value, { req }) => {
      if (req.body && req.body.address && req.body.address.country) {
        return country[req.body.address.country].states.find(ele => ele === value);
      }
    },
  }
};
const nation = {
  in: 'body',
  optional: { options: { nullable: true } },
  trim: true,
  isString: {
    errorMessage: 'invalid country',
    bail: true,
  },
  isIn: {
    errorMessage: 'country should be max 30 characters',
    options: [countries],
    bail: true,
  }
};
const postalCode = {
  in: 'body',
  optional: { options: { nullable: true } },
  trim: true,
  isPostalCode: {
    options: 'IN',
    bail: true,
  },
};
const contactNo = {
  in: 'body',
  optional: { options: { nullable: true } },
  trim: true,
  isMobilePhone: {
    errorMessage: 'Invalid mobile phone number',
    // options: 'IN',
    bail: true,
  }
};
const address = {
  in: 'body',
  optional: { options: { nullable: true } },
  customSanitizer: {
    options: (value) => {
      console.log(value);
      if (typeof value === 'string') {
        return JSON.parse(value);
      }
      return value;
    }
  },
  isObject: {
    errorMessage: 'address should be an object',
    bail: true,
  },
};


const userValidationSchema = {
  'isDoctor': signUpSchema['isDoctor'],
  'password': {
    in: 'body',
    trim: true,
    isString: {
      errorMessage: 'invalid password',
      bail: true,
    },
  },
  'email': {
    in: 'body',
    exists: {
      errorMessage: 'email should be provided',
      bail: true,
    },
    isEmail: {
      errorMessage: 'invalid email',
      bail: true,
    },
    normalizeEmail: true,
    // custom: {
    //   bail: true,
    //   errorMessage: "Try different email",
    //   options: (value) => {
    //     return new Promise((resolve, reject) => {
    //       Doctor.findOne({ email: value }).exec((err, data) => {
    //         err || !isNull(data) ? reject(false) :
    //           Patient.findOne({ email: value }).exec((err, data) => {
    //             err || !isNull(data) ? reject(false) : resolve(true);
    //           });
    //       });
    //     });
    //   }
    // }
  },
  'name': {
    in: 'body',
    exists: {
      errorMessage: 'name should be provided',
      bail: true,
    },
    customSanitizer: {
      options: (value) => {
        console.log(value);
        if (typeof value === 'string') {
          return JSON.parse(value);
        }
        return value;
      }
    },
    isObject: {
      errorMessage: 'name should be an object',
      bail: true,
    },
  },
  'name.firstName': {
    in: 'body',
    exists: {
      errorMessage: 'firstName should be provided',
      bail: true,
    },
    trim: true,
    isString: {
      errorMessage: 'invalid firstName',
      bail: true,
    },
    isLength: {
      errorMessage: 'firstName should be 8 to 30 characters',
      options: { min: 2, max: 30 },
      bail: true,
    }
  },
  'name.middleName': {
    in: 'body',
    exists: {
      errorMessage: 'middleName should be provided',
      bail: true,
    },
    trim: true,
    isString: {
      errorMessage: 'invalid middleName',
      bail: true,
    },
    isLength: {
      errorMessage: 'middleName should be 8 to 30 characters',
      options: { min: 2, max: 30 },
      bail: true,
    }
  },
  'name.lastName': {
    in: 'body',
    exists: {
      errorMessage: 'lastName should be provided',
      bail: true,
    },
    trim: true,
    isString: {
      errorMessage: 'invalid lastName',
      bail: true,
    },
    isLength: {
      errorMessage: 'lastName should be 8 to 30 characters',
      options: { min: 2, max: 30 },
      bail: true,
    }
  },
  address,
  'address.houseNo': houseNo,
  'address.street': street,
  'address.landmark': landmark,
  'address.area': area,
  'address.district': district,
  'address.state': state,
  'address.country': nation,
  'address.postalCode': postalCode,
  contactNo,
  'dob': {
    in: 'body',
    optional: { options: { nullable: true } },
    trim: true,
    customSanitizer: {
      options: (value) => {
        return new Date(value).toLocaleDateString();
      }
    },
    isDate: {
      errorMessage: 'Should be date',
      options: { format: 'DD/MM/YYYY' },
      bail: true,
    },
  },
  'profileImage': {
    in: 'body',
    optional: { options: { nullable: true } },
    trim: true,
    isURL: {
      errorMessage: 'Invalid url',
      bail: true,
    }
  },
  'age': {
    in: 'body',
    optional: { options: { nullable: true } },
    trim: true,
    isString: {
      errorMessage: 'Invalid age',
      bail: true,
    }
  },
  'description': {
    in: 'body',
    optional: { options: { nullable: true } },
    trim: true,
    isString: {
      errorMessage: 'invalid description',
      bail: true,
    },
    isLength: {
      errorMessage: 'description should be max 100 characters',
      options: { max: 100 },
      bail: true,
    }
  },
  'designation': {
    in: 'body',
    optional: { options: { nullable: true } },
    trim: true,
    isString: {
      errorMessage: 'wrong type for designation',
      bail: true,
    },
    isIn: {
      options: [designation],
      errorMessage: 'invalid designation',
    }
  },
  'gender': {
    in: 'body',
    optional: { options: { nullable: true } },
    trim: true,
    isString: {
      errorMessage: 'wrong type for gender',
      bail: true,
    },
    isIn: {
      options: [gender],
      errorMessage: 'invalid gender',
    }
  },
  'bloodGroup': {
    in: 'body',
    optional: { options: { nullable: true } },
    trim: true,
    isString: {
      errorMessage: 'wrong type for blood group',
      bail: true,
    },
    isIn: {
      options: [bloodGroup],
      errorMessage: 'invalid blood group',
    }
  },
  imrNumber: {
    in: 'body',
    optional: { options: { nullable: true } },
    trim: true,
    isString: {
      errorMessage: 'wrong type for imr number',
      bail: true,
    },
  },
  fees: {
    in: 'body',
    optional: { options: { nullable: true } },
    customSanitizer: {
      options: (value) => {
        console.log("Value", typeof value, value);
        if (typeof value === 'string') {
          return JSON.parse(value);
        }
        return value;
      }
    },
    isObject: {
      errorMessage: 'fees should be an object',
      bail: true,
    },
  },
  'fees.consultation': {
    in: 'body',
    optional: { options: { nullable: true } },
    isNumeric: {
      errorMessage: 'consulation fees should be a number',
      bail: true,
    },
  },
  clinic: {
    in: 'body',
    optional: { options: { nullable: true } },
    customSanitizer: {
      options: (value) => {
        console.log(value);
        if (typeof value === 'string') {
          return JSON.parse(value);
        }
        return value;
      }
    },
    isObject: {
      errorMessage: 'clinic should be an object',
      bail: true,
    },
  },
  'clinic.contactNo': contactNo,
  'clinic.address': address,
  'clinic.address.houseNo': houseNo,
  'clinic.address.street': street,
  'clinic.address.landmark': landmark,
  'clinic.address.area': area,
  'clinic.address.district': district,
  'clinic.address.state': state,
  'clinic.address.country': nation,
  'clinic.address.postalCode': postalCode,
  'clinic.licenseNo': {
    in: 'body',
    optional: { options: { nullable: true } },
    trim: true,
    isString: {
      errorMessage: 'wrong type for clinic license number',
      bail: true,
    },
  },
  'clinic.license': {
    in: 'body',
    optional: { options: { nullable: true } },
    trim: true,
    isURL: {
      errorMessage: 'wrong type for clinic license',
      bail: true,
    },
  }, // URL
  'clinic.role': {
    in: 'body',
    optional: { options: { nullable: true } },
    trim: true,
    isString: {
      errorMessage: 'wrong type for role in clinic',
      bail: true,
    },
  },
  'clinic.email': {
    in: 'body',
    optional: { options: { nullable: true } },
    trim: true,
    isEmail: {
      errorMessage: "Invalid clinic email",
      bail: true,
    },
    // unique
  },
  services: {
    in: 'body',
    optional: { options: { nullable: true } },
    customSanitizer: {
      options: (value) => {
        console.log(value);
        if (typeof value === 'string') {
          return JSON.parse(value);
        }
        return value;
      }
    },
    isArray: true,
  },
  disease: {
    in: 'body',
    optional: { options: { nullable: true } },
    customSanitizer: {
      options: (value) => {
        console.log(value);
        if (typeof value === 'string') {
          return JSON.parse(value);
        }
        return value;
      }
    },
    isArray: true,
  },
  specializations: {
    in: 'body',
    optional: { options: { nullable: true } },
    customSanitizer: {
      options: (value) => {
        console.log(value);
        if (typeof value === 'string') {
          return JSON.parse(value);
        }
        return value;
      }
    },
    isArray: true,
  },
  memberships: {
    in: 'body',
    optional: { options: { nullable: true } },
    customSanitizer: {
      options: (value) => {
        console.log(value);
        if (typeof value === 'string') {
          return JSON.parse(value);
        }
        return value;
      }
    },
    isArray: true,
  },
  experience: {
    in: 'body',
    optional: { options: { nullable: true } },
    isNumeric: true,
  },
  education: {
    in: 'body',
    optional: { options: { nullable: true } },
    customSanitizer: {
      options: (value) => {
        console.log(value);
        if (typeof value === 'string') {
          return JSON.parse(value);
        }
        return value;
      }
    },
    isArray: true,
  },
  registrations: {
    in: 'body',
    optional: { options: { nullable: true } },
    customSanitizer: {
      options: (value) => {
        console.log(value);
        if (typeof value === 'string') {
          return JSON.parse(value);
        }
        return value;
      }
    },
    isArray: true,
  },
  awardsAndRecognition: {
    in: 'body',
    optional: { options: { nullable: true } },
    customSanitizer: {
      options: (value) => {
        console.log(value);
        if (typeof value === 'string') {
          return JSON.parse(value);
        }
        return value;
      }
    },
    isArray: true,
  },
  'services.*': {
    in: 'body',
    optional: { options: { nullable: true } },
    isString: {
      errorMessage: 'elements of services should be of type string',
      bail: true,
    }
  },
  'specializations.*': {
    in: 'body',
    optional: { options: { nullable: true } },
    isString: {
      errorMessage: 'elements of specializations should be of type string',
      bail: true,
    }
  },
  'memberships.*': {
    in: 'body',
    optional: { options: { nullable: true } },
    isString: {
      errorMessage: 'elements of memberships should be of type string',
      bail: true,
    }
  },
  'experience.*': {
    in: 'body',
    optional: { options: { nullable: true } },
    isString: {
      errorMessage: 'elements of experience should be of type string',
      bail: true,
    }
  },
  'education.*': {
    in: 'body',
    optional: { options: { nullable: true } },
    isString: {
      errorMessage: 'elements of education should be of type string',
      bail: true,
    }
  },
  'registrations.*': {
    in: 'body',
    optional: { options: { nullable: true } },
    isString: {
      errorMessage: 'elements of registrations should be of type string',
      bail: true,
    }
  },
  'awardsAndRecognition.*': {
    in: 'body',
    optional: { options: { nullable: true } },
    isString: {
      errorMessage: 'elements of awardsAndRecognition should be of type string',
      bail: true,
    }
  },
};

module.exports = { userValidationSchema };