const express = require('express');
const router = express.Router();
const passport = require('passport');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn(
	'/signin'
);
const usersDB = require('../models/usersModel');

// const authenticate = require('../config/authMiddleware');

router.get('/user', function(req, res, next) {
	res.status(200).json(req.cookies);
});

router.post('/change', function (req, res, next) {
  	const sub = req.user.profile._json.sub;
	const auth_id = sub.split('|')[1];
	const { username } = req.body;
	const img_url = req.user.profile._json.picture;
	const user = {
		auth_id,
		username,
		img_url
  	};
  
  	usersDB
		  .checkUsernames(username)
		  .then(usernameList => {
			  console.log('usernameList', usernameList);
			  if (usernameList.length === 0) {
				usersDB
					.addUser(user)
					.then(dbRes => {
						console.log('DB SUCCESS')
						res.status(200).json({ message: 'Username has been set' });
					})
					.catch(dbErr => {
						console.log('DB ERROR');
						res.status(500).json({ error: 'Could not add to database' });
					});
			  } else {
				res.status(400).json({ error: 'Please enter a different username' });
			  }
		  })
		  .catch(usernameError => {
			  console.log('usernameError', usernameError);
			  res.status(500).json({ error: 'Could not test username' });
			});
});

module.exports = router;
