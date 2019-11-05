
const DomainService = require('./domainService')
const { validationResult } = require('express-validator');

// Handle index actions
exports.index = async function (req, res) {

    await DomainService.getAllDomain().then((domains) => {
        res.json({
            message: "Data fetched successfully",
            data: domains
        })
    }).catch((error) => {
        res.send("Error : " + error.message);
    })


};

exports.new = async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        DomainService.addDomain(req.body).then((domain) => {
            res.json({
                message: "New record addded successfully",
                data: domain
            })
        }).catch((error) => {
            res.send("Error : " + error.message);
        })
    } catch (err) {
        return next(err)
    }
};

exports.view = async function (req, res) {

    await DomainService.findDomain(req.params.domain_id).then((message) => {
        res.send(message);
    }).catch((error) => {
        res.send("Error : " + error.message);
    })


};
exports.update = async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        DomainService.updateDomain(req.params.domain_id, req.body).then((domain) => {
            res.json({
                message: "Record updated successfully",
                data: domain
            })
        }).catch((error) => {
            res.send("Error : " + error.message);
        })
    } catch (err) {
        return next(err)
    }
};
exports.delete = async function (req, res) {

    await DomainService.removeDomain(req.params.domain_id, req.body).then((message) => {
        res.json({
            Message: message
        })
    }).catch((error) => {
        res.send("Error : " + error.message);
    })
}