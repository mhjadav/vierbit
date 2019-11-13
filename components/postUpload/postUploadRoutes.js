let router = require('express').Router();
let upload = require('./postUploadMiddlware');
var postUploadController = require('./postUploadController');

router.route('/post/upload/:post_id')
    .patch(upload, postUploadController.update)
    .put(upload, postUploadController.update)

module.exports = router;