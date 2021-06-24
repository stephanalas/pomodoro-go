const Sequelize = require('sequelize');
const { DataTypes: {
  UUID, UUIDV4, DATE
}
} = Sequelize;
const db = require('../db');

const Block = db.define('block', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  date: {
    type: DATE,
    allowNull: true,
  }
});


/**
 * hooks
 */
Block.afterCreate((block) => {
  block.date = block.createdAt;
  block.save();
});

module.exports = Block;
