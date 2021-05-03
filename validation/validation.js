const joi = require('@hapi/joi');

loginSchema = joi.object({
    email : joi.string().email().min(6).required(),
    password : joi.string().min(6).required()
});

loginValidation = (data)=>{
  return loginSchema.validate(data);
}


//i will Driver fields validation (when Admin will enter driver informations)
module.exports.loginValidation = loginValidation;