let UserModel = require('./usersModel');
const bcrypt = require('bcrypt')
const DomainModel = require('../domain/domainModel')
const StoreModel = require('../stores/storesModel')
const ProductModel = require('../products/productsModel')
const PostModel = require('../post/postModel')
const rimraf = require('rimraf')

exports.getAllUsers = function () {

    return new Promise(function (resolve, reject) {
        UserModel.get(function (err, users) {
            if (users) {
                resolve(users)
            } else {
                reject(err);
            }
        });
    })


}

exports.addUser = function (userDetail) {

    var user = new UserModel();
    user.name = userDetail.name;
    user.username = userDetail.username;
    user.gender = userDetail.gender;
    user.email = userDetail.email;
    user.phone = userDetail.phone;
    user.role = userDetail.role;
    user.parent = userDetail.parent;
    //user.password = userDetail.password;
    user.isDeactivated = userDetail.isDeactivated ? userDetail.isDeactivated : false;

    return new Promise(function (resolve, reject) {
        bcrypt.hash(userDetail.password, Math.ceil(Math.random() * 14), (err, hash) => {
            user.password = hash;
            user.save(function (err) {
                if (!err) {
                    resolve(user);
                } else {
                    reject(err);
                }
            });

        })

    })


}

exports.removeUser = function (id) {

    return new Promise(function (resolve, reject) {
        UserModel.findById(id, function (err, user) {
            if (user.parent.name === undefined) {
                deleteUserData(id);
            }
        })
        UserModel.deleteOne({
            _id: id
        }, function (err) {
            if (!err) {
                resolve("user Deleted Successfully");
            } else {
                reject(err);
            }
        });

    })


}

exports.findUser = function (id) {

    return new Promise(function (resolve, reject) {
        UserModel.findById(id, function (err, user) {
            console.log(user);
            if (user) {
                resolve(user);
            } else {
                reject(err);
            }
        });
    });


}

exports.deactivateUser = function (id) {

    return new Promise(function (resolve, reject) {
        UserModel.findByIdAndUpdate(id, { isDeactivated: true }, function (err, user) {
            if (user) {
                resolve(user);
            } else {
                reject(err);
            }
        });
    });


}

exports.updateUser = function (id, userDetail) {

    return new Promise(function (resolve, reject) {

        UserModel.findById(id, function (err, user) {

            if (err) {
                reject(err);
            } else {
                let old_username = user.username;
                user.name = userDetail.name;
                user.username = userDetail.username;
                user.gender = userDetail.gender;
                user.email = userDetail.email;
                user.phone = userDetail.phone;
                user.role = userDetail.role;
                user.parent = userDetail.parent;
                user.isDeactivated = userDetail.isDeactivated;
                user.updated_date = Date.now();


                bcrypt.hash(userDetail.password, Math.ceil(Math.random() * 14), (err, hash) => {
                    user.password = hash;
                    user.save(function (err) {
                        if (!err) {
                            if (old_username !== userDetail.username) {
                                DomainModel.updateMany({ 'user.id': id }, { 'user.username': userDetail.username }, function (err) {
                                    if (err) reject(err);
                                    PostModel.updateMany({ 'author.id': id }, { 'author.username': userDetail.username }, function (err) {
                                        if (err) reject(err);
                                    })
                                })
                            }
                            resolve(user);
                        } else {
                            reject(err);
                        }
                    });

                })
            }

        });

    });
}

function deleteUserData(id) {
    DomainModel.find({ 'user.id': id }, function (err, domains) {
        if (!err) {
            domains.forEach(domain => {
                rimraf(`./static/images/${domain._id}`, function () {
                    ProductModel.deleteMany({ 'domain.id': domain._id }, function (err) {
                        StoreModel.deleteMany({ 'domain.id': domain._id }, function (err) {
                            PostModel.deleteMany({ 'domain.id': domain._id }, function (err) {
                                DomainModel.deleteOne({
                                    _id: domain._id
                                }, function (err) {
                                    console.log(domain.url + " deleted successfully...");
                                })
                            })
                        })
                    })
                })

            });
        }
    })

}