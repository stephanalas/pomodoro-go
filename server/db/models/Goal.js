const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const db = require('../db');

const Goal = db.define('goal', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  task: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  //possible foreign key: categoryId - would require new Category model be made.
  // categoryId: {

  // }
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
