const Joi = require("joi");
const { Schema, model } = require("mongoose");

const contactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).required().messages({
    message: "missing required name field",
  }),
  email: Joi.string().email().required().messages({
    message: "missing required email field",
  }),
  phone: Joi.string().min(7).required().messages({
    message: "missing required phone field",
  }),
  favorite: Joi.boolean(),
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

module.exports = { contactSchema, Contact };
