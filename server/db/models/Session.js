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
  //expected length of session (in milliseconds)
  sessionTime: {
    type: DataTypes.INTEGER,
    // allowNull: false,
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
  goal: {
    type: DataTypes.ENUM(['Work', 'Study', 'Read', 'Meditate']),
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
Session.start = async function ({ userId, sessionTime, goal }) {
  const session = await Session.create({ sessionTime: sessionTime });
  session.userId = userId;
  session.goal = goal;
  await session.save();
  return session;
};

Session.seed = async function (users, goals) {
  const randomUserIndex = Math.floor(Math.random() * users.length);
  const randomGoalIndex = Math.floor(Math.random() * goals.length);
  const sessionTimes = [1800, 2100, 2700, 3000, 3300, 3600];
  const sessionVariances = [-120, -360, -540, 0, 180, 300, 480];
  const booleans = [true, false];
  const randomSessionTime =
    sessionTimes[Math.floor(Math.random() * sessionTimes.length)];

  const session = await Session.create({
    sessionTime: randomSessionTime,
  });
  const user = users[randomUserIndex];
  session.userId = user.id;
  await session.save();
  session.goal = goals[randomGoalIndex];
  const start = faker.date.past();
  session.startTime = start;
  calcExpectedEndTime(session);
  randomSessionVariance =
    sessionVariances[Math.floor(Math.random() * sessionVariances.length)];
  const expected = Date.parse(session.expectedEndTime);
  session.actualEndTime = expected + randomSessionVariance * 1000;
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
  session.expectedEndTime = date + session.sessionTime * 1000;
};

Session.beforeCreate((session) => {
  session.successful = false;
  if (session.sessionTime) {
    calcStartTime(session);
    calcExpectedEndTime(session);
  }
});

module.exports = Session;
