const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    class User extends Model {}
    User.init({
        id: {
            type: DataTypes.STRING,
            allowNull: true
        },
        login: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true
        }, 
        birth: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        user_city: {
            type: DataTypes.STRING,
            allowNull: false
        },     
        role: {
            type: DataTypes.STRING,        
            allowNull: false
        },   
        img: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "./images/avatar.jpg"
        },
    }, 
    {
        sequelize,
        modelName: "User"
    })
    return User
}