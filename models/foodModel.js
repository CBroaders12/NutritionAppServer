const { DataTypes } = require('sequelize');
const db = require('../db');

const Food = db.define('food', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  servings: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  calories: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date_eaten: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  meal: {
    type: DataTypes.STRING,
    allowNull: false
  },
  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Food;