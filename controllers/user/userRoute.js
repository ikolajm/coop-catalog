const   router = require('express').Router(),
        User = require('../../db').import('../../models/User'),
        bcrypt = require('bcryptjs'),
        jwt = require('jsonwebtoken');

// Test the route
router.get('/', (req, res) => {
    res.send('Test: Hello user');
});

// Create a user
router.post('/signup', (req, res) => {
    res.status(200).json({
        message: 'test message'
    })
    User.create({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10),
            email: req.body.email,
            avatarURL: req.body.url,
            favGenre: req.body.genre,
            reputation: 0
        })
        .then(newUser => {
            let token = jwt.sign( { id: newUser.id }, process.env.JWT_SECRET, {expiresIn: 60*60*24} );

            res.json({
                user: newUser,
                sessionToken: token,
                message: 'success'
            })
        })
        .catch(err => res.send(500, err.message))
});

// Sign in to a user
router.post('/signin', (req, res) => {

    User.findOne({
            where: { username: req.body.username }
        })
        .then((foundUser) => {
            bcrypt.compare(req.body.password, foundUser.password, (err, match) => {
                if (match) {
                    let token  = jwt.sign( { id: foundUser.id }, process.env.JWT_SECRET, { expiresIn: 60*60*24 } );
                    
                    res.json({
                        user: foundUser,
                        message: 'Successfully logged in',
                        sessionToken: token
                    });
                }
            })
    })
    .catch(err => res.send(500, err.message));
});

module.exports = router;