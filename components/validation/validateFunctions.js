exports.validateName = function (str) {
    let pattern = /^[a-zA-Z0-9-_ ]{6,20}$/;
    return pattern.test(str);
}

exports.validateUsername = function (str) {
    let pattern = /^[a-zA-Z0-9-_]{6,20}$/;
    return pattern.test(str);
}