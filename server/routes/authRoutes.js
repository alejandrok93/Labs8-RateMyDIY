const express = require('express');
const router = express.Router();
const passport = require('passport');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn(
	'/signin'
);
const usersDB = require('../models/usersModel');
const authDB = require('../models/authModel');

const authenticate = require('../config/authMiddleware');

router.get(
	'/signin',
	passport.authenticate('auth0', {
		scope: 'openid email profile'
	}),
	function(req, res) {
		res.redirect('/');
	}
);

router.get('/callback', function(req, res, next) {
	passport.authenticate('auth0', function(err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.redirect('/signin');
		}
		req.logIn(user, function(err) {
			if (err) {
				return next(err);
			}
			const returnTo = req.session.returnTo;
			delete req.session.returnTo;
			console.log(req.user._json);
			let role = req.user._json['https://ratemydiy.herokuapp.com/roles'];
			let sub = req.user._json.sub.split('|');
			let auth_id = sub[1];
			let username = req.user._json.nickname;
			let user = {
				auth_id,
				username
			};
			if (role[0] === 'new') {
				usersDB
					.addUser(user)
					.then(res => {
						res.redirect(
							returnTo || `https://ratemydiy.netlify.com`
							// ||	`http://localhost:3000`
						);
					})
					.catch(err => {
						res.status(500).json(err);
					});
			} else {
				res.redirect(
					returnTo || `https://ratemydiy.netlify.com`
					// || `http://localhost:3000`
				);
			}
		});
	})(req, res, next);
});

router.get('/loggedIn', function(req, res) {
	console.log('loggedIn', req.cookies);
	const auth_id = req.user._json.sub.split('|')[1];

	authDB
		.loggedIn(auth_id)
		.then(res => {
			res.status(200).json(res);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.get('/signout', (req, res) => {
	req.logout();
	res.redirect('/');
});

router.post('/test', ensureLoggedIn, authenticate, function(req, res, next) {
	//console.log(req.user);
	//console.log(req.user.app_metadata);
	res.status(200).json({ message: 'it works' });
});

router.get('/cookie', function(req, res, next) {
	console.log(req.cookies);
	res.status(200).json(req.cookies);
});

module.exports = router;
