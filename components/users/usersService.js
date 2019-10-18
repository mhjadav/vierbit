let  UserModel = require('./usersModel');

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
    user.password = userDetail.password;
    user.isDeactivated = userDetail.isDeactivated ? userDetail.isDeactivated : false;
    user.created_date = Date.now();

    return new Promise(function (resolve, reject) {
        user.save(function (err) {

            if (!err) {
                resolve(user);
            } else {
                reject(err);
            }
        });
    })


}

exports.removeUser = function (id) {

    return new Promise(function (resolve, reject) {
        UserModel.remove({
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
                user.password = userDetail.password;
                user.isDeactivated = userDetail.isDeactivated ? userDetail.isDeactivated : false;
                user.created_date = userDetail.created_date;
            
                // save the user and check for errors
                user.save(function (err) {
                    if (!err) {
                        resolve(user);
                    } else {
                        reject(err);
                    }
                });

            }

        });

    });
}