const { Doctor, Patient } = require("../models");
const { isNull } = require("../utils");

const signUpSchema = {
  'password': {
    in: 'body',
    exists: {
      errorMessage: 'Password should be provided',
      bail: true,
    },
    trim: true,
    isString: {
      errorMessage: 'invalid password',
      bail: true,
    },
    isLength: {
      errorMessage: 'Password should be 8 to 30 characters',
      options: { min: 8, max: 30 },
      bail: true,
    }
  },
  'isDoctor': {
    in: 'body',
    exists: {
      errorMessage: 'isDoctor should be provided',
      bail: true,
    },
    trim: true,
    isBoolean: {
      errorMessage: 'isDoctor should be boolean value',
      bail: true,
    },
    toBoolean: true,
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
    custom: {
      bail: true,
      errorMessage: "Try different email",
      options: (value) => {
        return new Promise((resolve, reject) => {
          Doctor.findOne({ email: value }).exec((err, data) => {
            err || !isNull(data) ? reject(false) :
              Patient.findOne({ email: value }).exec((err, data) => {
                err || !isNull(data) ? reject(false) : resolve(true);
              });
          });
        });
      }
    }
  },
  'firstName': {
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
  'middleName': {
    in: 'body',
    // exists: {
    //   errorMessage: 'middleName should be provided',
    //   bail: true,
    // },
    trim: true,
    isString: {
      errorMessage: 'invalid middleName',
      bail: true,
    },
    isLength: {
      errorMessage: 'middleName should be 8 to 30 characters',
      options: { min: 0, max: 30 },
      bail: true,
    }
  },
  'lastName': {
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
  }
};

module.exports = { signUpSchema };