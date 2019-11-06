let router = require('express').Router();
let upload = require('./productsUpload');
let productValidate = require('./productsValidate')

var productController = require('./productsController');

router.route('/products')
    .get(productController.index)
    .post(upload, productValidate.validate(), productController.new);
router.route('/products/:product_id')
    .get(productController.view)
    .patch(upload, productValidate.validate(), productController.update)
    .put(upload, productValidate.validate(), productController.update)
    .delete(productController.delete);

module.exports = router;