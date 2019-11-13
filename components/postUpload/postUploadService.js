let PostModel = require('../post/postModel');
var fs = require('fs');
const logger = require('../../logger');

exports.updatePost = function (id, files) {

    return new Promise(function (resolve, reject) {

        PostModel.findById(id, function (err, post) {
            if (err) {
                reject(err);
            } else {
                let old_images = post.images;
                let dir = `./static/images/${post.domain.id}/posts/${post._id}/`;
                post.images = [];
                files.forEach(element => {
                    post.images.push(dir + element.filename);
                });
                post.updated_date = Date.now();
            
                post.save(function (err) {
                    if (!err) {
                        if(old_images.length > 0) {
                            removeImages(old_images);
                        }
                        resolve(post);
                    } else {
                        reject(err);
                    }
                });
            }
        });

    });
}

function removeImages(images) {

    images.forEach(element => {
        fs.unlink(element, (err) => {
            if (err) throw err;
            logger.info(element +  ' file was deleted');
        });
    });
}