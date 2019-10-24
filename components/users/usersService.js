let UserModel = require('./usersModel');
const bcrypt = require('bcrypt')

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

exports.updateUser = function (id, userDetail) {

    return new Promise(function (resolve, reject) {

        UserModel.findById(id, function (err, user) {

            if (err) {
                reject(err);
            } else {
                user.name = userDetail.name;
                user.username = userDetail.username;
                user.gender = userDetail.gender;
                user.email = userDetail.email;
                user.phone = userDetail.phone;
                user.role = userDetail.role;
                user.parent = userDetail.parent;
               // user.password = userDetail.password;
                user.isDeactivated = userDetail.isDeactivated;
                user.updated_date = Date.now();
                

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

                

                // save the user and check for errors
               /*  user.save(function (err) {
                    if (!err) {
                        resolve(user);
                    } else {
                        reject(err);
                    }
                }); */

            }

        });

    });
}