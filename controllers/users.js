const {
  createUser,
  loginUser,
  logout,
  updateUser,
} = require("../services/users");

const { HttpError } = require("../helpers/index");

const signupUser = async (req, res, next) => {
  const { email, subscription } = await createUser(req.body);

  res.status(201).json({
    user: {
      email,
      subscription,
    },
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

module.exports = {
  signupUser,
  signinUser,
  logoutUser,
  getCurrentUser,
  updateSubscription,
};
