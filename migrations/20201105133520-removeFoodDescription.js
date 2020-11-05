'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('food', 'description');
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('food', 'description');
  }
};
