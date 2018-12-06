const db = require('../config/dbConfig');

module.exports = {
	addUser,
	getUserProjects,
	getUserReviews,
	checkUsernames,
	editUsername,
	editProfilePic
};

function addUser(user) {
	console.log(user);
	return db('users')
		.insert(user)
		.into('users');
}

function getUserProjects(user_id) {
	return db('projects')
		.where({ user_id: user_id });
}

function getUserReviews(user_id) {
	return db('reviews')
		.where({ user_id: user_id });
}

function checkUsernames(username) {
	return db('users')
		.where({ username: username });
}

function editUsername(auth_id, username) {
	return db('users')
		.where({ auth_id: auth_id })
		.update({ username: username });
}

function editProfilePic(auth_id, img_url) {
	return db('users')
		.where({ auth_id: auth_id })
		.update({ img_url: img_url });
}
