const { UUID, UUIDV4, STRING, INTEGER } = require('sequelize');
const db = require('../db');

const Blacklist = db.define('blackList', {
  userId: {
    type: UUID,
    defaultValue: UUIDV4,
  },
  siteId: {
    type: UUID,
    defaultValue: UUIDV4,
  },
});

module.exports = Blacklist;
