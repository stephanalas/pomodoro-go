const { UUID } = require('sequelize');
const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const db = require('../db');
const faker = require('faker');

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
Session.prototype.end = async function ({ successful }) {
  this.successful = successful;
  this.actualEndTime = Date.now();
};
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

Session.seed = async function (users, goals) {
  const randomUserIndex = Math.floor(Math.random() * users.length);
  const randomGoalIndex = Math.floor(Math.random() * goals.length);
  const sessionTimes = [30, 35, 45, 50, 55, 60];
  const sessionVariances = [-2, -6, -9, 0, 3, 5, 8];
  const booleans = [true, false];
  const randomSessionTime =
    sessionTimes[Math.floor(Math.random() * sessionTimes.length)];

  const session = await Session.create({
    sessionTime: randomSessionTime,
  });
  const user = users[randomUserIndex];
  session.userId = user.id;
  await session.save();
  session.goalId = goals[randomGoalIndex].id;
  const start = faker.date.past();
  session.startTime = start;
  calcExpectedEndTime(session);
  randomSessionVariance =
    sessionVariances[Math.floor(Math.random() * sessionVariances.length)];
  const expected = Date.parse(session.expectedEndTime);
  session.actualEndTime = expected + randomSessionVariance * 60000;
  randomSuccessful = booleans[Math.floor(Math.random() * booleans.length)];
  session.successful = randomSuccessful;

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
  const date = Date.parse(session.startTime);
  session.expectedEndTime = date + session.sessionTime * 60000;
};

Session.beforeCreate((session) => {
  calcStartTime(session);
  calcExpectedEndTime(session);
});

module.exports = Session;
