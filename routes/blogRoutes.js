const express = require("express");

const Blog = require("../models/blogPost.js");

const blogRouter = express.Router();

blogRouter.get("/", (req, res) => {
    Blog.find({})
    .then(blog => {
        res.status(200).json(blog);
    })
    .catch(err => {
        res.status(500).json({ error: "Cannot retrieve the information"})
    })
});

blogRouter.get("/:keyword", (req, res) => {
    const { keyword } = req.params;
    Blog.find({ "keywords": keyword })
        .then(blogPost => {
            res.status(200).json(blogPost);
        })
        .catch(err => {
            res.status(500).json({ error: "Cannot retreive the information." });
        })
});

blogRouter.post("/", (req, res) => {
  const { userName, header, createdOn, postContent, keywords } = req.body;

  if (!userName) {
    res.status(400).json({
        errorMessage: "Please provide first name, last name, and age for the friend."
      });
      return;
  }

  const blog = new Blog ({ userName, header, createdOn, postContent, keywords });

  blog
  .save()
  .then(savedBlog => {
      res.status(201).json(savedBlog);
  })
  .catch(err => {
      res.status(500).json({
          error: "There was an error while saving the blog post."
      })
  })
});

module.exports = blogRouter;