module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.createTable('Drivers', {
        id: {
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            type: Sequelize.UUID
        },
        name: {
            allowNull: true,
            type: Sequelize.STRING
        },
        username: {
            unique: true,
            allowNull: false,
            type: Sequelize.STRING
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
      }),
    down: queryInterface => queryInterface.dropTable('Drivers'),
  };