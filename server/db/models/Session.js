const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const db = require('../db');

const Session = db.define('session', {
  //expected length of session (in minutes)
  sessionTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  expectedEndTime: {
    type: DataTypes.DATE,
  },
  actualEndTime: {
    type: DataTypes.DATE,
  },
  successful: {
    type: DataTypes.BOOLEAN,
  },
});

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
const calcExpectedEndTime = (session) => {
  const date = Date.parse(session.createdAt);
  session.expectedEndTime = date + session.sessionTime * 60000;
};

Session.afterCreate((session) => {
  calcExpectedEndTime(session);
});

module.exports = Session;
