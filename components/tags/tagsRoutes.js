let router = require('express').Router();
let tagValidate = require('./tagsValidate')

var tagController = require('./tagsController');

router.route('/tags')
    .get(tagController.index)
    .post(tagValidate.validate(), tagController.new);
router.route('/tags/:tag_id')
    .get(tagController.view)
    .patch(tagValidate.validate(), tagController.update)
    .put(tagValidate.validate(), tagController.update)
    .delete(tagController.delete);

module.exports = router;