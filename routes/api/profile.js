const express = require("express");
const router = express.Router();
const passport = require("passport");

// IMPORT PROFILE CONTROLLERS
const profileControllers = require("../../controllers/profile");

// @route GET /api/profile
// @decription  profile routes
// @access Private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileControllers.getCurrentProfile
);

// @route POST /api/profile
// @decription  create or update profile
// @access Private

router.post(
  "/addProfile",
  passport.authenticate("jwt", { session: false }),
  profileControllers.addOrUpdateProfile
);

module.exports = router;
