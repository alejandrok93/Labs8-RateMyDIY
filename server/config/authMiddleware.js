const authDB = require('../models/authModel')

function authenticate(req, res, next) {
  const { user_id } = req.body;
  //get user_id from user object

  console.log(req.body);
  let sub = req.user.profile._json.sub;
  let auth_id = sub.split("|")[1];

  


  authDB
    .getAuthID(user_id)
    .then(db_auth_id => {
      if (db_auth_id === auth_id) {
        next();
      } else {
        res.status(403).json({ error: 'Not authorized.' });
      }
    });
}

module.exports = authenticate;