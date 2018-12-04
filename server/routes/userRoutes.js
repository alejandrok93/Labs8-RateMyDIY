const express = require('express');
const router = express.Router();
const passport = require('passport');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn(
	'/signin'
);
const authDB = require('../models/authModel');
const usersDB = require('../models/usersModel');

const authenticate = require('../config/authMiddleware');

router.get('/user', function(req, res, next) {
	res.status(200).json(req.cookies);
});

router.post('/myprojects', authenticate, function(req, res, next) {
	const { user_id } = req.body;
	usersDB
		.getUserProjects(user_id)
		.then(projectsList => {
			console.log('projectsList', projectsList);
			res.status(200).json(projectsList);
		})
		.catch(projectsError => {
			console.log('projectsError', projectsError);
			res.status(400).json(projectsError);
		});
});

router.post('/myreviews', function(req, res, next) {
	const { user_id } = req.body;
	usersDB
		.getUserReviews(user_id)
		.then(reviewsList => {
			console.log('reviewsList', reviewsList);
			res.status(200).json(reviewsList);
		})
		.catch(reviewsError => {
			console.log('reviewsError', reviewsError);
			res.status(400).json(reviewsError);
		});
});

module.exports = router;
