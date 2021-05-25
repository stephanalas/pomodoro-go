const { UUID } = require('sequelize');
const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const db = require('../db');

const Session = db.define('session', {
  //expected length of session (in minutes)
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  sessionTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  startTime: {
    type: DataTypes.DATE,
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
Session.createWithUser = function (userId, sessionTime) {
  Session.create({ userId, sessionTime });
};
/**
 * hooks
 */
const calcStartTime = (session) => {
  session.startTime = session.createdAt;
};

const calcExpectedEndTime = (session) => {
  const date = Date.parse(session.createdAt);
  session.expectedEndTime = date + session.sessionTime * 60000;
};

Session.beforeSave((session) => {
  calcStartTime(session);
  calcExpectedEndTime(session);
});

module.exports = Session;
