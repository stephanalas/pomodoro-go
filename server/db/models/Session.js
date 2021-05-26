const { UUID } = require('sequelize');
const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const db = require('../db');

const Session = db.define('session', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  //expected length of session (in minutes)
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
Session.start = async function ({ userId, sessionTime, goalId }) {
  const session = await Session.create({ sessionTime: sessionTime });
  session.userId = userId;
  session.goalId = goalId;
  await session.save();
  return session;
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

Session.beforeCreate((session) => {
  calcStartTime(session);
  calcExpectedEndTime(session);
});

module.exports = Session;
