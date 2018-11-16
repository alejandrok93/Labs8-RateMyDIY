const express = require("express");
const router = express.Router();
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn(
  "/signin"
);

const authenticate = require("../config/authMiddleware");

const db = require("../models/projectModel");

// get project by id
router.get("/:project_id", function(req, res, next) {
  const { project_id } = req.params;

  db.getProjectByID(project_id)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ error: "Project not found." });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// get reviews by project id
router.get("/:project_id/reviews", function(req, res, next) {
  const { project_id } = req.params;

  db.getReviewsByProjectID(project_id)
    .then(reviews => {
      if (reviews) {
        res.status(200).json(reviews);
      } else {
        res.status(404).json({ error: "Project not found." });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//get projects
router.get("/", (req, res) => {
  console.log("hi");
  db.getProjects()
    .then(projects => res.send(projects))
    .catch(err => res.json(err));
});

// add project
router.post("/", ensureLoggedIn, authenticate, function(req, res, next) {
  const { user_id, project_name, img_url, text } = req.body;

  if (!project_name || !img_url || !text) {
    return res.status(422).json({ error: "Missing parameters." });
  } else {
    const project = { user_id, project_name, img_url, text };
    db.addProject(project)
      .then(project_id => {
        res.status(201).json(project_id);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
});

// update project by id
router.put("/:project_id", ensureLoggedIn, function(req, res, next) {
  const { user_id, project_name, img_url, text } = req.body;
  const { project_id } = req.params;

  if (!project_name || !img_url || !text) {
    return res.status(422).json({ error: "Missing parameters." });
  } else {
    const changes = { project_name, img_url, text };
    db.editProject(user_id, project_id, changes)
      .then(count => {
        if (count) {
          res.status(200).json(count);
        } else {
          res.status(404).json({ error: "Project not found." });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
});

// delete project by id
router.delete("/:project_id", ensureLoggedIn, function(req, res, next) {
  const { user_id } = req.body;
  const { project_id } = req.params;

  db.removeProject(user_id, project_id)
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ error: "Project not found." });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
