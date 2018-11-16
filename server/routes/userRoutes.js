const express = require("express");
const router = express.Router();
const passport = require("passport");
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn(
  "/signin"
);
const usersDB = require("../models/usersModel");

// const authenticate = require('../config/authMiddleware');

router.get("/user", function(req, res, next) {
  res.status(200).json(req.cookies);
});

module.exports = router;
