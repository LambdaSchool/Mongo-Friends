const router = require('express').Router();

const Friend = require('./friendSchema');

// so below we have something slightly different,
// we first establish our route and then add our methods to it

// the root endpoint has two methods attached to it, get and post
router.route('/')
    .get((req, res) => {
        // console.log(req);
        Friend
            .find()
            .then(friends => {
                res.status(200).json(friends);
            })
            .catch(err => {
                res.status(500).json({ error: "The friends information could not be retrieved." })
            })
    })
    .post((req, res) => {
        const { firstName, lastName, age } = req.body;
        const friend = new Friend(req.body);
        // console.log(req.body);
        if (!firstName || !lastName || !age) {
            res.status(400).json({ error: "firstName, lastName, and age are required!" });
            return;
        }

        friend
            .save()
            .then(friend => {
                res.status(201).json(friend)
            })
            .catch(err => {
                res.status(500).json({ error: "There was an error while saving the friend to the database." });
            });
    });

// while id specific routes have get, delete, and put methods attached to them.
router.route('/:id')
    .get((req, res) => {
        const friendId = req.params.id;

        Friend.findById(friendId)
            .then(friend => {
                if (friend) {
                    res.status(200).json(friend);
                } else {
                    res.status(404).json({ error: "The friend with the specified ID does not exist." });
                }
            })
            .catch(err => {
                res.status(500).json({ error: "The friend information could not be retrieved." })
            })
    })
    .delete((req, res) => {
        const friendId = req.params.id;

        Friend.findByIdAndRemove(friendId)
            .then(deleted => {
                if (deleted !== null) {
                    res.status(200).json(deleted)
                } else {
                    return res.status(404).json({ error: "The friend with that ID does not exist" })
                }
            })
            .catch(err => {
                res.status(500).json({ error: "The friend could not be removed" })
            })
    })
    .put((req, res) => {
        const friendId = req.params.id;
        const { firstName, lastName, age } = req.body;
        // console.log(req);
        const options = {
            new: true,
        }

        if (!firstName || !lastName || !age) {
            res.status(400).json({ error: "Please provide firstName, lastName and age for the friend." });
            return;
        }

        Friend.findByIdAndUpdate(friendId, req.body, options)
            .then(friend => {
                if (friend) {
                    res.status(200).json(friend);
                } else {
                    res.sendStatus(404).json({ error: "The friend with the specified ID does not exist." });
                }
            })
            .catch(err => {
                res.status(500).json(err);
            })
    });

module.exports = router;