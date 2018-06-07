const router = require('express').Router();
const Friend = require('./friendModel.js');

router
    .route('/')
    .get((req, res) => {
        Friend
            .find()
            .then(response=> {
                res.status(200).json(response)
            })
            .catch(error => {
                res.status(500).json({ errorMessage: "The friends information could not be retrieved." })
            })
    })
    .post((req, res) => {
        const { firstName, lastName, age } = req.body;
        const newFriend = new Friend({ firstName, lastName, age });
        newFriend
            .save()
            .then(response => {
                res.status(201).json({ success: "New Friend Added", response});
            })
            .catch(error => {
                res.status(500).json({ errorMessage: "There was an error while saving the friend to the database." });
            })
    })
router
    .route('/:id')
    .get((req, res) => {
        Friend
            .findById(req.params.id)
            .then(response => {
                if(response === null) {
                    res.status(404).json({ errorMessage: "The friend with the specified ID does not exist." })
                } else {
                    res.status(200).json(response)
                }
            })
            .catch(error => {
                res.status(500).json({ errorMessage: "The friend information could not be retrieved." })
            })
    })
    .delete((req, res) => {
        Friend
            .findByIdAndRemove(req.params.id)
            .then(response => {
                if(response === null) {
                    res.status(404).json({ errorMessage: "The friend with the specified ID does not exist." })
                } else {
                    res.json({ status: "Friend Removed", resource: response })
                }
            })
            .catch(error => {
                res.status(500).json({ errorMessage: "The friend could not be removed" })
            })
    })
    .put((req, res) => {
        const updates = ({ firstName, lastName, age } = req.body)
        Friend
            .findByIdAndUpdate(req.params.id, updates, { new: true })
            .then(response => {
                if(response === null) {
                    res.status(404).json({ errorMessage: "The friend with the specified ID does not exist." })
                } else {
                    res.json({ success: "Friend Updated", resource: response })
                }
            }) 
            .catch(error => {
                res.status(500).json({ errorMessage: "The friend information could not be modified." })
            })
    })

module.exports = router;
