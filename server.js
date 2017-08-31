const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const { User, Post } = require('./models.js');
const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

// allow server to parse JSON bodies from POST/PUT/DELETE requests
server.use(bodyParser.json());

// Implement the following routes but have them utilize a database to achieve data persistence.

// * [GET] `/users` This route will return an array of all users.
server.get(('/users'), (req, res) => {
    User.find([], (err, data) => {
        if (err) {
            res.status(STATUS_SERVER_ERROR);
            res.json({ error: err });
        }
        res.json(data);
    });
});

// * [GET] `/users/:id` This route will return the user with the matching `id` (`_id` on the db document) property.
server.get(('/users/:id'), (req, res) => {
    const { id } = req.params;
    User.findById(id, (err, data) => {
        if (err) {
            res.status(STATUS_SERVER_ERROR);
            res.json({ error: err });
        }
        res.json(data);
    });
});

// * [POST] `/users` This route should save a new user to the server.
server.post(('/users'), (req, res) => {
    const { first, last, birthday } = req.body;
    if (!first || !last || !birthday) {
        res.status(STATUS_USER_ERROR);
        res.json({ error: 'Missing one of the parameters.' });
    }

    const user = new User({ first, last, birthday });
    user.save((err) => {
        if (err) {
            res.status(STATUS_SERVER_ERROR);
            res.json({ error: err });
        }
        res.json(user);
    });
});

// * [DELETE] `/users/:id` This route should delete the specified user.
server.delete(('/users/:id'), (req, res) => {
    const { id } = req.params;
    User.deleteOne(id, (err, data) => {
        if (err) {
            res.status(STATUS_SERVER_ERROR);
            res.json({ error: err });
        }
        res.json(data);
    });
});

// * [POST] `/posts` This route should save a new blog post to the server.
server.post(('/posts'), (req, res) => {
    const { title, author, content } = req.body;
    if (!title || !author || !content) {
        res.status(STATUS_USER_ERROR);
        res.json({ error: 'Invalid body - needs title; author; content.' });
    }

    const newPost = new Post({ title, author, content });
    newPost.save((err) => {
        if (err) {
            res.status(STATUS_SERVER_ERROR);
            res.json({ error: 'Error on saving blogpost.' });
        }
        res.json(newPost);
    });
});

// * [GET] `/posts` This route will return an array of all blog posts.
server.get(('/posts'), (req, res) => {
    Post.find({}, (err, data) => {
        if (err) {
            res.status(STATUS_SERVER_ERROR);
            res.json({ error: 'Failed to get posts.' });
        }
        res.json(data);
    });
});

// * [GET] `/posts/:id` This route will return the blog post with the matching `id` property.
server.get(('/posts/:id'), (req, res) => {
    const { id } = req.params;

    Post.findById(id, (err, data) => {
        if (err) {
            res.status(STATUS_SERVER_ERROR);
            res.json({ error: 'Failed to get a post with that id.' });
        }
        res.json(data);
    });
});

// * [DELETE] `/posts/:id` This route should delete the specified blog post.
server.delete(('/posts/:id'), (req, res) => {
    const { id } = req.params;

    Post.findByIdAndRemove(id, (err, data) => {
        if (err) {
            res.status(STATUS_SERVER_ERROR);
            res.json({ error: 'Failed to delete post by that id.' });
        }
        res.json(data);
    });
});

mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/user',
  { useMongoClient: true }
);

/* eslint no-console: 0 */
connect.then(() => {
    const port = process.env.PORT || 3000;
    server.listen(port);
    console.log(`Server Listening on ${port}`);
}, (err) => {
    console.log('\n************************');
    console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
    console.log('************************\n');
});
