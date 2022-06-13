const express = require('express');
const router  = express.Router();
const comment = require('../controllers/comment');
const auth    = require('../middleware/auth');



    //Comments routes
    router.post('/new',                auth, comment.createComment);
    router.get('/getComments/:postId', auth, comment.getComments);
    router.delete('/delete/:id',       auth, comment.deleteComment );


module.exports = router;