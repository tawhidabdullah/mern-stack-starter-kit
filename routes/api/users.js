const express = require("express");

const passport = require("passport");

//IMPORT USUERS CONSTROLLERS
const usersControllers = require("../../controllers/users");

// initializing router middleware
const router = express.Router();

// @route GET /api/users/register
// @decription Register user
// @access Public

router.post("/register", usersControllers.registerUser);

// @route GET /api/users/login
// @decription login user / Returns jwt Token
// @access Public

router.post("/login", usersControllers.loginUser);

// @route GET /api/users/currentUser
// @decription return current user
// @access Private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  usersControllers.getCurrentUser
);

module.exports = router;
