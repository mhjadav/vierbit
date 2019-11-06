const ProductUploadService = require('./productsUploadService');
const logger = require('../../logger');


exports.update = async function (req, res) {

        await ProductUploadService.updateProduct(req.params.product_id, req.files).then((product) => {
            res.json({
                message: "Images uploaded successfully",
                data: product
            })
        }).catch((error) => {
            logger.error(error);
            res.send("Error : " + error.message);
        })

};

