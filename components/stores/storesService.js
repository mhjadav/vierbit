let StoreModel = require('./storesModel')

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
    store.pincode = storeDetail.pincode;
    store.created_date = Date.now();
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
        StoreModel.deleteOne({
            _id: id
        }, function (err) {
            if (!err) {
                resolve("store Deleted Successfully");
            } else {
                reject(err);
            }
        });

    })


}

exports.findStore = function (id) {
    console.log("id: " + id);
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
                store.created_date = storeDetail.created_date;
                store.isDeactivated = storeDetail.isDeactivated ? storeDetail.isDeactivated : false;
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