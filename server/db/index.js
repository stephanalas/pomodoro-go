//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Session = require('./models/Session');
const Goal = require('./models/Goal');
const Site = require('./models/Site');
const BlackList = require('./models/BlackList');
const Task = require('./models/Task');

Site.belongsToMany(User, {
  through: BlackList
});
User.belongsToMany(Site, { through: BlackList });
//associations could go here!
Session.belongsTo(User);
User.hasMany(Session);
Session.belongsTo(Goal);
Task.belongsTo(Goal);
Goal.hasMany(Task);

module.exports = {
  db,
  models: {
    User,
    Session,
    Goal,
    Task,
    Site,
    BlackList,
  },
};
