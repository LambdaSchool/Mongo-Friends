const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost/friendsdb')
  .then(() => console.log('\n === connected to Mongo ===\n'))
  .catch(error => console.error({ error: 'error connect to mongo' }))

const friendsController = require('./friends/friendsController')

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' })
})

server.use('/api/friends', friendsController)

const port = process.env.PORT || 5000
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`))
