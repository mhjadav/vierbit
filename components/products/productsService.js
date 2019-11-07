let ProductModel = require('./productsModel');
var rimraf = require('rimraf');
var mkdirp = require('mkdirp');
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
    product.product_code = productDetail.product_code;
    product.rating = productDetail.rating;
    product.quantity = productDetail.quantity;
    product.domain = productDetail.domain;
    product.store = productDetail.store;
    product.isDeactivated = productDetail.isDeactivated ? productDetail.isDeactivated : false;

    return new Promise(function (resolve, reject) {
        product.save(function (err, newproduct) {

            if (!err) {
               
                let dir = `./static/images/${newproduct.domain.id}/${newproduct.store.id}/products/${newproduct._id}`;
                mkdirp(dir, function (err) {
                    if (err) {
                        reject(err)
                    }
                });
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
            rimraf(`./static/images/${product.domain.id}/${product.store.id}/products/${product._id}`, function () {
                ProductModel.deleteOne({
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

exports.deactivateProduct = function (id) {

    return new Promise(function (resolve, reject) {
        ProductModel.findByIdAndUpdate(id, { isDeactivated: true }, function (err, product) {
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

                let old_name = product.name;
                product.name = productDetail.name;
                product.domain = productDetail.domain;
                product.store = productDetail.store;
                product.description = productDetail.description;
                product.tags = productDetail.tags;
                product.buying_price = productDetail.buying_price;
                product.selling_price = productDetail.selling_price;
                product.product_code = productDetail.product_code;
                product.rating = productDetail.rating;
                product.quantity = productDetail.quantity;
                product.updated_date = Date.now();
                product.isDeactivated = productDetail.isDeactivated;
                product.save(function (err) {
                    if (!err) {
                        resolve(product);
                    } else {
                        reject(err);
                    }
                });


            }
        });

    });
}