RoleService = require('./roleModel');

exports.getAllRole = function () {

    return new Promise(function(resolve,reject){
        RoleService.get(function (err, roles) {
            if(roles){
                resolve(roles)
            } else {
                reject(err);
            }
        });
    })

   
}

exports.addRole = function (roleDetail) {

    var role = new RoleService();
    role.name = roleDetail.name;
    role.access_rights = roleDetail.access_rights;

    return new Promise(function(resolve,reject){
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

   return new Promise(function(resolve,reject){
    RoleService.remove({
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

   return  new Promise(function(resolve, reject) {
        RoleService.findById(id, function (err, role) {
            console.log(role);
            if(role){
                resolve(role);
            } else {
                reject(err);
            }
        });
});

   
}

exports.updateRole = function (id, roleDetail) {

    return  new Promise(function(resolve, reject) {

        RoleService.findById(id, function (err, role) {

            if (err) {
               reject(err);
            } else {
                role.name = roleDetail.name ? roleDetail.name : role.name;
                role.access_rights = roleDetail.access_rights;
                // save the role and check for errors
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