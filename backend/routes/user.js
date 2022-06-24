const express                      = require('express');
const router                       = express.Router();
const userCtrl                     = require('../controllers/user');
const { validate, checkValidation} = require('../middleware/validator');

    //Users routes
    router.post('/signup',   validate,  userCtrl.signup);
    router.post('/login',    validate,  userCtrl.login);
    router.get('/:userId',                              userCtrl.getOneUser);
    router.get('/' ,                                    userCtrl.getAllUsers);
    router.delete('/:userId',                           userCtrl.deleteUser);
    router.get('/logout',                               userCtrl.logout);


module.exports = router;