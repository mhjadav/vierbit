exports.phoneRegex = /^[7-9][0-9]{9}$/;

exports.pincodeRegex = /^[1-9][0-9]{5}$/;

exports.addressDescriptionRegex = /^[a-zA-Z0-9-, ]{6,100}$/;

exports.nameRegex = /^[a-zA-Z0-9-_ ]{6,20}$/;

exports.uniqueNameRegex = /^[a-zA-Z0-9 -]{4,100}$/;

exports.productCodeRegex = /^[a-zA-Z0-9]{3,10}$/;

exports.portRegex = /^()([1-9]|[1-5]?[0-9]{2,4}|6[1-4][0-9]{3}|65[1-4][0-9]{2}|655[1-2][0-9]|6553[1-5])$/gm;
