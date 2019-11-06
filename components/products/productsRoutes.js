let router = require('express').Router();
let upload = require('./productsUpload');
let productValidate = require('./productsValidate')

var productController = require('./productsController');

router.route('/products')
    .get(productController.index)
    .post(productValidate.validate(), productController.new);
router.route('/products/:product_id')
    .get(productController.view)
    .patch(productValidate.validate(), productController.update)
    .put(productValidate.validate(), productController.update)
    .delete(productController.delete);
    router.route('/products/deactivate/:product_id')
    .patch(productController.deactivate)
    .put(productController.deactivate);

module.exports = router;