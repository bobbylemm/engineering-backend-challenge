module.exports = (sequelize,DataTypes) => {
    let Drivers = sequelize.define('Drivers',{
        id: {
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            type: DataTypes.UUID
        },
        name : {
            type: DataTypes.STRING,
            allowNull: false
        },
        username : {
            unique: true,
            allowNull: false,
            type: DataTypes.STRING
        }
    });

    Drivers.associate = function (models) {
        Drivers.hasOne(models.Contributions,{
            onDelete : "CASCADE",
            foreignKey : 'driverId'
        });
        Drivers.hasOne(models.Profiles,{
            onDelete : "CASCADE",
            foreignKey : 'driverId'
        });
    };

    return Drivers;
}