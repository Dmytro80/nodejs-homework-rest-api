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

const schemaUpdate = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required()
    .messages({
      "any.valid": "This subscription is not valid",
      "any.required": "Subscription is required",
    }),
});

const schemaVerifyEmail = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Missing required field email",
  }),
});

module.exports = {
  schemaRegister,
  schemaLogin,
  schemaUpdate,
  schemaVerifyEmail,
};
