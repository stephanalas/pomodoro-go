const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const db = require('../db');

const Goal = db.define('goal', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
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

module.exports = Goal;
