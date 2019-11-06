let router = require('express').Router();
let upload = require('./productsUploadMiddlware');
var productUploadController = require('./productsUploadController');

router.route('/products/upload/:product_id')
    .patch(upload, productUploadController.update)
    .put(upload, productUploadController.update)

module.exports = router;