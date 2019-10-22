let router = require('express').Router();

var storeController = require('./storesController');

router.route('/stores')
    .get(storeController.index)
    .post(storeController.new);
router.route('/stores/:store_id')
    .get(storeController.view)
    .patch(storeController.update)
    .put(storeController.update)
    .delete(storeController.delete);

module.exports = router;