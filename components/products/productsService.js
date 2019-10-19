let ProductModel = require('./productsModel');
var rimraf = require('rimraf');
var fs = require('fs');
const logger = require('../../logger');

exports.getAllProducts = function () {

    return new Promise(function (resolve, reject) {
        ProductModel.get(function (err, products) {
            if (products) {
                resolve(products)
            } else {
                reject(err);
            }
        });
    })


}

exports.addProduct = function (productDetail, files) {
    var product = new ProductModel();
    product.name = productDetail.name;
    product.description = productDetail.description;

    product.tags = productDetail.tags;
    product.buying_price = productDetail.buying_price;
    product.selling_price = productDetail.selling_price;

    files.forEach(element => {
        product.images.push(element.filename);

    });
    //product.images = productDetail.images;
    product.product_code = productDetail.product_code;
    product.rating = productDetail.rating;
    product.quantity = productDetail.quantity;
    product.domain_id = productDetail.domain_id;
    product.domain_name = productDetail.domain_name;

    product.created_date = Date.now();
    product.isDeactivated = productDetail.isDeactivated ? productDetail.isDeactivated : false;

    return new Promise(function (resolve, reject) {
        product.save(function (err) {

            if (!err) {
                resolve(product);
            } else {
                reject(err);
            }
        });
    })


}

exports.removeProduct = function (id) {

    return new Promise(function (resolve, reject) {

        ProductModel.findById(id, function (err, product) {
            rimraf(`./static/images/${product.domain_name}/products/${product.name}`, function () {
                ProductModel.remove({
                    _id: id
                }, function (err) {
                    if (!err) {
                        resolve("product Deleted Successfully");
                    } else {
                        reject(err);
                    }
                });
            })
        })

    })


}

exports.findProduct = function (id) {

    return new Promise(function (resolve, reject) {
        ProductModel.findById(id, function (err, product) {
            if (product) {
                resolve(product);
            } else {
                reject(err);
            }
        });
    });


}

exports.updateProduct = function (id, productDetail, files) {

    return new Promise(function (resolve, reject) {

        ProductModel.findById(id, function (err, product) {
            if (err) {
                reject(err);
            } else {

                /* const p = new Promise((resolve, reject) => {
                    resolve(RemovePhotos(product.name,product.domain_name));
                  });
              
               p.then(() => {
                product.images = [];
                files.forEach(element => {
                    product.images.push(element.filename);
                    
                });

                product.name = productDetail.name;
                product.description = productDetail.description;
                product.tags = productDetail.tags;
                product.buying_price = productDetail.buying_price;
                product.selling_price = productDetail.selling_price;
                product.product_code = productDetail.product_code;
                product.rating = productDetail.rating;
                product.quantity = productDetail.quantity;
                product.domain_id = productDetail.domain_id;
                product.domain_name = productDetail.domain_name;
                
                product.created_date = productDetail.created_date;
                product.isDeactivated = productDetail.isDeactivated ? productDetail.isDeactivated : false;
                // save the product and check for errors
                product.save(function (err) {
                    if (!err) {
                        resolve(product);
                    } else {
                        reject(err);
                    }
                });
               }) */
                let dir = `./static/images/${product.domain_name}/products/${product.name}`
                let old_name = product.name;
                let old_domain = product.domain_name;

                let old_images = product.images;
                logger.info(old_images);

                product.images = [];
                files.forEach(element => {
                    product.images.push(element.filename);
                });

                product.name = productDetail.name;
                product.domain_id = productDetail.domain_id;
                product.domain_name = productDetail.domain_name;
                product.description = productDetail.description;
                product.tags = productDetail.tags;
                product.buying_price = productDetail.buying_price;
                product.selling_price = productDetail.selling_price;
                product.product_code = productDetail.product_code;
                product.rating = productDetail.rating;
                product.quantity = productDetail.quantity;
                product.created_date = productDetail.created_date;
                product.isDeactivated = productDetail.isDeactivated ? productDetail.isDeactivated : false;
                product.save(function (err) {
                    if (!err) {
                        resolve(product);
                    } else {
                        reject(err);
                    }
                });


                if (old_name !== productDetail.name || old_domain !== productDetail.domain_name) {
                    rimraf(dir, function () {
                        logger.info(`Directory ${dir} deleted successfully....`);
                    });
                } else {
                    RemovePhotos(dir, old_images)
                }
            }
        });

    });
}

function RemovePhotos(dir, images) {
    
        let path = dir + '/';
        images.forEach(element => {
            fs.unlink(path + element, (err) => {
                if (err) throw err;
                logger.info(path + element + ' file was deleted');
            });
        });
}