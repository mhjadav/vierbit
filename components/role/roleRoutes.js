let router = require('express').Router();

var roleController = require('./roleController');

router.route('/roles')
    .get(roleController.index)
    .post(roleController.new);
router.route('/roles/:role_id')
    .get(roleController.view)
    .patch(roleController.update)
    .put(roleController.update)
    .delete(roleController.delete);

module.exports = router;