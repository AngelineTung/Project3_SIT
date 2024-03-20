module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        fullPassword: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('Admin', 'Doctor', 'Nurse', 'Patient', 'Caregiver'),
            allowNull: false
        },
        address: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        icnumber: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        caregivername: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        caregiveremail: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        medicalCondition: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        docemail: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        nurseemail: {
            type: DataTypes.STRING(100),
            allowNull: true
        },

    }, {
        tableName: 'users'
    });

    /*User.associate = (models) => {
        User.hasMany(models.Address, {
            foreignKey: "userId",
            onDelete: "cascade"
        });
    };*/

    return User;
}