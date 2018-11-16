const db = require("../config/dbConfig");

module.exports = {
  getUsers,
  getUsersByID,
  addUser
};

function getUsers() {
  return db("users");
}

function getUsersByID(user_id) {
  return db("users")
    .where({ user_id: user_id })
    .first();
}

function addUser(user) {
  console.log(user);
  return db("users")
    .insert(user)
    .into("users");
}
