const { validationResult } = require('express-validator')
const ProductService = require('./productsService');
const logger = require('../../logger');
// Handle index actions
exports.index = async function (req, res) {
    await ProductService.getAllProducts().then((products) => {
        res.json({
            message: "Data fetched successfully",
            data: products
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

        await ProductService.addProduct(req.body, req.files).then((product) => {
            res.json({
                message: "New record addded successfully",
                data: product
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

    await ProductService.findProduct(req.params.product_id).then((message) => {
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

        await ProductService.updateProduct(req.params.product_id, req.body, req.files).then((product) => {
            res.json({
                message: "Record updated successfully",
                data: product
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

    await ProductService.removeProduct(req.params.product_id, req.body).then((message) => {
        res.json({
            Message: message
        })
    }).catch((error) => {
        logger.error(error);
        res.send("Error : " + error.message);
    })



}