const   router = require('express').Router(),
        User = require('../../db').import('../../models/User');
        Comment = require('../../db').import('../../models/Comment');

// Create a comment for a game
router.post('/:gameid/comment/create', (req, res) => {
    let gameParent = req.params.gameid;
    let user = req.user.id;

    Comment
        .create({
            owner: user,
            review: req.params.review,
            rating: req.params.rating,
            game: gameParent,
            image: req.user.avatarURL,
            upvote: 0,
            downvote: 0
        })
        .then(comment => res.json( { comment: comment, message: 'Successfully created', response: 200 } ) )
        .catch(err => res.send(500, err.message))
});

// Upvote a comment
router.put('/comment/:commentid/upvote', (req, res) => {
    let comment = req.params.commentid;

    Comment.findOne({
        where: { id: comment }
    })
    .then(foundComment => {
        let newVote = Number(foundComment.upvote) + 1;
        Comment.update({
            upvote: newVote
        },
            { where: { id: comment } }
        )
        .then( ()=> {
            User.findOne({
                where: { id: foundComment.owner }
            })
            .then(foundUser => {
                let newRep = Number(foundUser.reputation) + 1;
                User.update({
                    reputation: newRep
                },
                    { where: { id: foundUser.id } }
                )
                .then(()=> res.send('success'))
                .catch(err => res.send(err.message))
            })
        })
    })
});

// Downvote a comment
router.put('/comment/:commentid/downvote', (req, res) => {
    let comment = req.params.commentid;

    Comment.findOne({
        where: { id: comment }
    })
    .then(foundComment => {
        let newVote = Number(foundComment.upvote) - 1;
        Comment.update({
            upvote: newVote
        },
            { where: { id: comment } }
        )
        .then( ()=> {
            User.findOne({
                where: { id: foundComment.owner }
            })
            .then(foundUser => {
                let newRep = Number(foundUser.reputation) - 1;
                User.update({
                    reputation: newRep
                },
                    { where: { id: foundUser.id } }
                )
                .then(()=> res.send('success'))
                .catch(err => res.send(err.message))
            })
        })
    })
});

// Edit comment for a game
router.put('/:gameid/comment/edit', (req, res) => {
    let gameParent = req.params.gameid;
    let user = req.user.id;

    Comment
        .update({
            owner: user,
            review: req.params.review,
            rating: req.params.rating,
            game: gameParent
        },
            { where: { owner: user, id: gameParent } }
        )
        .then(
            updateSuccess = (updatedComment) => {
                res.json({
                    newComment: updatedComment
                });
            },
            updateFail = (err) => {
                res.send(500, err.message);
            }
        )
});

// Delete comment for a game
router.delete('/:gameid/comment/delete', (req, res) => {
    let gameParent = req.params.gameid;
    let user = req.user.id;

    Comment
        .destroy({
            where: { owner: user, id: gameParent }
        })
        .then(
            deleteSuccess = () => {
                res.send('Comment successfully deleted');
            },
            deleteFail = (err) => {
                res.send(500, err.message);
            }
        )
});

module.exports = router;