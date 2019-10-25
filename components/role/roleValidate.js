
const roleModel = require('./roleModel')
const validateFunctions = require('../validation/validateFunctions');
const errorStrings = require('../validation/errorStrings');

exports.validate = function (role) {
    return new Promise((resolve, reject) => {
        let isRoleValid = validateFunctions.validateUsername(role.name);
        if (isRoleValid) {
            roleModel.findOne({ name: role.name }, function (err, duplicateRole) {
                if(err) reject(err);
                if(duplicateRole) {
                    reject({
                        "message": "Role name already exist.."
                    })
                } else {
                    resolve();
                }
            })
        } else {
            reject({
                "message": errorStrings.usernameError("Role name")
            })
        }
    })
}


