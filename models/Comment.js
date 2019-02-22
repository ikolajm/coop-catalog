module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('comment', {
        owner: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        review: DataTypes.STRING,
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        game: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        upvote: {
            type: DataTypes.INTEGER
        },
        downvote: {
            type: DataTypes.INTEGER
        }
    })
    return Comment;
}