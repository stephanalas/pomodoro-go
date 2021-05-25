const { UUID, UUIDV4, STRING, INTEGER } = require('sequelize');
const db = require('../db');

const Site = db.define('site', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  siteUrl: {
    type: STRING,
    validate: {
      notEmpty: true,
    },
  },
  category: {
    type: STRING,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Site;
