let router = require('express').Router();
let roleValidate = require('./roleValidate')

var roleController = require('./roleController');

router.route('/roles')
    .get(roleController.index)
    .post(roleValidate.validate(), roleController.new);
router.route('/roles/:role_id')
    .get(roleController.view)
    .patch(roleValidate.validate(), roleController.update)
    .put(roleValidate.validate(), roleController.update)
    .delete(roleController.delete);
router.route('/roles/deactivate/:role_id')
    .patch(roleController.deactivate)
    .put(roleController.deactivate);

module.exports = router;