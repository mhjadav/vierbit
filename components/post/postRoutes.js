let router = require('express').Router()
let postValidate = require('./postValidate')

var postController = require('./postController');

router.route('/post')
    .get(postController.index)
    .post(postValidate.validate(), postController.new);
router.route('/post/:post_id')
    .get(postController.view)
    .patch(postValidate.validate(), postController.update)
    .put(postValidate.validate(), postController.update)
    .delete(postController.delete);
    router.route('/post/deactivate/:post_id')
    .patch(postController.deactivate)
    .put(postController.deactivate);

module.exports = router;