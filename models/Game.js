module.exports = (sequelize, DataTypes) => {
    const Game = sequelize.define('game', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        summary: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        boxartURL: DataTypes.STRING,
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        platforms: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        },
        minPlayers: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        maxPlayers: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rating: DataTypes.INTEGER,
        lastEdit: DataTypes.INTEGER
    })
    return Game;
}