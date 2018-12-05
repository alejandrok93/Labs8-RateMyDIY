const db = require('../config/dbConfig');

module.exports = {
	addUser,
	getUserProjects,
	getUserReviews
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