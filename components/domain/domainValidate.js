
const domainModel = require('./domainModel')
const validator = require('validator')
const errorStrings = require('../validation/errorStrings')
var urlParser = require('url');

exports.validate = function (domain) {
    return new Promise((resolve, reject) => {
        let isUrlValid = validator.isURL(domain.url);
        if (isUrlValid) {
            domainModel.findOne({ url:domain.url}, function (err, duplicateUrl) {
                if(err) reject(err);
                if(duplicateUrl) {
                    reject({
                        "message": errorStrings.alreadyExistError("Url")
                    })
                } else {
                    resolve();
                }
            })
        } else {
            reject({
                "message": errorStrings.invalidValueError("Url")
            })
        }
    })
}


