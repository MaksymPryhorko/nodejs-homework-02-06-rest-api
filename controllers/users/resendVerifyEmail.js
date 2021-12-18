/* eslint-disable quotes */
/* eslint-disable semi */
const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error(`Contact whith email - ${email} not found.`);
    error.status = 404;
    // or use package "http-errors"
    throw error;
  }

  if (user.verify || !user.verificationToken) {
    const error = new Error("Verification has already been passed");
    error.status = 400;
    // or use package "http-errors"
    throw error;
  }

  const mail = {
    to: email,
    subject: "Подтверждение email.",
    html: `<a target="_blanc" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Подтвердите email.</a>`,
  };

  await sendEmail(mail);
  res.status(200).json({
    status: "success",
    code: 201,
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
