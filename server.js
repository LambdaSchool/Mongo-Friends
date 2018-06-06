const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const friendsController = require('./friends/friendsController')


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/dbFriends')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/friends', friendsController)

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
