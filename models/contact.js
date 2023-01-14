const Joi = require("joi");
const { Schema, model } = require("mongoose");

const contactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).required().messages({
    "string.alphanum": "Name must only contain alpha-numeric characters",
    "string.min": "Name should have a minimum length of 3 characters",
    "any.required": "missing required name field",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "missing required email field",
  }),
  phone: Joi.string().min(7).required().messages({
    "string.min": "Phone should have a minimum length of 7 characters",
    "any.required": "missing required phone field",
  }),
  favorite: Joi.boolean(),
});

const updateStatusSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "missing field favorite",
  }),
});

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Contact = model("contact", schema);

module.exports = { contactSchema, Contact, updateStatusSchema };
