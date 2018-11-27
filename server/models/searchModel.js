const db = require("../config/dbConfig");
const Fuse = require("fuse.js");

module.exports = {
  getSearchResults
};

function getSearchResults(query) {
  console.log("lets get them search results");
  console.log("query: " + query);
  let list = [];
  //need to create JOIN SQL query to get data from all tables
  return db("projects")
    .then(projects => {
      let options = {
        shouldSort: true,
        includeScore: true,
        threshold: 0.3,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ["project_name", "text", "username"] // need to have username in item array
      };

      let fuse = new Fuse(projects, options); // "projects" is the item array
      let result = fuse.search(query);
      return result;
    })
    .catch(err => console.log(err));
}
