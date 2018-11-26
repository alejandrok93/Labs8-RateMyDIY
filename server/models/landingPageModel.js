const db = require('../config/dbConfig');

module.exports = {
  getLandingPageProjects,
};

function getLandingPageProjects() {
  return db('projects')
    .orderBy('project_rating', 'desc')
    .limit(4)
}