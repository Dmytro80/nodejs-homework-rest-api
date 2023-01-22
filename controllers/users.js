const { createUser, loginUser, logout } = require("../services/users");

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

module.exports = { signupUser, signinUser, logoutUser, getCurrentUser };
