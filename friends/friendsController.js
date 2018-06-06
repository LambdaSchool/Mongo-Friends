const router = require('express').Router();

const friendModel = require('./friendsModel')

router
  .route('/')
  .get((req, res) => {
    friendModel.find()
      .then(friend => {
        res.status(200).json(friend)
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "The friends information could not be retrieved." })
      })
  })

  .post((req, res) => {
    const { firstName, lastName, age, contact } = req.body;
    const newFriend = new friendModel({ firstName, lastName, age,  contact})
    if(!firstName || !lastName || !age){
      res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." })
      return;
    }
    // if(typeof age !== 'number' || age > 120 || age < 1){
    //   res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" })
    //   return;
    // }
    newFriend.save()
      .then(friend => {
        res.status(201).json(friend)
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "There was an error while saving the friend to the database.", err: err.message })
      })
  })

  router
    .route('/:id')
    .get((req, res) => {
      const { id } = req.params

      friendModel.findById(id)
        .then(friend => {
          console.log(friend)
          if(friend === null){
            res.status(404).json({ errorMessage: "The friend with the specified ID does not something." })
            return;
          }
          res.status(200).json(friend)
        })
        .catch(err => {
          console.log(err.name)
          if(err.name = 'CastError'){
            res.status(404).json({ errorMessage: "The friend with the specified ID does not exist." })
            return;
          }
          res.status(500).json({ errorMessage: "The friends information could not be jklsdjkldsf." })
        })
    })

    .delete((req, res) => {
      const { id } = req.params

      friendModel.findByIdAndRemove(id)
        .then(friend => {

          if(friend === null){
            res.status(404).json({ errorMessage: "The friend with the specified ID does not something." })
            return;
          }
          res.status(200).json(friend)
        })
        .catch(err => {
          res.status(500).json({ errorMessage: "The friend could not be removed" })
        })
      })

    .put((req, res) => {
      const { id } = req.params;
      const { firstName, lastName, age, contact } = req.body;
      if(!firstName || !lastName || !age){
        res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." })
        return;
      }
      // if(typeof age !== 'number' || age > 120 || age < 1){
      //   res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" })
      //   return;
      // }
      friendModel.findByIdAndUpdate(id, { firstName, lastName, age, contact })
        .then(friend => {
          if(friend === null){
            res.status(404).json({ errorMessage: "The friend with the specified ID does not something." })
            return;
          }
          res.status(200).json(friend)
        })
        .catch(err => {
          console.log(err.name)
          if(err.name = 'CastError'){
            res.status(404).json({ errorMessage: "The friend with the specified ID does not exist." })
            return;
          }
          res.status(500).json({ errorMessage: "The friend information could not be modified." })
        })

    })




module.exports = router;
