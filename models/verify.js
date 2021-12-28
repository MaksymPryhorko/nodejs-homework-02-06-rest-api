/* eslint-disable semi */
/* eslint-disable quotes */
const Joi = require("joi");

const resendVerifyEmailJoiSchema = Joi.object({
  email: Joi.string().required(),
});

module.exports = { resendVerifyEmailJoiSchema };
