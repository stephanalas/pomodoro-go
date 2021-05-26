//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Session = require('./models/Session');
const Goal = require('./models/Goal');
const Site = require('./models/site');
const Blacklist = require('./models/blackList');
const Task = require('./models/Task');

Site.belongsToMany(User, {
  through: 'blacklist',
  foreignKey: 'siteId',
});
User.belongsToMany(Site, { through: 'blacklist', foreignKey: 'userId' });
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
    Blacklist,
  },
};
