let TagModel = require('./tagsModel');

exports.getAllTags = function () {

    return new Promise(function (resolve, reject) {
        TagModel.get(function (err, tags) {
            if (tags) {
                resolve(tags)
            } else {
                reject(err);
            }
        });
    })


}

exports.addTag = function (tagDetail) {
    var tag = new TagModel();
    tag.name = tagDetail.name;
    tag.keywords = tagDetail.keywords;
    tag.isDeactivated = tagDetail.isDeactivated;

    return new Promise(function (resolve, reject) {
        tag.save(function (err, newtag) {
            if (!err) {
                resolve(newtag);
            } else {
                reject(err);
            }
        });
    })


}

exports.removeTag = function (id) {

    return new Promise(function (resolve, reject) {
            TagModel.deleteOne({
                _id: id
            }, function (err) {
                if (!err) {
                    resolve("tag Deleted Successfully");
                } else {
                    reject(err);
                }
            });
    })
}

exports.findTag = function (id) {

    return new Promise(function (resolve, reject) {
        TagModel.findById(id, function (err, tag) {
            if (tag) {
                resolve(tag);
            } else {
                reject(err);
            }
        });
    });


}


exports.updateTag = function (id, tagDetail) {

    return new Promise(function (resolve, reject) {

        TagModel.findById(id, function (err, tag) {
            if (err) {
                reject(err);
            } else {
                tag.name = tagDetail.name;
                tag.keywords = tagDetail.keywords;
                tag.updated_date = Date.now();
                tag.isDeactivated = tagDetail.isDeactivated;
                tag.save(function (err) {
                    if (!err) {
                        resolve(tag);
                    } else {
                        reject(err);
                    }
                });
            }
        });

    });
}