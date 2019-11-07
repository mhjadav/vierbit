let DomainModel = require('./domainModel');
const rimraf = require('rimraf')
const StoreModel = require('../stores/storesModel')
const ProductModel = require('../products/productsModel')


exports.getAllDomain = function () {

    return new Promise(function (resolve, reject) {
        DomainModel.get(function (err, domains) {
            if (domains) {
                resolve(domains)
            } else {
                reject(err);
            }
        });
    })


}

exports.addDomain = function (domainDetail) {

    var domain = new DomainModel();
    domain.url = domainDetail.url;
    domain.user = domainDetail.user;
    domain.isDeactivated = domainDetail.isDeactivated ? domainDetail.isDeactivated : false;

    return new Promise(function (resolve, reject) {
        domain.save(function (err) {

            if (!err) {
                resolve(domain);
            } else {
                reject(err);
            }
        });
    })


}

exports.removeDomain = function (id) {

    return new Promise(function (resolve, reject) {
        rimraf(`./static/images/${id}`, function () {
            StoreModel.deleteMany({ 'domain.id': id }, function (err) {
                if (err) reject(err);
                ProductModel.deleteMany({ 'domain.id': id }, function (err) {
                    if (err) reject(err);
                    DomainModel.deleteOne({
                        _id: id
                    }, function (err) {
                        if (!err) {
                            resolve("Domain and all of its stores and products Deleted Successfully");
                        } else {
                            reject(err);
                        }
                    });
                })
            })
        })
    })
}

exports.findDomain = function (id) {

    return new Promise(function (resolve, reject) {
        DomainModel.findById(id, function (err, domain) {
            console.log(domain);
            if (domain) {
                resolve(domain);
            } else {
                reject(err);
            }
        });
    });


}

exports.deactivateDomain = function (id) {

    return new Promise(function (resolve, reject) {
        DomainModel.findByIdAndUpdate(id, { isDeactivated: true }, function (err, domain) {
            if (domain) {
                resolve(domain)
            } else {
                reject(err);
            }
        });
    });


}

exports.updateDomain = function (id, domainDetail) {

    return new Promise(function (resolve, reject) {

        DomainModel.findById(id, function (err, domain) {

            if (err) {
                reject(err);
            } else {
                domain.url = domainDetail.url;
                domain.user = domainDetail.user;
                domain.isDeactivated = domainDetail.isDeactivated;
                domain.updated_date = Date.now();
                // save the domain and check for errors
                domain.save(function (err) {
                    if (!err) {
                        resolve(domain);
                    } else {
                        reject(err);
                    }
                });

            }

        });

    });
}