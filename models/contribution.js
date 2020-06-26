module.exports = (sequelize,DataTypes) => {
    let Contributions = sequelize.define('Contributions',{
        id: {
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            type: DataTypes.UUID
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        interestsPaid: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        lastInterestPaidOn: {
            type: DataTypes.DATE,
            allowNull: true
        },
        driverId: {
            type: DataTypes.UUID
        }
    });

    Contributions.associate = function (models) {
        Contributions.belongsTo(models.Drivers,{
            onDelete : "CASCADE",
            foreignKey : 'driverId',
            as: 'driver'
        });
    };

    return Contributions;
}