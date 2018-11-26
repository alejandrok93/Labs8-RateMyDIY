const express = require("express");
const router = express.Router();

const db = require("../models/searchModel");

//Search API endpoint
router.get("/", (req, res) => {
  const query = req.query.query;
  console.log("query:" + query);
  db.getSearchResults(query)
    .then(results => {
      console.log(results);
      res.status(200).json(results);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
