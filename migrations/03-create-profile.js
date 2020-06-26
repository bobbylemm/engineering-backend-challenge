module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.createTable('Profiles', {
        id: {
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            type: Sequelize.UUID
        },
        vehicle: {
            allowNull: false,
            type: Sequelize.STRING
        },
        bio: {
            allowNull: true,
            type: Sequelize.STRING
        },
        rating: {
            allowNull: true,
            type: Sequelize.INTEGER
        },
        age: {
            type: Sequelize.INTEGER,
            allowNull: true
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
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
      }),
    down: queryInterface => queryInterface.dropTable('Profiles'),
  };