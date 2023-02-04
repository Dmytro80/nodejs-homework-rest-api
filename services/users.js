const { User } = require("../models/user");
const { HttpError, sendEmail } = require("../helpers/index");

const { v4: uuidv4 } = require("uuid");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const { SECRET_KEY } = process.env;

const createUser = async (userData) => {
  const { email, password } = userData;

  const user = await User.findOne({ email });

  if (user) {
    throw new HttpError(409, "Email in use");
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const avatarURL = gravatar.url(email, { s: "250" }, false);

  const verificationToken = uuidv4();

  const newUser = await User.create({
    ...userData,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });

  const verificationMail = {
    to: email,
    subject: "Confirm your email",
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Click to confirm your email</a>`,
  };

  await sendEmail(verificationMail);

  return newUser;
};

const verifyUserEmail = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
};

const sendLinkVerify = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpError(401, "Email or password is wrong");
  }

  if (user.verify) {
    throw new HttpError(400, "Verification has already been passed");
  }

  const verificationMail = {
    to: email,
    subject: "Confirm your email",
    html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}" target="_blank">Click to confirm your email</a>`,
  };

  await sendEmail(verificationMail);
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

  if (!user.verify) {
    throw new HttpError(401, "No email verification");
  }

  const payload = { id: user._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  await User.findByIdAndUpdate(user._id, { token });

  return { token, user: { email, subscription: user.subscription } };
};

const logout = async (id) => {
  await User.findByIdAndUpdate(id, { token: null });
};

const updateUser = async (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true });
};

module.exports = {
  createUser,
  loginUser,
  logout,
  updateUser,
  verifyUserEmail,
  sendLinkVerify,
};
