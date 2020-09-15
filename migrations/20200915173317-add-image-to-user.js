'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn('Users', 'image', {
      type: Sequelize.STRING,
      defaultValue: "https://truth.bahamut.com.tw/s01/201908/b47aecdaa71478a31a2af0b531be21cc.JPG",
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'image');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
