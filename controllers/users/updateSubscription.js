/* eslint-disable no-constant-condition */
/* eslint-disable semi */
/* eslint-disable indent */
/* eslint-disable no-useless-catch */
/* eslint-disable quotes */
const { User } = require("../../models");

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id: id, email } = req.user;
  if (subscription !== "starter" && "pro" && "business") {
    const error = new Error("Subscription must be 'starter' or 'pro' or 'business'");
    error.status = 400;
    // or use package "http-errors"
    throw error;
  }
  try {
    await User.findByIdAndUpdate(id, { subscription });
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        email,
        subscription,
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = updateSubscription;
