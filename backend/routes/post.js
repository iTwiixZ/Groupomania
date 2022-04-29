const express = require('express');
const post = require('../controllers/post');
const multer =  require('../middleware/multer');
const auth = require('../middleware/auth');

const router = express.Router();

    //Posts routes
    router.post('/new',   multer, post.createPost);
    router.get('/getOne', multer, post.getOnePost);
    router.get('/getAll', multer, post.getAllPost);
    router.delete('/:id', multer, post.deletePost);
   


module.exports = router;