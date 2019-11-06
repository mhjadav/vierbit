RoleModel = require('./roleModel');

exports.getAllRole = function () {

    return new Promise(function (resolve, reject) {
        RoleModel.get(function (err, roles) {
            if (roles) {
                resolve(roles)
            } else {
                reject(err);
            }
        });
    })


}

exports.addRole = function (roleDetail) {

    var role = new RoleModel();
    role.name = roleDetail.name;
    role.access_rights = roleDetail.access_rights;
    //role.created_date = Date.now();
    role.isDeactivated = roleDetail.isDeactivated ? roleDetail.isDeactivated : false;

    return new Promise(function (resolve, reject) {
        role.save(function (err) {

            if (!err) {
                resolve(role);
            } else {
                reject(err);
            }
        });
    })


}

exports.removeRole = function (id) {

    return new Promise(function (resolve, reject) {
        RoleModel.remove({
            _id: id
        }, function (err) {
            if (!err) {
                resolve("role Deleted Successfully");
            } else {
                reject(err);
            }
        });

    })


}

exports.findRole = function (id) {

    return new Promise(function (resolve, reject) {
        RoleModel.findById(id, function (err, role) {
            console.log(role);
            if (role) {
                resolve(role);
            } else {
                reject(err);
            }
        });
    });


}

exports.deactivateRole = function (id) {

    return new Promise(function (resolve, reject) {
        RoleModel.findByIdAndUpdate(id, {isDeactivated : true}, function (err, role) {
            console.log(role);
            if (role) {
                resolve(role);
            } else {
                reject(err);
            }
        });
    });


}



exports.updateRole = function (id, roleDetail) {

    return new Promise(function (resolve, reject) {

        RoleModel.findById(id, function (err, role) {

            if (err) {
                reject(err);
            } else {
                role.name = roleDetail.name;
                role.access_rights = roleDetail.access_rights;
                role.isDeactivated = roleDetail.isDeactivated;
                role.updated_date = Date.now();
                role.save(function (err) {
                    if (!err) {
                        resolve(role);
                    } else {
                        reject(err);
                    }
                });

            }

        });

    });
}