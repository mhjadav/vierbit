const { validationResult } = require('express-validator')
const TagService = require('./tagsService');
const logger = require('../../logger');
// Handle index actions
exports.index = async function (req, res) {
    await TagService.getAllTags().then((tags) => {
        res.json({
            message: "Data fetched successfully",
            data: tags
        })
    }).catch((error) => {
        logger.error(error);
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

        await TagService.addTag(req.body).then((tag) => {
            res.json({
                message: "New record addded successfully",
                data: tag
            })
        }).catch((error) => {
            logger.error(error);
            res.send("Error : " + error.message);
        })
    } catch (err) {
        // return next(err)
        res.send("Error : " + err.message);
    }


};

exports.view = async function (req, res) {

    await TagService.findTag(req.params.tag_id).then((tag) => {
        res.json({
            message: "Record fetched successfully",
            data: tag
        })
    }).catch((error) => {
        logger.error(error);
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

        await TagService.updateTag(req.params.tag_id, req.body).then((tag) => {
            res.json({
                message: "Record updated successfully",
                data: tag
            })
        }).catch((error) => {
            logger.error(error);
            res.send("Error : " + error.message);
        })
    } catch (err) {
        return next(err)
    }


};

exports.delete = async function (req, res) {

    await TagService.removeTag(req.params.tag_id).then((message) => {
        res.json({
            Message: message
        })
    }).catch((error) => {
        logger.error(error);
        res.send("Error : " + error.message);
    })



}