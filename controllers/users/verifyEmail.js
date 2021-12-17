/* eslint-disable quotes */
/* eslint-disable semi */
const { User } = require("../../models");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    const error = new Error(`Contact whith ${verificationToken} not found.`);
    error.status = 404;
    // or use package "http-errors"
    throw error;
  }
  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });
  res.json({
    message: "Verify success",
  });
};

module.exports = verifyEmail;
