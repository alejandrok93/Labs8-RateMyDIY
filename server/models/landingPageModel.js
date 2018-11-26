const db = require('../config/dbConfig');

module.exports = {
  getLandingPageProjects,
};

function getLandingPageProjects() {
  return db('projects')
    .join("users", "projects.user_id", "users.user_id")
    .select("projects.img_url",
      "projects.user_id",
      "projects.project_name",
      "users.username",
      "projects.project_id",
      "projects.project_rating")
    .orderBy('project_rating', 'desc')
    .limit(4)
}