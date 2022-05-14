const express = require('express');
const posts = require('../controllers/post');
const auth = require('../middleware/auth');
const multer =  require('../middleware/multer');

const router = express.Router();

    //Posts routes
    router.post('/new',   multer, posts.createPost);
    router.get('/getOne',  multer, posts.getOnePost);
    router.get('/getAll',  multer, posts.getAllPost);
    router.delete('/:id',   posts.deletePost);
   


module.exports = router;