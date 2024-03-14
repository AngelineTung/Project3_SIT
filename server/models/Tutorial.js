module.exports = (sequelize, DataTypes) => { 
    const Tutorial = sequelize.define("Tutorial", { 
        Name: { type: DataTypes.STRING(100), 
            allowNull: false 
        }, 
        password: { 
            type: DataTypes.STRING(100),
            allowNull: false 
        },
        address: { 
            type: DataTypes.TEXT,
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
            type: DataTypes.TEXT,
            allowNull: true
        },     
        medicalCondition: { 
            type: DataTypes.STRING(100),
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
        tableName: 'tutorials' 
    }); 
    return Tutorial; 
}