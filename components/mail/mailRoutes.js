let router = require('express').Router();

var mailController = require('./mailController');

router.route('/send-mail')
    .post(mailController.sendMail);


module.exports = router;