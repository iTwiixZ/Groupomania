const express = require('express');
const router = express.Router();

const comment = require('../controllers/comment');

const multer = require('../middleware/multer');


    //Comments routes
    router.post('/new', multer, comment.createComment);
    router.get('/getComments/:postId', multer, comment.getComments);
    router.get('/getAll', multer, comment.getAllComment);
    router.delete('/delete', comment.deleteComment );


module.exports = router;