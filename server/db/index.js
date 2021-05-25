//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Session = require('./models/Session');
const Goal = require('./models/Goal');

//associations could go here!
Session.belongsTo(User);
User.hasMany(Session);
Session.belongsTo(Goal);

module.exports = {
  db,
  models: {
    User,
    Session,
    Goal,
  },
};
