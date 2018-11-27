const db = require('../config/dbConfig');

module.exports = {
	getUsers,
	checkUsernames,
	addUser
};

function getUsers() {
	return db('users');
}

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
