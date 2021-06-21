//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Session = require('./models/Session');
const Site = require('./models/Site');
const BlackList = require('./models/BlackList');
const Task = require('./models/Task');
const Friendship = require('./models/Friendship');

Site.belongsToMany(User, {
  through: BlackList,
});
User.belongsToMany(Site, { through: BlackList });
Site.hasMany(BlackList);
BlackList.belongsTo(Site);
User.hasMany(BlackList);
BlackList.belongsTo(User);
//associations could go here!
Session.belongsTo(User);
User.hasMany(Session);
Task.belongsTo(Session);
Session.hasMany(Task);
User.belongsToMany(User, {
  through: Friendship,
  foreignKey: 'requesteeId',
  as: 'requestee',
});
User.belongsToMany(User, {
  through: Friendship,
  foreignKey: 'requesterId',
  as: 'requester',
});

module.exports = {
  db,
  models: {
    User,
    Session,
    Task,
    Site,
    BlackList,
    Friendship,
  },
};
