const express = require('express');
const router = express.Router();
const posts = require('../controllers/post');
const auth = require('../middleware/auth.js');
const multer =  require('../middleware/multer');



    //Posts routes
    router.post('/new', multer, posts.createPost);
    router.get('/getOne',  multer, posts.getOnePost);
    router.get('/getAll',  multer, posts.getAllPost);
    router.delete('/:id', multer, posts.deletePost);
   


module.exports = router;