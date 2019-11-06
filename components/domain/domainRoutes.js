let router = require('express').Router();
const authenticateToken = require('../auth/authMiddleware')
let domainValidate = require('./domainValidate')

var domainController = require('./domainController');

router.route('/domain')
    .get(domainController.index)
    .post(domainValidate.validate(), domainController.new);
router.route('/domain/:domain_id')
    .get(domainController.view)
    .patch(domainValidate.validate(), domainController.update)
    .put(domainValidate.validate(), domainController.update)
    .delete(domainController.delete);
router.route('/domain/deactivate/:domain_id')
    .patch(domainController.deactivate)
    .put(domainController.deactivate);

module.exports = router;