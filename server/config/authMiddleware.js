const authDB = require('../models/authModel')

function authenticate(req, res, next) {
  const { user_id } = req.body;
  //get user_id from user object
  console.log('Authenticate middleware - req.user:', req.user, 'rew.body', req.body);
  let sub = req.user._json.sub.split("|");
  let auth_id = sub[1];

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