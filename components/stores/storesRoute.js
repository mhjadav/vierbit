let router = require('express').Router();
let storeValidate = require('./storesValidate')

var storeController = require('./storesController');

router.route('/stores')
    .get(storeController.index)
    .post(storeValidate.validate(), storeController.new);
router.route('/stores/:store_id')
    .get(storeController.view)
    .patch(storeValidate.validate(), storeController.update)
    .put(storeValidate.validate(), storeController.update)
    .delete(storeController.delete);
router.route('/stores/deactivate/:store_id')
    .patch(storeController.deactivate)
    .put(storeController.deactivate);
   

module.exports = router;