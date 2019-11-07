let StoreModel = require('./storesModel')
const rimraf = require('rimraf')
const ProductModel = require('../products/productsModel')

exports.getAllStore = function () {

    return new Promise(function (resolve, reject) {
        StoreModel.get(function (err, stores) {
            if (stores) {
                resolve(stores)
            } else {
                reject(err);
            }
        });
    })


}

exports.addStore = function (storeDetail) {

    var store = new StoreModel();
    store.name = storeDetail.name;
    store.domain = storeDetail.domain;
    store.address = storeDetail.address;
    store.city = storeDetail.city;
    store.state = storeDetail.state;
    store.email = storeDetail.email;
    store.phone = storeDetail.phone;
    store.pincode = storeDetail.pincode;
    store.isDeactivated = storeDetail.isDeactivated ? storeDetail.isDeactivated : false;

    return new Promise(function (resolve, reject) {
        store.save(function (err) {

            if (!err) {
                resolve(store);
            } else {
                reject(err);
            }
        });
    })


}

exports.removeStore = function (id) {

    return new Promise(function (resolve, reject) {
        StoreModel.findById(id, function (err, store) {
            if(err) reject(err);
            rimraf(`./static/images/${store.domain.id}/${id}`, function () {
                ProductModel.deleteMany({ 'domain.id': store.domain.id }, function (err) {
                    if(err) reject(err);
                    StoreModel.deleteOne({
                        _id: id
                    }, function (err) {
                        if (!err) {
                            resolve("Store and all of its products deleted successfully");
                        } else {
                            reject(err);
                        }
                    });

                })

            })

        })



    })


}

exports.findStore = function (id) {
    return new Promise(function (resolve, reject) {
        StoreModel.findById(id, function (err, store) {
            console.log("store: " + store);
            if (store) {
                resolve(store);
            } else {
                reject(err);
            }
        });
    });


}

exports.deactivateStore = function (id) {
    return new Promise(function (resolve, reject) {
        StoreModel.findByIdAndUpdate(id, { isDeactivated: true }, function (err, store) {
            if (store) {
                resolve(store);
            } else {
                reject(err);
            }
        });
    });


}



exports.updateStore = function (id, storeDetail) {

    return new Promise(function (resolve, reject) {

        StoreModel.findById(id, function (err, store) {

            if (err) {
                reject(err);
            } else {
                store.name = storeDetail.name;
                store.domain = storeDetail.domain;
                store.address = storeDetail.address;
                store.city = storeDetail.city;
                store.state = storeDetail.state;
                store.pincode = storeDetail.pincode;
                store.updated_date = Date.now();
                store.isDeactivated = storeDetail.isDeactivated;
                store.email = storeDetail.email;
                store.phone = storeDetail.phone;
                // save the store and check for errors
                store.save(function (err) {
                    if (!err) {
                        resolve(store);
                    } else {
                        reject(err);
                    }
                });

            }

        });

    });
}