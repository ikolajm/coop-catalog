const   router = require('express').Router(),
        User = require('../../db').import('../../models/User'),
        Comment =require('../../db').import('../../models/Comment'),
        bcrypt = require('bcryptjs');

// Edit a profile
router.put('/edit/:id',  (req, res) => {
    let user = req.user.id;
    User.update({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10),
            email: req.body.email,
            avatarURL: req.body.url,
            favGenre: req.body.genre
        },
            { where: { id: user } }
        )
        .then( updatedUser => {
            Comment.update({
                image: updatedUser.avatarURL
            },
                { where: { owner: user } }
            )
            .then(
                updateSuccess = () => {
                    res.json({
                        user: updatedUser,
                        sessionToken: token,
                        message: 'success'
                    })
                },
                updateFail = (err) => {
                    res.json({
                        status: 500,
                        error: err.message
                    });
                }
            )
        })
});

// Delete a profile
router.delete('/delete/:id', (req, res) => {
    let user = req.user.id;

    User.destroy({
            where: { id: user }
        })
        .then(
            destroySuccess = () => {
                res.json({
                    user: null,
                    sessionToken: undefined,
                    status: 200
                });
            }, 
            destroyFail = (err) => {
                res.send(err.message);
            }
        )
});

// Create user test
// {
// 	"username": "test",
// 	"password": "test",
// 	"email": "test@test.com",
// 	"url": "testurl",
//  "file": "testfile",
// 	"genre": ["Adventure", "Action"],
// 	"favGame": ["Tekken", "Mortal Kombat"]
// }

// Signin test
// {
// 	"username": "test",
// 	"password": "test"
// }

module.exports = router;