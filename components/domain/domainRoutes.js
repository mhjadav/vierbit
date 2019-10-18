let router = require('express').Router();

var domainController = require('./domainController');

router.route('/domain')
    .get(domainController.index)
    .post(domainController.new);
router.route('/domain/:domain_id')
    .get(domainController.view)
    .patch(domainController.update)
    .put(domainController.update)
    .delete(domainController.delete);

module.exports = router;