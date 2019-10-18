const validator = require('validator');

exports.isEmail = function (str) {
    return validator.isEmail(str);
}

exports.isUrl = function (str) {
    return validator.isURL(str);
}

exports.isEmpty = function (str) {
    return validator.isEmpty(str,  { ignore_whitespace:true });
}