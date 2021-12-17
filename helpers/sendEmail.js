/* eslint-disable no-useless-catch */
/* eslint-disable semi */
/* eslint-disable quotes */
const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "pryhorkomaksym@meta.ua",
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

// const emailOptions = {
//   from: "pryhorkomaksym@meta.ua",
//   to: "noresponse@gmail.com",
//   subject: "Nodemailer test",
//   text: "Привет. Мы тестируем отправку писем!",
// };

const sendEmail = async (data) => {
  const email = { ...data, from: "pryhorkomaksym@meta.ua" };
  try {
    await transporter.sendMail(email);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
