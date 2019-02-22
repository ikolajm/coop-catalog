const   router = require('express').Router(),
        Game = require('../../db').import('../../models/Game');

// Create a game post
router.post('/add', (req, res) => {
    let user = req.user.id;

    Game 
        .create({
            name: req.body.name,
            summary: req.body.summary,
            boxartURL: req.body.url,
            genre: req.body.genre,
            // platforms: req.body.platforms,
            minPlayers: req.body.min,
            maxPlayers: req.body.max,
            rating: req.body.rating,
            lastEdit: user
        })
        .then(
            createSuccess = (newGame) => {
                res.json({
                    game: newGame,
                    message: 'Created successfully',
                    response: 200
                })
            },
            createFail = (err) => {
                res.send(500, err.message);
            }
        )
});

// Edit a game posting
router.put('/edit/:id', (req, res) => {
    let gameId = req.params.id;
    let user = req.user.id;

    Game 
        .update({
            name: req.body.name,
            summary: req.body.summary,
            boxartURL: req.body.url,
            genre: req.body.genre,
            platforms: req.body.platforms,
            minPlayers: req.body.min,
            maxPlayers: req.body.max,
            rating: req.body.rating,
            lastEdit: user
        },
            { where: { id: gameId } }
        )
        .then(
            updateSuccess = (updatedGame) => {
                res.json({
                    newPost: updatedGame
                });
            },
            updateFail = (err) => {
                res.send(500, err.message);
            }
        )
});

// Delete a game posting
router.delete('/delete/:id', (req, res) => {
    let user = req.user.id;
    let gameId = req.params.id;

    Game 
        .destroy({
            where: { id: gameId, owner: user}
        })
        .then(
            Comment.findAll({
                where: { game: gameId }
            })
            .then(
                deleteSuccess = () => {
                    res.send('Successfully deleted');
                }, 
                deleteFail = (err) => {
                    res.send(500, err.message);
                }
            )
        )
});

// Test for creating a game post
// {
//     "name": "test",
//    "summary": "this is a test",
//    "url": "testURL",
//    "genre": "test",
//    "platforms": ["steam", "origin"],
//    "min": 1,
//    "max": 2,
//    "rating": 5,
//    "lastEdit": 1
// }

module.exports = router;