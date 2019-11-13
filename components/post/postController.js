const { validationResult } = require('express-validator')
const PostService = require('./postService')
const logger = require('../../logger')

exports.index = async function (req, res) {
    await PostService.getAllPosts().then((posts) => {
        res.json({
            message: "Data fetched successfully",
            data: posts
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

        await PostService.addPost(req.body).then((post) => {
            res.json({
                message: "New record addded successfully",
                data: post
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

    await PostService.findPost(req.params.post_id).then((message) => {
        res.send(message);
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

        await PostService.updatePost(req.params.post_id, req.body).then((post) => {
            res.json({
                message: "Record updated successfully",
                data: post
            })
        }).catch((error) => {
            logger.error(error);
            res.send("Error : " + error.message);
        })
    } catch (err) {
        return next(err)
    }


};

exports.deactivate = async function (req, res) {

    await PostService.deactivatePost(req.params.post_id).then((post) => {
        res.json({
            message: "post deactivated successfully"
        })
    }).catch((error) => {
        logger.error(error);
        res.send("Error : " + error.message);
    })
};


exports.delete = async function (req, res) {

    await PostService.removePost(req.params.post_id).then((message) => {
        res.json({
            Message: message
        })
    }).catch((error) => {
        logger.error(error);
        res.send("Error : " + error.message);
    })



}