const { validationResult } = require('express-validator');
const { userValidationSchema } = require('./profile');
const { signUpSchema } = require('./signup');
const { signInSchema } = require('./signin');


const validateRequest = (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const errors = result.array();
      if (errors.length === 1) {
        return res.status(400).json({ status: 400, error: errors[0] });
      } else {
        return res.status(400).json({ status: 400, errors: errors });
      }
    }
    next();
  } catch (errorWhileProcessingError) {
    next(errorWhileProcessingError);
  }
};

module.exports = { userValidationSchema, signUpSchema, signInSchema, validateRequest, };
