const PostModel = require('../models/post.model');
const PostController = {};

PostController.create = (req, res) => {
    return PostModel.createPost(req.body, (err, post) => {
        if (err) {
            return res.status(500).end();
        } else {
            return res.json(post);
        }
    })

};

PostController.update = (req, res) => {
    return PostModel.updatePost(req.body, (err, post) => {
        if (err) {
            return res.status(500).end()
        }  else if (post == null){
            return res.status(404).end()
        } else {
            return res.json(post);
        }
    })
};

PostController.findPost = (req, res) => {
    return PostModel.findPost(req.body, (err, post) => {
        if (err){
            return res.status(500).end()
        } else if (post == null) {
            return res.status(404).end()
        } else {
            return res.json(post);
        }
    })
};

PostController.getAllPosts = (req, res) => {

};

module.exports = PostController;