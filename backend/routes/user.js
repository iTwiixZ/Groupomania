const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

    //Users routes
    router.post('/signup', userCtrl.signup);
    router.post('/login', userCtrl.login);
    router.get('/:userId', userCtrl.getUser);
    router.delete('/:userId', userCtrl.deleteUser);
    router.get('/logout',userCtrl.logout);


module.exports = router;