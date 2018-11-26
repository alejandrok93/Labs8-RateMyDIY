const db = require('../config/dbConfig');

module.exports = {
  getLandingPageProjects,
};

function getLandingPageProjects() {
  return db('projects')
    .where({
      project_rating: '4',
      project_rating: '5'
    })
    .first()
}