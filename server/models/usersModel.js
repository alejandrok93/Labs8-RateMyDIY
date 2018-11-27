const db = require('../config/dbConfig');

module.exports = {
	checkUsernames,
	addUser,
	getUserProjects,
	getUserReviews
};

function checkUsernames(username) {
	return db('users')
		.where({ username: username });
}

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