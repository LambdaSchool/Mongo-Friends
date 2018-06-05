const router = require('express').Router();

const Friends = require('./friendModel');

router
    .route('/')
    .post((req, res) => {
        const newFriend = (new Friends({ firstName, lastName, age, createdOn, contactInfo } = req.body));
        if (!firstName || !lastName || !age) {
            res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." })
            return;
        } else if (typeof age !== 'number' || age < 1 || age > 120) {
            res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" })
            return;
        } else {
            newFriend.save()
                .then(friend => {
                    res.status(201).json(friend)
                })
                .catch(err => {
                    res.status(500).json({ errorMessage: "There was an error while saving the friend to the database." })
                })
        }
    })
    .get((req,res) => {
        Friends.find()
            .then(friends => {
                res.json(friends)
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "The friends information could not be retrieved." })
            })
    })

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Friends.findById(id)
            .then(friend => {
                if (friend === null) {
                    res.status(404).json({ errorMessage: "The friend with the specified ID does not exist." })
                    return;
                }
                res.json(friend)
            })
            .catch(err => {
                if (err.name === "CastError") {
                    res.status(404).json({ errorMessage: "The friend with the specified ID does not exist." })
                    return;
                }
                res.status(500).json({ errorMessage: "The friend information could not be retrieved." })
            })
    })
    .delete((req, res) => {
        const { id } = req.params;
        Friends.findByIdAndRemove(id)
            .then(friend => {
                if (friend === null) {
                    res.status(404).json({ errorMessage: "The friend with the specified ID does not exist." })
                    return;
                }
                res.json(friend)
            })
            .catch(err => {
                if (err.name === "CastError") {
                    res.status(404).json({ errorMessage: "The friend with the specified ID does not exist." })
                    return;
                }
                res.status(500).json({ errorMessage: "The friend could not be removed." })
            })
    })
    .put((req, res) => {
        const { id } = req.params;
        const newFriend = ( { firstName, lastName, age, createdOn, contactInfo: {email, mobileNumber, twitterHandle} } = req.body );
        if (age && (typeof age !== 'number' || age < 1 || age > 120)) {
            res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" })
            return;
        }
        Friends.findByIdAndUpdate(id, newFriend, {new: true})
            .then(friend => {
                if (friend === null) {
                    res.status(404).json({ errorMessage: "The friend with the specified ID does not exist." })
                    return;
                }
                res.json(friend)
            })
            .catch(err => {
                if (err.name = 'CastError') {
                    res.status(404).json({ errorMessage: "The friend with the specified ID does not exist." })
                    return;
                }
                res.status(500).json({ errorMessage: "The friend information could not be modified." })
            })
    })

module.exports = router;