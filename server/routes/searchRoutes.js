const express = require("express");
const router = express.Router();

const db = require("../models/projectModel");

//Search API endpoint
router.get("/", (req, res) => {
  const query = req.query.query;
  console.log("query:" + query);
  res.status(200).json({ projects: { id: 1 } });
});

module.exports = router;
