const Joi = require("joi");

const schemaRegister = Joi.object({
  password: Joi.string().min(6).required().messages({
    "string.min": "Name should have a minimum length of 6 characters",
    "any.required": "Password is required",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
  }),
  subscription: Joi.string().valid("starter", "pro", "business").messages({
    "string.valid": "This subscription is not valid",
  }),
  token: Joi.string(),
});

const schemaLogin = Joi.object({
  password: Joi.string().min(6).required().messages({
    "string.min": "Name should have a minimum length of 6 characters",
    "any.required": "Password is required",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
  }),
});

module.exports = { schemaRegister, schemaLogin };
