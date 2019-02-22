module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            isEmail: true,
            allowNull: false,
            unique: true
        },
        avatarURL: DataTypes.STRING,
        favGenre: {
            type: DataTypes.STRING
        }
        // ,
        // reputation: {
        //     type: DataTypes.INTEGER
        // }
    })
    return User;
}