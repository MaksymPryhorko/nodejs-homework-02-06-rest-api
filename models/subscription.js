/* eslint-disable semi */
/* eslint-disable quotes */
const Joi = require("joi");

const subscriptionJoiSchema = Joi.object({
  email: Joi.string(),
  subscription: Joi.string().required(),
});

module.exports = { subscriptionJoiSchema };
