module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.createTable('Contributions', {
        id: {
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            type: Sequelize.UUID
        },
        amount: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        driverId: {
            type: Sequelize.UUID,
            onDelete: 'CASCADE',
            references: {
                model: 'Drivers',
                key: 'id',
                as: 'driverId'
            }
        },
        interestsPaid: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        lastInterestPaidOn: {
            type: Sequelize.DATE,
            allowNull: true
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
    down: queryInterface => queryInterface.dropTable('Contributions'),
  };