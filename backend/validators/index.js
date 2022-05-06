const { validationResult } = require('express-validator');
const { userValidationSchema } = require('./profile');
const { signUpSchema } = require('./signup');
const { signInSchema } = require('./signin');
const {AssistantSchema} = require("./validateClnAssistant");


const validateRequest = (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const errors = result.array();
      if (errors.length === 1) {
        return res.status(200).json({ status: 200, error: errors[0] });
      } else {
        return res.status(200).json({ status: 200, errors: errors });
      }
    }
    next();
  } catch (errorWhileProcessingError) {
    next(errorWhileProcessingError);
  }
};

module.exports = { userValidationSchema, signUpSchema, signInSchema, validateRequest,AssistantSchema };
