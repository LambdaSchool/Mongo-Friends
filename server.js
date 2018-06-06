const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const friendsController = require('./friends/friendsController')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

mongoose.connect('mongodb://localhost/dbFriends', {}, err => {
  if (err) console.log('Database connection failed');
  console.log('Successfully Connected to MongoDB');
});

server.use('/api/friends', friendsController);

mongoose.Promise = global.Promise;
server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));