const jwt = require("jsonwebtoken");

const { HttpError } = require("../helpers/index");
const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(new HttpError(400, error.message));
    }

    return next();
  };
};

const auth = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization || "";

  const [type, token] = authorizationHeader.split(" ");

  if (type !== "Bearer" || !token) {
    throw new HttpError(401, "Not authorized");
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);

    if (!user) {
      throw new HttpError(401, "Not authorized");
    }

    req.user = user;
  } catch (error) {
    throw new HttpError(401, "Not authorized");
  }

  next();
};

module.exports = {
  validateBody,
  auth,
};
