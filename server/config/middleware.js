const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const passport = require("passport");
const strategy = require("../setup-passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
var KnexSessionStore = require("connect-session-knex")(session);
const db = require("./dbConfig");
var store = new KnexSessionStore({
  knex: db,
  tablename: "sessions",
  sidfieldname: "sid",
  createtable: false
});

// httpOnly configuration set to true for production
const sessionConfig = {
  store: store,
  secret: [process.env.SESSION_SECRET || "TKd8^S$W-HPS3NtF"],
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: false }, // 1 week
  resave: false,
  saveUninitialized: false
};

module.exports = server => {
  //removed Logger middleware to debug server endpoints
  //server.use(logger('tiny'));
  server.use(cors({ "Access-Control-Allow-Origin": "http://localhost:3000" }));
  server.use(helmet());
  server.use(express.json());
  server.use(cookieParser());
  server.use(session(sessionConfig));
  server.use(passport.initialize());
  server.use(passport.session());
};
