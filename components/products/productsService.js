let ProductModel = require('./productsModel');
var rimraf = require('rimraf');
var mkdirp = require('mkdirp');
const TagModel = require('../tags/tagsModel')
const _ = require('lodash')
const logger = require('../../logger')
const ignoreKeywords = require('../validation/ignoreKewords')

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

                addTags(product.tags, product.name.split(' '));
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

                let old_tags = product.tags;
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
                        if(old_tags !== productDetail.tags || old_name !== productDetail.name) {
                            addTags(product.tags, product.name.split(' '));
                        }
                    } else {
                        reject(err);
                    }
                });
            }
        });

    });
}

function addTags(tags, keywords) {
   // let newkeywords = ['electronics', 'new-final', 'new-final2'];
   let newkeywords =  _.difference(keywords, ignoreKeywords.unusedKeywords);
   console.log("filtered keywords : " + newkeywords);
    let isObjUpdated = false;
    TagModel.get(function (err, oldtags) {
        tags.forEach(tag => {
            let obj = _.find(oldtags, { "name": tag })
            if (obj) {
                isObjUpdated = false
                _.forEach(newkeywords, function (value) {
                    if (obj.keywords.indexOf(value) < 0) {
                        obj.keywords.push(value);
                        isObjUpdated = true;
                    }
                })
                if (isObjUpdated) {
                    TagModel.updateOne({ "_id": obj._id }, { "keywords": obj.keywords }, function (err) {
                        if (err) logger.error(err);
                    });
                }
            } else {
                createNewTag(tag, newkeywords);
            }
        });
    })

}

function createNewTag(tag, keywords) {
    let obj = new TagModel();
    obj.name = tag;
    obj.keywords = keywords;
    obj.save(function (err, obj) {
        if (err) logger.error(err);
    });
}