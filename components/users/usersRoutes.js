let router = require('express').Router();

var userController = require('./usersController');
let userValidate = require('./usersValidate')

router.route('/users')
    .get(userController.index)
    .post(userValidate.validate(), userController.new);
router.route('/users/:user_id')
    .get(userController.view)
    .patch(userValidate.validate(), userController.update)
    .put(userValidate.validate(), userController.update)
    .delete(userController.delete);
router.route('/users/deactivate/:user_id')
    .patch(userController.deactivate)
    .put(userController.deactivate);

module.exports = router;