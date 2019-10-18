let router = require('express').Router();
let upload = require('./productsUpload');

var productController = require('./productsController');

router.route('/products')
    .get(productController.index)
    .post(upload,productController.new);
router.route('/products/:product_id')
    .get(productController.view)
    .patch(upload,productController.update)
    .put(upload,productController.update)
    .delete(productController.delete);

module.exports = router;