//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Session = require('./models/Session');
const Goal = require('./models/Goal');
const Site = require('./models/site');
const Blacklist = require('./models/blackList');

Site.belongsToMany(User, {
  through: 'blacklist',
  foreignKey: 'siteId',
});
// ??User.hasMany(Site)
User.belongsToMany(Site, { through: 'blacklist', foreignKey: 'userId' });
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
    Site,
    Blacklist,
  },
};
