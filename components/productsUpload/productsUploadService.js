let ProductModel = require('../products/productsModel');
var fs = require('fs');
const logger = require('../../logger');

exports.updateProduct = function (id, files) {

    return new Promise(function (resolve, reject) {

        ProductModel.findById(id, function (err, product) {
            if (err) {
                reject(err);
            } else {
                let old_images = product.images;
                let dir = `./static/images/${product.domain.name}/${product.store.name}/products/${product.name}/`;
                product.images = [];
                files.forEach(element => {
                    product.images.push(dir + element.filename);
                });
                product.updated_date = Date.now();
            
                product.save(function (err) {
                    if (!err) {
                        if(old_images.length > 0) {
                            removeImages(old_images);
                        }
                        resolve(product);
                    } else {
                        reject(err);
                    }
                });
            }
        });

    });
}

function removeImages(images) {

    images.forEach(element => {
        fs.unlink(element, (err) => {
            if (err) throw err;
            logger.info(element +  ' file was deleted');
        });
    });
}