const { UUID, UUIDV4, STRING, INTEGER } = require('sequelize');
const db = require('../db');

const Blacklist = db.define('blackList', {});

module.exports = Blacklist;
