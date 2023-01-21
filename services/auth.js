const { User } = require("../models/user");
const { HttpError } = require("../helpers/index");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const { SECRET_KEY } = process.env;

const createUser = async (userData) => {
  const { email, password } = userData;

  const user = await User.findOne({ email });
  console.log("user", user);

  if (user) {
    throw new HttpError(409, "Email in use");
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  return User.create({ ...userData, password: hashedPassword });
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpError(401, "Email or password is wrong");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new HttpError(401, "Email or password is wrong");
  }

  const payload = { id: user._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  await User.findByIdAndUpdate(user._id, { token });

  return { token, user: { email, subscription: user.subscription } };
};

const logout = async (id) => {
  await User.findByIdAndUpdate(id, { token: null });
};

module.exports = { createUser, loginUser, logout };
