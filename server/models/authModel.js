const db = require('../config/dbConfig');

module.exports = {
	getAuthID
};

function getAuthID(user_id) {
	return db('users')
		.where({ user_id })
		.first()
		.then(user => {
			if (user) {
				return user.auth_id;
			} else return undefined;
		});
}