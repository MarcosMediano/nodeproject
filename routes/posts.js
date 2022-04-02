const express = require('express');
const Post = require('../models/posts');
const postRouter = express.Router();

postRouter.post('/', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
    });
    post.save().then(createdPost => {
        console.log(createdPost._id);
        res.status(200).json({
            message: "Post added successfully",
            postId:createdPost._id
        });
    })
    
})
module.exports=postRouter