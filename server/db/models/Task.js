const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const db = require('../db');

const Task = db.define('task', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    status: {
      type: DataTypes.ENUM(['Completed', 'Pending', 'Not completed']),
      defaultValue: 'Pending',
    },
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

module.exports = Task;
