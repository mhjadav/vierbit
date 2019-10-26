//exports.usernameError = "must be 6 to 20 characters--spaces are not allowed--special characters except - and _ are not allowed."

exports.usernameError = function(username){
    return `${username} must be of 6 to 20 characters --- spaces are not allowed for ${username} --- special characters except "-" and "_" are not allowed in ${username}. `
}

exports.invalidValueError = function(fieldname){
    return `${fieldname} is not valid. `
}

exports.alreadyExistError = function(fieldname) {
    return `${fieldname} already exist. `
}