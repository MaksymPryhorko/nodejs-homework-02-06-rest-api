/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
const express = require("express");

const { ctrlWrapper, auth, upload, validation } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { resendVerifyEmailJoiSchema, subscriptionJoiSchema } = require("../../models");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch("/avatars", auth, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
router.post("/verify", validation(resendVerifyEmailJoiSchema), ctrlWrapper(ctrl.resendVerifyEmail));
router.patch(
  "/subscription",
  validation(subscriptionJoiSchema),
  auth,
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
