const { UUID, UUIDV4, STRING, INTEGER } = require('sequelize');
const db = require('../db');

// association table
const BlackList = db.define('blacklist', {
  id: { type: UUID, defaultValue: UUIDV4, primaryKey: true },
  blocks: {
    type: INTEGER,
    defaultValue: 0,
  },
});

module.exports = BlackList;
