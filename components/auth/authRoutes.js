let router = require('express').Router();

var authController = require('./authController');

router.route('/login')
    .post(authController.login);


module.exports = router;