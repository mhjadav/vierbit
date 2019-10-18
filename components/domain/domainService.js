let  DomainModel = require('./domainModel');

exports.getAllDomain = function () {

    return new Promise(function (resolve, reject) {
        DomainModel.get(function (err, domains) {
            if (domains) {
                resolve(domains)
            } else {
                reject(err);
            }
        });
    })


}

exports.addDomain = function (domainDetail) {

    var domain = new DomainModel();
    domain.url = domainDetail.url;
    domain.user = domainDetail.user;
    domain.created_date = Date.now();
    domain.isDeactivated = domainDetail.isDeactivated ? domainDetail.isDeactivated : false;

    return new Promise(function (resolve, reject) {
        domain.save(function (err) {

            if (!err) {
                resolve(domain);
            } else {
                reject(err);
            }
        });
    })


}

exports.removeDomain = function (id) {

    return new Promise(function (resolve, reject) {
        DomainModel.remove({
            _id: id
        }, function (err) {
            if (!err) {
                resolve("domain Deleted Successfully");
            } else {
                reject(err);
            }
        });

    })


}

exports.findDomain = function (id) {

    return new Promise(function (resolve, reject) {
        DomainModel.findById(id, function (err, domain) {
            console.log(domain);
            if (domain) {
                resolve(domain);
            } else {
                reject(err);
            }
        });
    });


}

exports.updateDomain = function (id, domainDetail) {

    return new Promise(function (resolve, reject) {

        DomainModel.findById(id, function (err, domain) {

            if (err) {
                reject(err);
            } else {
                domain.url = domainDetail.url;
                domain.user = domainDetail.user;
                domain.created_date = domainDetail.created_date;
                domain.isDeactivated = domainDetail.isDeactivated ? domainDetail.isDeactivated : false;
                // save the domain and check for errors
                domain.save(function (err) {
                    if (!err) {
                        resolve(domain);
                    } else {
                        reject(err);
                    }
                });

            }

        });

    });
}