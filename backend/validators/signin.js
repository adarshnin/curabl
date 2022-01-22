const signInSchema = {
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
  },
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
  }
}

module.exports = { signInSchema };