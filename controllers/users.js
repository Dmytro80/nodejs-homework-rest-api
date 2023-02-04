const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const {
  createUser,
  loginUser,
  logout,
  updateUser,
  verifyUserEmail,
  sendLinkVerify,
} = require("../services/users");

const { HttpError } = require("../helpers/index");

const avatarsPath = path.join(__dirname, "../", "public", "avatars");

const signupUser = async (req, res, next) => {
  const { email, subscription } = await createUser(req.body);

  res.status(201).json({
    user: {
      email,
      subscription,
    },
  });
};

const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;

  await verifyUserEmail(verificationToken);

  res.json({ message: "Verification successful" });
};

const resendLinkVerify = async (req, res, next) => {
  const { email } = req.body;

  await sendLinkVerify(email);

  res.json({
    message: "Verification email sent",
  });
};

const signinUser = async (req, res, next) => {
  const result = await loginUser(req.body);

  res.status(200).json(result);
};

const logoutUser = async (req, res, next) => {
  await logout(req.user._id);

  res.sendStatus(204);
};

const getCurrentUser = async (req, res, next) => {
  const { user } = req;

  res.json({ email: user.email, subscription: user.subscription });
};

const updateSubscription = async (req, res, next) => {
  const { user } = req;

  const result = await updateUser(user._id, req.body);

  if (!result) {
    throw new HttpError(404, "Not found user");
  }
  res.json({ email: result.email, subscription: result.subscription });
};

const updateAvatar = async (req, res, next) => {
  if (!req.file) {
    throw new HttpError(404, "Bad request");
  }

  try {
    const { path: tempPath, filename } = req.file;
    const { _id } = req.user;

    const image = await Jimp.read(tempPath);
    await image.autocrop().cover(250, 250).writeAsync(tempPath);

    const [extension] = filename.split(".").reverse();
    const avatarName = `${_id}.${extension}`;
    const fullAvatarPath = path.join(avatarsPath, avatarName);

    await fs.rename(tempPath, fullAvatarPath);

    const avatarURL = path.join("avatars", avatarName);

    console.log("avatarURL", avatarURL);
    await updateUser(_id, { avatarURL });

    res.status(200).json({ avatarURL });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};
module.exports = {
  signupUser,
  signinUser,
  logoutUser,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  resendLinkVerify,
};
