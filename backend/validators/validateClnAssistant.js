const { clinicAssistantSchema } = require("../models");
const { isNull } = require("../utils");

const AssistantSchema = {
  
  
  'Email': {
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
      errorMessage: "Email already exist",
      options: (value) => {
          console.log("Email", value)
        return new Promise((resolve, reject) => {
            clinicAssistantSchema.findOne({ email: value }).exec((err, data) => {
            console.log("hello world",err, isNull(data));
            err || !isNull(data) ? reject(false) :resolve(true);              
          });
        });
      }
    }
    
},
  'Name': {
    in: 'body',
    exists: {
      errorMessage: 'Name should be provided',
      bail: true,
    },
    trim: true,
    isString: {
      errorMessage: 'invalid Name',
      bail: true,
    },
    isLength: {
      errorMessage: 'firstName should be 8 to 30 characters',
      options: { min: 2, max: 33 },
      bail: true,
    }
  },
  "person":{
    in:"body",
    exists:{
        errorMessage:"Select the Post of the person",
        bail: true,
    },
    
    },
  "phone":{
    in:"body",
    exists:{
        errorMessage:"Please enter phone number",
        bail: true,
    },
    trim: true,
    isMobilePhone: {
        errorMessage: 'Invalid mobile phone number',
        // options: 'IN',
        bail: true,
    }
  },
  
}

  


module.exports = { AssistantSchema };