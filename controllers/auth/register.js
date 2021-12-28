/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable semi */
const { User } = require("../../models");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { nanoid } = require("nanoid");
const { sendMail, sendEmail } = require("../../helpers");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const error = new Error(`User ${email} - is already exist.`);
    error.status = 409;
    // or use package "http-errors"
    throw error;
  }
  const verificationToken = nanoid();
  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({
    name,
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "Подтверждение email.",
    html: `<a target="_blanc" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердите email.</a>`,
  };
  await sendEmail(mail);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        name,
        avatarURL,
        verificationToken,
      },
    },
  });
};

module.exports = register;
