module.exports = (sequelize,DataTypes) => {
    let Profiles = sequelize.define('Profiles',{
        id: {
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            type: DataTypes.UUID
        },
        vehicle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        driverId: {
            type: DataTypes.UUID
        }
    });

    Profiles.associate = function (models) {
        Profiles.belongsTo(models.Drivers,{
            as: 'driver',
            onDelete : "CASCADE",
            foreignKey : 'driverId'
        });
    };

    return Profiles;
}