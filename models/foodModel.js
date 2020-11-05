const { DataTypes } = require('sequelize');
const db = require('../db');

const Food = db.define('food', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
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
  },
  protein_in_grams: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  fat_in_grams: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  carbs_in_grams: {
    type: DataTypes.FLOAT,
    allowNull: true
  }
});

module.exports = Food;