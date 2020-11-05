'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn('food', 'protein_in_grams', {
        type: Sequelize.FLOAT
      });
      await queryInterface.addColumn('food', 'carbs_in_grams', {
        type: Sequelize.FLOAT
      });
      await queryInterface.addColumn('food', 'fat_in_grams', {
        type: Sequelize.FLOAT
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('food', 'protein_in_grams');
      await queryInterface.removeColumn('food', 'carbs_in_grams');
      await queryInterface.removeColumn('food', 'fat_in_grams');
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
};
