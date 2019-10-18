
const DomainService = require('./domainService')
const validator = require('../validation/validate');
const logger = require("../../logger");
// Handle index actions
exports.index = async function (req, res) {
    logger.error("info.........");

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

    let isUrl = validator.isUrl(req.body.url);
    let user = validator.isEmpty(req.body.user);
    
    await DomainService.addDomain(req.body).then((domain) => {
        res.json({
            message: "New record addded successfully",
            data: domain
        })
    }).catch((error) => {
        res.send("Error : " + error.message);
    })


};

exports.view = async function (req, res) {

    await DomainService.findDomain(req.params.domain_id).then((message) => {
        res.send(message);
    }).catch((error) => {
        res.send("Error : " + error.message);
    })


};
exports.update = async function (req, res) {

    let isUrl = validator.isUrl(req.body.url);
    console.log("is URL : " + isUrl);
    await DomainService.updateDomain(req.params.domain_id, req.body).then((domain) => {
        res.json({
            message: "Record updated successfully",
            data: domain
        })
    }).catch((error) => {
        res.send("Error : " + error.message);
    })


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