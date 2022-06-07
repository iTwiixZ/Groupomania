const express = require('express');
const router  = express.Router();
const comment = require('../controllers/comment');
const auth    = require('../middleware/auth');
const multer  = require('../middleware/multer');


    //Comments routes
    router.post('/new', auth, multer, comment.createComment);
    // router.get('/getComments/:postId', auth, multer, comment.getComments);
    // router.get('/getAll', auth, multer, comment.getAllComment);
    router.delete('/delete/:id',auth, comment.deleteComment );


module.exports = router;