const { ValidationError } = require("../helpers/index");

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(new ValidationError(error.message));
    }

    return next();
  };
};

module.exports = {
  validateBody,
};
