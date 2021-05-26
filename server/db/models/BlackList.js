const { UUID, UUIDV4, STRING, INTEGER } = require('sequelize');
const db = require('../db');

// association table
const BlackList = db.define('blacklist', {});

module.exports = BlackList;
