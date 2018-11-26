const express = require('express');
const router = express.Router();;

const db = require('../models/landingPageModel');

// get featured projects
router.get('/projects', function (req, res) {

  db.getLandingPageProjects()
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ error: 'Projects not found.' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
