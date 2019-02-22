const   router = require('express').Router(),
        Game = require('../../db').import('../../models/Game'),
        Comment = require('../../db').import('../../models/Comment');


// Find all games
router.get('/', (req, res) => {
    Game.findAll()
        .then(foundGames => {
            res.json({
                message: 'success',
                games: foundGames
            })
        })
        .catch(err => res.send(500, err.message))
});

// Find single game
router.get('/:id', (req, res) => {
    let game = req.params.id

    Game.findOne({
        where: { id: game }
    })
    .then(foundGame => {
        Comment.findAll()
        .then(foundComments => {
            res.json({
                game: foundGame,
                comments: foundComments,
                message: 'success'
            });
        })
    })
    .catch(err => res.send(err.message))
});

module.exports = router;