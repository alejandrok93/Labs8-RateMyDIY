const db = require('../config/dbConfig');

module.exports = {
	getProjectByID,
	getReviewsByProjectID,
	addProject,
	editProject,
	removeProject
};

function getProjectByID(project_id) {
	return db('projects')
		.where({ project_id })
		.first()
		.then(project => {
			if (project) {
				return db('posts')
					.where({ project_id })
					.then(posts => ({ ...project, posts }));
			} else return undefined;
		});
}

function getReviewsByProjectID(project_id) {
	return db('projects')
		.where({ project_id })
		.first()
		.then(project => {
			if (project) {
				return db('reviews').where({ project_id });
			} else return undefined;
		});
}

function addProject(project) {
	return db('projects')
		.returning('project_id')
		.insert(project)
		.then(([project_id]) => project_id);
}

function editProject(user_id, project_id, changes) {
	return db('projects')
		.where({ user_id, project_id })
		.returning('project_id')
		.update(changes)
		.then(ids => ids.length);
}

function removeProject(user_id, project_id) {
	return db('projects')
		.where({ user_id, project_id })
		.del();
}
