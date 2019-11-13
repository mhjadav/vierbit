let PostModel = require('./postModel');
var rimraf = require('rimraf');
var mkdirp = require('mkdirp');

exports.getAllPosts = function () {

    return new Promise(function (resolve, reject) {
        PostModel.get(function (err, posts) {
            if (posts) {
                resolve(posts)
            } else {
                reject(err);
            }
        });
    })


}

exports.addPost = function (postDetail) {
    var post = new PostModel();
    post.title = postDetail.title;
    post.description = postDetail.description;
    post.tags = postDetail.tags;
    post.images = [];
    post.views = postDetail.views;
    post.rating = postDetail.rating;
    post.domain = postDetail.domain;
    post.author = postDetail.author;

    return new Promise(function (resolve, reject) {
        post.save(function (err, newpost) {

            if (!err) {

                let dir = `./static/images/${newpost.domain.id}/posts/${newpost._id}`;
                mkdirp(dir, function (err) {
                    if (err) {
                        reject(err)
                    }
                });
                resolve(post);
            } else {
                reject(err);
            }
        });
    })


}

exports.removePost = function (id) {

    return new Promise(function (resolve, reject) {

        PostModel.findById(id, function (err, post) {
            rimraf(`./static/images/${post.domain.id}/posts/${post._id}`, function () {
                PostModel.deleteOne({
                    _id: id
                }, function (err) {
                    if (!err) {
                        resolve("post Deleted Successfully");
                    } else {
                        reject(err);
                    }
                });
            })
        })

    })


}

exports.findPost = function (id) {

    return new Promise(function (resolve, reject) {
        PostModel.findById(id, function (err, post) {
            if (post) {
                resolve(post);
            } else {
                reject(err);
            }
        });
    });


}

exports.deactivatePost = function (id) {

    return new Promise(function (resolve, reject) {
        PostModel.findByIdAndUpdate(id, { isDeactivated: true }, function (err, post) {
            if (post) {
                resolve(post);
            } else {
                reject(err);
            }
        });
    });


}

exports.updatePost = function (id, postDetail) {

    return new Promise(function (resolve, reject) {

        PostModel.findById(id, function (err, post) {
            if (err) {
                reject(err);
            } else {

                post.title = postDetail.title;
                post.description = postDetail.description;
                post.tags = postDetail.tags;
                post.views = postDetail.views;
                post.rating = postDetail.rating;
                post.domain = postDetail.domain;
                post.author = postDetail.author;
                post.updated_date = Date.now();
                post.isDeactivated = postDetail.isDeactivated;
                post.save(function (err) {
                    if (!err) {
                        resolve(post);
                    } else {
                        reject(err);
                    }
                });


            }
        });

    });
}